
import {
  Image,
  StyleSheet,
  Text,
  View,
  StatusBar,
  ToastAndroid,
  FlatList,
  TextInput,
  TouchableOpacity
  , ActivityIndicator,
  RefreshControl
} from 'react-native'
import React, { useRef, useState, memo, useEffect, useMemo, useCallback } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { responsiveFontSize } from "react-native-responsive-dimensions";
import Icon2 from 'react-native-vector-icons/dist/Octicons';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import { addItemToCart, } from '../redux/CartSlice';
import data from '../common/Productlist'
import Modal from "react-native-modal";
import TabBar from '../common/TabBar';
import RadioGroup from 'react-native-radio-buttons-group';
import { useDispatch, useSelector } from 'react-redux';
// import { addwistlistItemToCart, removewistlistItemFromCart } from '../redux/wistlistSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const CategoryProductList = ({ route }) => {
  console.log("3232323", route)
  console.log("999", route.params.category)
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const primarycolor = "#066B8C"
  const zomatoRed = "#003243"
  const backgroundcolor = "#003243"
  const [sidebaropen, setsidebaropen] = useState(false);
  const [modelopen, setmodelopen] = useState(false)
  const [selectprice, setSelectprice] = useState([]);
  const wistlistProducts = useSelector(state => state.wistlist);
  const [selectedItems, setSelectedItems] = useState(wistlistProducts);
  const [cartlength, setcartlength] = useState("")
  const [page, setPage] = useState(1)
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true); // To prevent further requests when no more data is available
  const [dataLoadedMessage, setDataLoadedMessage] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [productlist, setProductlist] = useState([]);
  const [loader, setLoader] = useState(false);
  const viewabilityConfig = { viewAreaCoveragePercentThreshold: 95 };
  const Productlistdata = async (newPage = 1) => {
    if (isFetchingMore || !hasMoreData) return;

    setLoader(true);
    setIsFetchingMore(true);
    try {
      const loginDetails = await AsyncStorage.getItem('loginDetails');
      const modifiedUser = JSON.parse(loginDetails);
      axios.defaults.headers.common['Authorization'] = `Bearer ${modifiedUser.token}`;

      const response = await axios.get(
        `/v1/products?per_page=6&category_id=${route.params.dataitem}&page=${newPage}`
      );

      if (newPage === 1) {
        setProductlist(response.data.data.data); // Reset on first page
      } else {
        setProductlist((prev) => [...prev, ...response.data.data.data]);
      }

      setLoader(false);
      setIsFetchingMore(false);
      setHasMoreData(response.data.data.data.length > 0); // Check if more data is available
    } catch (error) {
      setLoader(false);
      setIsFetchingMore(false);
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    Productlistdata();
  }, []);

  const onRefresh = () => {
    setPage(1);
    setHasMoreData(true);
    Productlistdata(1);
  };

  const loadMoreData = () => {
    if (!isFetchingMore && hasMoreData) {
      setIsFetchingMore(true);  // Prevent multiple requests
      setTimeout(() => {
        setPage((prevPage) => prevPage + 1); // Increment the page after a short delay
        Productlistdata(page + 1);
      }, 200);  // Delay of 500ms for a smoother experience
    }
  };

  const calculateDiscountedPrice = (price, discount) => {
    const priceNumber = parseFloat(price);
    const discountNumber = parseFloat(discount);
    const discountAmount = (priceNumber * discountNumber) / 100;
    return priceNumber - discountAmount;
  };


  const toggleSelectItem = (item) => {
    setSelectedItems((prevSelectedItems) => {
      const isSelected = prevSelectedItems.some((selectedItem) => selectedItem.id === item.id);
      if (isSelected) {
        dispatch(removewistlistItemFromCart(item.id));
        ToastAndroid.show('Item removed from wishlist!', ToastAndroid.SHORT);
        return prevSelectedItems.filter((selectedItem) => selectedItem.id !== item.id);
      } else {
        const actualPrice = calculateDiscountedPrice(item.price, item.discount);
        dispatch(addwistlistItemToCart({ ...item, actualprice: actualPrice }));
        ToastAndroid.show('Item added to wishlist!', ToastAndroid.SHORT);
        return [...prevSelectedItems, item];
      }
    });
  };


  const filterbutton = useMemo(() => ([
    {
      id: "LowtoHigh",
      label: (
        <Text style={{ color: "#000", paddingLeft: 9 }}>{'Low to High'}</Text>
      ),
      color: backgroundcolor,
      size: responsiveFontSize(3),
      // value: 'option1'
    },
    {
      id: "HightoLow",
      label: (
        <Text style={{ color: "#000", paddingLeft: 9 }}>{'High to Low'}</Text>
      ),
      color: backgroundcolor,
      size: responsiveFontSize(3),
      // value: 'option2'
    },

    {
      id: "AtoZ",
      label: (
        <Text style={{ color: "#000", paddingLeft: 9 }}>{'A to Z'}</Text>
      ),
      color: backgroundcolor,
      size: responsiveFontSize(3),

    },
    {
      id: "ZtoA",
      label: (
        <Text style={{ color: "#000", paddingLeft: 9 }}>{'Z to A'}</Text>
      ),
      color: backgroundcolor,
      size: responsiveFontSize(3),

    },
  ]), []);

  const handleAddToCart = async (item) => {
    // console.log("22222", item)
    try {
      let mr = await AsyncStorage.getItem('loginDetails');
      const modifiedUser = JSON.parse(mr);

      axios.defaults.headers.common['Authorization'] = `Bearer ${modifiedUser.token}`;

      // Check if the item is already in the cart
      const isItemInCart = cartlength.some(cartItem => cartItem.product.id === item.id);

      if (isItemInCart) {
        ToastAndroid.show('Item already in the cart!', ToastAndroid.SHORT);
        return;
      }

      // If the item is not in the cart, add it
      const response = await axios.post(`/v1/user/carts`, {
        product_id: item.id,
        quantity: 1,
      });

      // Refresh the cart items to reflect the new addition
      cartaddproducts();

      if (response.status === 200) {
        ToastAndroid.show('Item added to cart!', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error('Error posting data:', error);
      ToastAndroid.show('Failed to add item to cart!', ToastAndroid.SHORT);
    }
  };

  const cartaddproducts = async () => {
    // console.log("popoopo")
    try {
      let mr = await AsyncStorage.getItem('loginDetails');
      const modifiedUser = JSON.parse(mr);
      axios.defaults.headers.common['Authorization'] = `Bearer ${modifiedUser.token}`;
      const response = await axios.get(`/v1/user/carts`);
      setcartlength(response.data.data)
      // console.log("Response898989898", response.data.data.length);

    } catch (error) {
      console.error('Errorpostingdata', error);
    }
  };

  useEffect(() => {
    cartaddproducts()
  }, [])

  useFocusEffect(
    useCallback(() => {
      cartaddproducts();
    }, [])
  );


  // test
  const [filteredProductlist, setFilteredProductlist] = useState([]);
  useEffect(() => {
    setFilteredProductlist(productlist); // Initially, set filtered list to all products
  }, [productlist]);


 

  // new one
  const FilterFunction = () => {
    setmodelopen(false);
    
    // Start with the entire product list
    let filteredData = [...productlist];

    // Filter based on the search query
    if (searchQuery.trim() !== "") {
      filteredData = filteredData.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting based on selected filter
    if (selectprice === "LowtoHigh") {
      filteredData = filteredData.sort((a, b) => a.mrp - b.mrp);
    } else if (selectprice === "HightoLow") {
      filteredData = filteredData.sort((a, b) => b.mrp - a.mrp);
    } else if (selectprice === "AtoZ") {
      filteredData = filteredData.sort((a, b) => a.name.localeCompare(b.name));
    } else if (selectprice === "ZtoA") {
      filteredData = filteredData.sort((a, b) => b.name.localeCompare(a.name));
    }
    setFilteredProductlist(filteredData);
  };

  useEffect(() => {
    FilterFunction();
  }, [searchQuery]);



  return (
    <View style={{ flex: 1, backgroundColor: backgroundcolor }}>
      <StatusBar
        animated={true}
        backgroundColor={primarycolor}
        translucent={false}
        barStyle={"light-content"}
      />

      <View style={{
        width: "100%",
        backgroundColor: primarycolor,
        paddingHorizontal: 19,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 5,
        height: 45,
        elevation: 5
      }}>
        <View style={{
          alignItems: "center",
          flexDirection: "row",
        }}>


          <TouchableOpacity

            style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
            >
              <AntDesign name="arrowleft"
                style={{ fontSize: responsiveFontSize(2.2), color: "#fff" }}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: responsiveFontSize(2.2),
                color: "#fff",
                paddingLeft: 0,
                fontWeight: "600",
                paddingLeft: 5
              }}>Santirekha</Text>
          </TouchableOpacity>

        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("CartPage")}
        >
          <View
            style={{
              width: 18,
              height: 18,
              borderRadius: 100,
              backgroundColor: "#003243",
              alignItems: "center",
              position: "absolute",
              left: 13,
              bottom: 16
            }}>
            <Text style={{ color: "#fff", fontSize: responsiveFontSize(1.3), fontWeight: "600", paddingTop: 2 }}>{cartlength.length}</Text>
            {/* <Text style={{ color: "#fff", fontSize: responsiveFontSize(1.3), fontWeight: "600" }}>{cartProducts.length}</Text>response.data.data.length */}
          </View>
          <AntDesign name="shoppingcart"
            style={{ fontSize: responsiveFontSize(3), color: "#fff" }}
          />
        </TouchableOpacity>
      </View>


      {/* ////////////////////////Sorted By////////////// */}
      <View style={{ width: "100%", paddingHorizontal: 10 }}>
        <Text style={{ color: "#fff", fontSize: responsiveFontSize(2.7), fontWeight: "600" }}>
        {route.params.category}
        </Text>

        <Text style={{ color: "#a6a6a6", fontSize: responsiveFontSize(2), fontWeight: "500" }}>
          {productlist.length} Products
        </Text>
      </View>


      <View style={{
        width: "100%",
        paddingHorizontal: 10,
        marginTop: 5,
        flexDirection: "row",
        alignItems: "center",
      }}>
        <TouchableOpacity
          onPress={() => setmodelopen(true)}
          style={{
            width: "32%",
            backgroundColor: 'rgba(166, 166, 166, 0.6)',
            alignItems: "center",
            paddingVertical: 9,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 6

          }}>
          <Text style={{ fontSize: responsiveFontSize(2), color: "#fff", fontWeight: "400" }}>
            Sorted By
          </Text>

          <AntDesign
            style={{ fontSize: responsiveFontSize(2), color: "#fff", paddingLeft: 5 }}
            name="caretdown" />
        </TouchableOpacity>

        <View style={{ width: "68%", paddingLeft: 2 }}>
          <View View style={{ width: "100%", }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'rgba(166, 166, 166, 0.6)',
              borderRadius: 6,
              paddingHorizontal: 8,
              elevation: 3,
              width: "98%",
              alignSelf: "center",
              // borderColor: isSearchFocused ? zomatoRed : "", borderWidth: isSearchFocused ? 0.7 : 0,
            }}>
              <View style={{
                flexDirection: "row",
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <View style={{
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 5, marginRight: 3,
                }}>
                  <Icon2 name="search" size={18} color={"#fff"} />
                </View>
                <TextInput
                  placeholder="Search For Products"
                  placeholderTextColor="#fff"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  style={{ flex: 1, fontSize: responsiveFontSize(2.1), color: "#fff", paddingVertical: 5, fontWeight: "400", }}
                />
              </View>
            </View>
          </View>
        </View>
      </View>


      {loader ? (
        <View style={{ alignItems: 'center', justifyContent: 'center', height: '60%' }}>
          <ActivityIndicator size="small" color="#fff" animating={loader} />
          <Text style={{ color: '#fff',fontSize: responsiveFontSize(2) }}>Please wait...</Text>
        </View>
      )
        : (
          <>

            {filteredProductlist.length > 0 ? (
              <FlatList
                data={filteredProductlist}
                // data={filteredProductlist.length > 0 ? filteredProductlist : productlist}
                numColumns={2}
                style={{ marginHorizontal: 8, marginTop: 8 }}
                refreshControl={
                  <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#000']} />
                }
                onEndReached={loadMoreData}
                onEndReachedThreshold={0.2}
                ListFooterComponent={
                  dataLoadedMessage && !loader ? (
                    <View style={{ alignItems: 'center', padding: 10 }}>
                      <Text style={{ color: '#fff', fontSize: responsiveFontSize(2) }}>Data Loaded</Text>
                    </View>
                  ) : null
                }
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => navigation.navigate("ProductDetails", { DetailProduct: item })}
                    style={{
                      borderRadius: 5,
                      width: "48%",
                      margin: 3,
                      paddingBottom: 5,
                    }}>
                    <View
                      style={{
                        alignItems: "center",
                        backgroundColor: 'rgba(166, 166, 166, 0.6)',
                        paddingVertical: 10,
                        borderRadius: 5,
                        paddingVertical: 20
                      }}>



                      <TouchableOpacity 
                      // onPress={() => toggleSelectItem(item)} 
                      style={{ position: 'absolute', right: 9, top: 9 }}>
                        {/* <AntDesign
                      name={itemSelected ? 'heart' : 'hearto'}
                      style={{
                        fontSize: responsiveFontSize(2.8),
                        color: itemSelected ? backgroundcolor : "#fff",
                        // backgroundColor: itemSelected ? '#fff' : 'transparent',
                        borderRadius: 100,
                        padding: 3
                      }} /> */}
                        <AntDesign
                          name='hearto'
                          style={{
                            fontSize: responsiveFontSize(2.8),
                            color: "#fff",
                            // backgroundColor: itemSelected ? '#fff' : 'transparent',
                            borderRadius: 100,
                            padding: 3
                          }} />
                      </TouchableOpacity>

                      <Image
                        // source={item.image}
                        source={{ uri: item.thumb_image }}
                        style={{
                          width: 100,
                          height: 100,
                          alignItems: "center"
                        }}
                      />
                    </View>


                    <View style={{ paddingLeft: 5, paddingTop: 3 }}>
                      <Text style={{ color: "#fff", fontSize: responsiveFontSize(1.8), fontWeight: "400" }}>
                        {item.name}
                      </Text>
                    </View>

                    <View style={{ paddingLeft: 5, paddingTop: 3, flexDirection: "row" }}>
                      <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <AntDesign
                          style={{ color: "green", fontSize: responsiveFontSize(1.7), }}
                          name="arrowdown" />
                        <Text style={{ color: "green", fontSize: responsiveFontSize(1.7), fontWeight: "500" }}>
                          {item.discount}
                        </Text>
                      </View>
                      <Text
                        style={{
                          color: "grey",
                          fontSize: responsiveFontSize(1.7),
                          fontWeight: "500",
                          paddingLeft: 5,
                          textDecorationLine: 'line-through',
                        }}>
                        ₹ {item.mrp}
                      </Text>
                      <Text
                        style={{
                          color: "#fff",
                          fontSize: responsiveFontSize(1.7),
                          fontWeight: "500",
                          paddingLeft: 5,
                          // textDecorationLine: 'line-through',
                        }}>
                        {/* ₹ {actualPrice.toFixed(2)} */}
                        ₹ {item.price}
                      </Text>
                    </View >

                    <View style={{}}>
                      {item.is_shipping_free == "1" ?
                        <Text style={{ color: "green", fontWeight: "400", fontSize: responsiveFontSize(1.8), }}>
                          Free shipping included.
                        </Text> :
                        <Text style={{ color: "green", fontWeight: "400", fontSize: responsiveFontSize(2), }}>
                          paid shipping included.
                        </Text>
                      }
                    </View>

                    {/* Add to Bag */}
                    <TouchableOpacity TouchableOpacity

                      onPress={() => handleAddToCart(item)}
                      style={{
                        backgroundColor: "#001325",
                        alignItems: "center",
                        paddingVertical: 8,
                        marginTop: 5,
                        borderRadius: 5,

                      }}>
                      <Text style={{ color: "#fff", fontSize: responsiveFontSize(2), fontWeight: "600" }}>
                        Add to Bag
                      </Text>
                    </TouchableOpacity >
                  </TouchableOpacity >
                )}
                keyExtractor={item => item.id}
              />
            ) : (
              <View style={{ alignItems: 'center', justifyContent: 'center', height: '60%' }}>
                <View style={{
                  // fontSize: responsiveFontSize(1.6),
                  // color: "#000",
                }}>
                  <Image
                    source={require("../assets/Newfolder/cart.png")}
                    style={{ width: 120, height: 120 }}
                  />
                </View>
                <Text style={{ color: '#fff' }}>No Products Found</Text>
              </View>
            )}
          </>
        )}

      <View style={{ marginBottom: 60, }}>
      </View>

      <TabBar />

      {/* filter */}
      <Modal
        isVisible={modelopen}
        onBackdropPress={() => setmodelopen(false)}
        onSwipeComplete={() => setmodelopen(false)}
        // swipeDirection={['down']}
        backdropOpacity={0.5}
        style={{ justifyContent: 'flex-end', margin: 0 }}
      >
        <View
          style={{
            height: "auto",
            backgroundColor: "#fff",
            position: "absolute",
            bottom: 0,
            right: 0,
            left: 0,
            width: "100%",
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}>

          <View style={{ marginTop: 15 }}>
            <View style={{ width: "100%" }}>


              <View style={{ paddingHorizontal: 15, flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                <Text style={{ color: backgroundcolor, fontSize: responsiveFontSize(2.3), fontWeight: "700" }}>
                  Sort By
                </Text>
                <TouchableOpacity
                  onPress={() => setSelectprice("")}
                  style={{
                    backgroundColor: backgroundcolor,
                    borderRadius: 10,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Text style={{
                    color: "#fff",
                    fontSize: responsiveFontSize(1.5),
                    fontWeight: "300",
                    paddingHorizontal: 10,
                    paddingVertical: 2
                  }}>
                    Reset All
                  </Text>
                </TouchableOpacity>
              </View>


              <RadioGroup
                radioButtons={filterbutton}
                onPress={setSelectprice}
                selectedId={selectprice}
                containerStyle={{
                  // backgroundColor : '#f8f8f8',
                  borderRadius: 8,
                  overflow: 'hidden',
                  flexDirection: "column",
                  color: backgroundcolor,
                  paddingTop: 5,
                  alignItems: "flex-start",
                  paddingHorizontal: 10,
                  // paddingVertical:50
                }}
              />


            </View>
          </View>

          {/* buttonStyle */}

          <View
            style={{ width: '100%', flexDirection: 'row', paddingTop: 15, paddingHorizontal: 10 }}>

            <View
              style={{
                width: '50%',
                backgroundColor: backgroundcolor,
                borderRadius: 20,
              }}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setmodelopen(false)}>
                <Text
                  style={{
                    color: '#fff',
                    textAlign: 'center',
                    padding: 8,
                    borderRightColor: '#fff',
                    borderRightWidth: 1,
                    fontSize: 15,
                  }}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>


            <View
              style={{
                width: '50%',
                backgroundColor: '#fff',
                borderColor: backgroundcolor,
                borderWidth: 1,
                borderRadius: 20,
                marginLeft: 3,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center"
              }}>
              <TouchableOpacity
                onPress={() => FilterFunction()}
                activeOpacity={0.7}
                // 
                style={{
                }}>
                <Text
                  style={{
                    color: backgroundcolor,
                    textAlign: 'center',
                    padding: 8,
                    fontSize: 15,

                  }}>
                  Apply Filter
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ marginBottom: 10 }}></View>
        </View>
      </Modal>


    </View >
  )
}


