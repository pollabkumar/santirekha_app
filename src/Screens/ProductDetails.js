
import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  Image, StyleSheet, Text, View, StatusBar, TextInput, TouchableOpacity, Alert,
  Share, ToastAndroid
} from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import TabBar from '../common/TabBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const ProductDetails = ({ route }) => {
  console.log("routeroute", route.params.DetailProduct)
  const primarycolor = "#066B8C";
  const backgroundcolor = "#003243";
  const navigation = useNavigation();
  const [promoreceived, setpromoreceived] = useState("");

  const promocode = [
    { code: "poll", discountprice: 20 }
  ]



  // const onShare = async () => {
  //   try {
  //     const result = await Share.share({
  //       message:
  //         'Santirekha Retail',
  //     });
  //     if (result.action === Share.sharedAction) {

  //       if (result.activityType) {
  //       } else {
  //         // shared
  //       }
  //     } else if (result.action === Share.dismissedAction) {
  //       // dismissed
  //     }
  //   } catch (error) {
  //     Alert.alert(error.message);
  //   }
  // };


  const onShare = async () => {
    // setModalVisible(true);  // Show the modal with the image before sharing
    try {
      const result = await Share.share({
        message: `Check out ${route.params.DetailProduct.name} on Santirekha Retail! Download the app here: https://example.com/app`,
        url: route.params.DetailProduct?.thumb_image,  // Share the image URL
      });

      if (result.action === Share.sharedAction) {
        // Shared successfully
      } else if (result.action === Share.dismissedAction) {
        // Dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    } finally {
      setModalVisible(false);  // Hide the modal once sharing is done
    }
  };

  // const onShare = async () => {
  //   try {
  //     const message = `
  //       🛍️ Check out this product on Santirekha Retail:
  //       - ${route.params.DetailProduct.name}
  //       - Price: ₹${route.params.DetailProduct.price}
  //       - MRP: ₹${route.params.DetailProduct.mrp}

  //       📱 Download our app for more amazing products: [App Download Link]
  //     `;

  //     const result = await Share.share({
  //       message: message
  //     });

  //     if (result.action === Share.sharedAction) {
  //       // Shared successfully
  //     } else if (result.action === Share.dismissedAction) {
  //       // Dismissed
  //     }
  //   } catch (error) {
  //     Alert.alert(error.message);
  //   }
  // };


  const [discountedPrice, setDiscountedPrice] = useState();
  const calculatepromocode = () => {
    const promo = promocode.find(item => item.code === promoreceived);
    if (promo) {
      const newPrice = "160" - promo.discountprice;
      setDiscountedPrice(newPrice);
      Alert.alert("Promo code applied!", `You received a discount of $${promo.discountprice}`);
    } else {
      Alert.alert("Invalid promo code", "Please enter a valid promo code");
    }
  };


  const [cartlength, setcartlength] = useState([]);
  const [isInCart, setIsInCart] = useState(false);

  const cartaddproducts = async () => {
    try {
      let mr = await AsyncStorage.getItem('loginDetails');
      const modifiedUser = JSON.parse(mr);
      axios.defaults.headers.common['Authorization'] = `Bearer ${modifiedUser.token}`;
      const response = await axios.get(`/v1/user/carts`);
      setcartlength(response.data.data);
      const isProductInCart = response.data.data.some(item => item.product.id === route.params.DetailProduct.id);
      setIsInCart(isProductInCart);

    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  useEffect(() => {
    cartaddproducts();
  }, []);

  useFocusEffect(
    useCallback(() => {
      cartaddproducts();
    }, [])
  );

  const handleAddToCart = async (item) => {
    if (isInCart) {
      ToastAndroid.show('Item already in cart', ToastAndroid.SHORT);
      return;
    }

    try {
      let mr = await AsyncStorage.getItem('loginDetails');
      const modifiedUser = JSON.parse(mr);

      axios.defaults.headers.common['Authorization'] = `Bearer ${modifiedUser.token}`;
      const response = await axios.post(`/v1/user/carts`, {
        product_id: item.id,
        quantity: 1,
      });
      cartaddproducts();

      if (response.status === 200) {
        ToastAndroid.show('Item added to cart!', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error('Error posting data:', error);
      ToastAndroid.show('Failed to add item to cart!', ToastAndroid.SHORT);
    }
  };


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
              paddingLeft: 6
            }}>Product Details</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("CartPage")}
        >
          <View
            style={{
              width: 15,
              height: 15,
              borderRadius: 100,
              backgroundColor: "#fff",
              alignItems: "center",
              position: "absolute",
              left: 13,
              bottom: 16
            }}>
            <Text style={{ color: "#000", fontSize: 10, fontWeight: "600" }}>{cartlength.length}</Text>
          </View>
          <AntDesign name="shoppingcart"
            style={{ fontSize: responsiveFontSize(3), color: "#fff" }}
          />
        </TouchableOpacity>
      </View>

      <View style={{
        flexDirection: "row",
        width: "100%",
        marginTop: 10,
      }}>
        <View style={{
          width: "45%",
          justifyContent: "center",
          alignItems: "center",
          // marginTop: 5,
        }}>
          <View
            style={{
              width: "90%",
              backgroundColor: 'rgba(166, 166, 166, 0.6)',
              borderRadius: 10,
              paddingVertical: 15,
              alignItems: "center",
            }}>
            <Image
              source={{uri:route.params.DetailProduct?.thumb_image}}
              style={{ width: 150, height: 150 }}
              resizeMode="contain"
            />
          </View>
        </View>

        <View style={{ width: "55%", }}>
          <View
            style={{
              width: "100%",
              // paddingTop: 10,
              paddingHorizontal: 5,

            }}>

            <Text style={{
              fontSize: responsiveFontSize(1.9),
              fontWeight: "500",
              color: "#fff"
            }}>Santirekha Retail</Text>

            <View style={{ flexDirection: "row", position: "relative", right: 0, width: "100%", marginTop: 4 }}>
              <TouchableOpacity style={{ backgroundColor: 'rgba(166, 166, 166, 0.6)', padding: 5, borderRadius: 50, }}>
                <AntDesign
                  name="hearto"
                  style={{ fontSize: responsiveFontSize(2), color: "#fff" }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onShare()}
                style={{ backgroundColor: 'rgba(166, 166, 166, 0.6)', padding: 5, borderRadius: 50, marginLeft: 5 }}>
                <MaterialCommunityIcons
                  name="share-all-outline"
                  style={{ fontSize: responsiveFontSize(2), color: "#fff" }}
                />

              </TouchableOpacity>
            </View>

            <View style={{ marginTop: 5 }}>
              <Text
                style={{
                  fontSize: responsiveFontSize(1.9),
                  fontWeight: "600",
                  color: "#fff"
                }}>
                {/* AASHIRVAAD AASHIRVAAD ATTA(1kg) */}
                {route.params.DetailProduct.name}
              </Text>
            </View>

            <View style={{
              flexDirection: "row", alignItems: "center", paddingTop: 5
            }}>
              <TouchableOpacity
                style={{
                  backgroundColor: 'rgba(166, 166, 166, 0.6)', paddingVertical: 5, borderRadius: 50, paddingHorizontal: 8
                }}>
                <FontAwesome5
                  name="rupee-sign"
                  style={{ fontSize: responsiveFontSize(1.7), color: "#fff" }}
                />
              </TouchableOpacity>

              <View>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: responsiveFontSize(2.3),
                    fontWeight: "500",
                    paddingLeft: 5,
                    // textDecorationLine: 'line-through',
                  }}>
                  {route.params.DetailProduct.price}
                </Text>
              </View>
              {/* <>
              {
                discountedPrice && discountedPrice ?
              <Text
                style={{
                  color: "#fff",
                  fontSize: responsiveFontSize(2.3),
                  fontWeight: "500",
                  paddingLeft: 5,
                  // textDecorationLine: 'line-through',
                }}>
                {discountedPrice}
              </Text>:
              <Text
              style={{
                color: "#fff",
                fontSize: responsiveFontSize(2.3),
                fontWeight: "500",
                paddingLeft: 5,
                // textDecorationLine: 'line-through',
              }}>
              160
            </Text>
              }
              
              </> */}
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  color: "#fff",
                  fontSize: responsiveFontSize(1.6),
                  fontWeight: "500",
                  // paddingLeft: 5,
                  // textDecorationLine: 'line-through',
                }}>
                MRP
              </Text>
              <Text
                style={{
                  color: "#fff",
                  fontSize: responsiveFontSize(1.6),
                  fontWeight: "500",
                  paddingLeft: 5,
                  textDecorationLine: 'line-through',
                }}>
                ₹ {route.params.DetailProduct.mrp}
              </Text>
              {/* <View style={{ flexDirection: "row", alignItems: "center", paddingLeft: 4 }}>
                <Text style={{ color: "#bebebe", fontSize: responsiveFontSize(2), fontWeight: "500" }}>
                  (
                </Text>
                <AntDesign
                  style={{ color: "#bebebe", fontSize: responsiveFontSize(1.6), }}
                  name="arrowdown" 
                  />
                <Text style={{ color: "#bebebe", fontSize: responsiveFontSize(1.6), fontWeight: "500" }}>
                  20%
                </Text>
                <Text style={{ color: "#bebebe", fontSize: responsiveFontSize(2), fontWeight: "500" }}>
                  )
                </Text>
              </View> */}
            </View>

            {/* <View style={{}}>
              <Text style={{
                paddingTop: 3,
                color: "#ffff",
                fontSize: responsiveFontSize(1.5),
                fontWeight: "300"
              }}>Share & Win Rs. 10</Text>
            </View> */}

            <View style={{}}>
              <Text style={{
                paddingTop: 3,
                color: "#ffff",
                fontSize: responsiveFontSize(1.5),
                fontWeight: "300"
              }}> {route.params.DetailProduct.long_desc}</Text>
            </View>
            {/* <View style={{}}>
              {route.params.DetailProduct.is_shipping_free == "1" ?
                <Text style={{ color: "green", fontWeight: "400", fontSize: responsiveFontSize(1.8), }}>
                  Free shipping included.
                </Text> :
                <Text style={{ color: "#000", fontWeight: "400", fontSize: responsiveFontSize(2), }}>
                  paid shipping included.
                </Text>
              }
            </View> */}

          </View>

          <View style={{ marginHorizontal: 5, position: "absolute", bottom: 2, width: "95%" }}>
            <TouchableOpacity
              onPress={() => handleAddToCart(route.params.DetailProduct)}
              style={{
                backgroundColor: primarycolor,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 7,
                borderRadius: 5,
                width: "100%",


              }}
            >
              <Entypo
                name="shopping-bag"
                style={{ fontSize: responsiveFontSize(2.3), color: "#fff" }} />
              <Text
                style={{ fontSize: responsiveFontSize(2), color: "#fff", paddingLeft: 5, fontWeight: "600" }}
              >
                Add to Bag
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>



      <View style={{ marginHorizontal: 10, marginTop: 6 }}>
        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
          <TouchableOpacity style={{ backgroundColor: 'rgba(166, 166, 166, 0.6)', padding: 5, borderRadius: 50, }}>
            <MaterialCommunityIcons
              name="note-text"
              style={{
                color: "#fff",
                fontSize: responsiveFontSize(2),
                fontWeight: "600"
              }}
            />
          </TouchableOpacity>
          <Text style={{
            color: "#fff",
            fontSize: responsiveFontSize(2.5),
            fontWeight: "500",
            paddingLeft: 5
          }}>
            Description
          </Text>
        </View>

        <View style={{ paddingHorizontal: 5 }}>
          <Text style={{
            color: "#fff",
            fontSize: responsiveFontSize(2),
            fontWeight: "400",
            paddingTop: 5
            // alignSelf: "center"
          }}>
            {route.params.DetailProduct.short_desc}
          </Text>
        </View>
      </View>

      <TabBar />
    </View>
  )
}

export default ProductDetails

const styles = StyleSheet.create({})