export default CategoryProductList

const styles = StyleSheet.create({})


// import {
//   Image,
//   StyleSheet,
//   Text,
//   View,
//   StatusBar,
//   ToastAndroid,
//   FlatList,
//   TextInput,
//   TouchableOpacity,
//   ActivityIndicator,
//   RefreshControl
// } from 'react-native';
// import React, { useState, useEffect, useMemo, useCallback } from 'react';
// import { useNavigation, useFocusEffect } from '@react-navigation/native';
// import { responsiveFontSize } from 'react-native-responsive-dimensions';
// import Icon2 from 'react-native-vector-icons/Octicons';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import TabBar from '../common/TabBar';
// import { useDispatch, useSelector } from 'react-redux';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';

// const CategoryProductList = ({ route }) => {
//   const dispatch = useDispatch();
//   const navigation = useNavigation();
//   const primarycolor = '#066B8C';
//   const backgroundcolor = '#003243';

//   const [modelopen, setModelOpen] = useState(false);
//   const [selectprice, setSelectPrice] = useState('');
//   const wistlistProducts = useSelector((state) => state.wistlist);
//   const [selectedItems, setSelectedItems] = useState(wistlistProducts);
//   const [cartlength, setCartLength] = useState([]);
//   const [page, setPage] = useState(1);
//   const [isFetchingMore, setIsFetchingMore] = useState(false);
//   const [refreshing, setRefreshing] = useState(false);
//   const [hasMoreData, setHasMoreData] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [productlist, setProductList] = useState([]);
//   const [loader, setLoader] = useState(false);
//   const [filteredProductlist, setFilteredProductList] = useState([]);

//   const Productlistdata = async (newPage = 1) => {
//     if (isFetchingMore || !hasMoreData) return;

//     setLoader(true);
//     setIsFetchingMore(true);
//     try {
//       const loginDetails = await AsyncStorage.getItem('loginDetails');
//       const modifiedUser = JSON.parse(loginDetails);
//       axios.defaults.headers.common['Authorization'] = `Bearer ${modifiedUser.token}`;

//       const response = await axios.get(
//         `/v1/products?per_page=12&category_id=${route.params.dataitem}&page=${newPage}`
//       );

//       if (newPage === 1) {
//         setProductList(response.data.data.data); // Reset on first page
//       } else {
//         setProductList((prev) => [...prev, ...response.data.data.data]);
//       }

//       setLoader(false);
//       setIsFetchingMore(false);
//       setHasMoreData(response.data.data.data.length > 0); // Check if more data is available
//     } catch (error) {
//       setLoader(false);
//       setIsFetchingMore(false);
//       console.error('Error fetching data:', error);
//     }
//   };

//   useEffect(() => {
//     Productlistdata();
//   }, []);

//   const onRefresh = () => {
//     setPage(1);
//     setHasMoreData(true);
//     Productlistdata(1);
//   };

//   const loadMoreData = () => {
//     if (!isFetchingMore && hasMoreData) {
//       setPage((prevPage) => prevPage + 1); // Increment the page
//       Productlistdata(page + 1);
//     }
//   };

//   const calculateDiscountedPrice = (price, discount) => {
//     const priceNumber = parseFloat(price);
//     const discountNumber = parseFloat(discount);
//     const discountAmount = (priceNumber * discountNumber) / 100;
//     return priceNumber - discountAmount;
//   };

//   const toggleSelectItem = (item) => {
//     setSelectedItems((prevSelectedItems) => {
//       const isSelected = prevSelectedItems.some((selectedItem) => selectedItem.id === item.id);
//       if (isSelected) {
//         dispatch(removewistlistItemFromCart(item.id));
//         ToastAndroid.show('Item removed from wishlist!', ToastAndroid.SHORT);
//         return prevSelectedItems.filter((selectedItem) => selectedItem.id !== item.id);
//       } else {
//         const actualPrice = calculateDiscountedPrice(item.price, item.discount);
//         dispatch(addwistlistItemToCart({ ...item, actualprice: actualPrice }));
//         ToastAndroid.show('Item added to wishlist!', ToastAndroid.SHORT);
//         return [...prevSelectedItems, item];
//       }
//     });
//   };

//   const FilterFunction = () => {
//     setModelOpen(false);

//     let filteredData = [...productlist];

//     if (searchQuery.trim() !== '') {
//       filteredData = filteredData.filter((item) =>
//         item.name.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     if (selectprice === 'LowtoHigh') {
//       filteredData.sort((a, b) => a.mrp - b.mrp);
//     } else if (selectprice === 'HightoLow') {
//       filteredData.sort((a, b) => b.mrp - a.mrp);
//     } else if (selectprice === 'AtoZ') {
//       filteredData.sort((a, b) => a.name.localeCompare(b.name));
//     } else if (selectprice === 'ZtoA') {
//       filteredData.sort((a, b) => b.name.localeCompare(a.name));
//     }

//     setFilteredProductList(filteredData);
//   };

//   useEffect(() => {
//     FilterFunction();
//   }, [searchQuery]);

//   return (
//     <View style={{ flex: 1, backgroundColor: backgroundcolor }}>
//       <StatusBar
//         animated={true}
//         backgroundColor={primarycolor}
//         translucent={false}
//         barStyle="light-content"
//       />

//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <AntDesign name="arrowleft" style={styles.icon} />
//         </TouchableOpacity>
//         <Text style={styles.headerText}>{route.params.category}</Text>
//         <TouchableOpacity onPress={() => navigation.navigate('CartPage')}>
//           <AntDesign name="shoppingcart" style={styles.icon} />
//         </TouchableOpacity>
//       </View>

//       <View style={{ width: '100%', paddingHorizontal: 10 }}>
//         <Text style={{ color: '#fff', fontSize: responsiveFontSize(2.7), fontWeight: '600' }}>
//           {route.params.category}
//         </Text>
//         <Text style={{ color: '#a6a6a6', fontSize: responsiveFontSize(2), fontWeight: '500' }}>
//           {productlist.length} Products
//         </Text>
//       </View>

//       {loader ? (
//         <View style={{ alignItems: 'center', justifyContent: 'center', height: '60%' }}>
//           <ActivityIndicator size="small" color="#fff" animating={loader} />
//           <Text style={{ color: '#fff' }}>Please wait...</Text>
//         </View>
//       ) : (
//         <FlatList
//           data={filteredProductlist.length > 0 ? filteredProductlist : productlist}
//           numColumns={2}
//           style={{ marginHorizontal: 8, marginTop: 8 }}
//           refreshControl={
//             <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#000']} />
//           }
//           onEndReached={loadMoreData}
//           onEndReachedThreshold={0.1}
//           renderItem={({ item }) => (
//             <TouchableOpacity
//               onPress={() => navigation.navigate('ProductDetails', { DetailProduct: item })}
//               style={styles.productItem}
//             >
//               <Image source={{ uri: item.thumb_image }} style={styles.productImage} />
//               <Text style={styles.productText}>{item.name}</Text>
//             </TouchableOpacity>
//           )}
//           keyExtractor={(item) => item.id.toString()}
//         />
//       )}
//       <TabBar />
//     </View>
//   );
// };

// export default CategoryProductList;

// const styles = StyleSheet.create({
//   header: {
//     width: '100%',
//     backgroundColor: '#066B8C',
//     paddingHorizontal: 19,
//     alignItems: 'center',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 5,
//     height: 45,
//     elevation: 5
//   },
//   icon: {
//     fontSize: responsiveFontSize(3),
//     color: '#fff'
//   },
//   headerText: {
//     fontSize: responsiveFontSize(2.2),
//     color: '#fff',
//     fontWeight: '600'
//   },
//   productItem: {
//     borderRadius: 5,
//     width: '48%',
//     margin: 3,
//     paddingBottom: 5
//   },
//   productImage: {
//     height: 130,
//     borderRadius: 8,
//     resizeMode: 'contain'
//   },
//   productText: {
//     color: '#fff',
//     fontSize: responsiveFontSize(1.8)
//   }
// });








