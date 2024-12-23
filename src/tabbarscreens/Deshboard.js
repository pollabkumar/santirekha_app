import {ActivityIndicator, Image, StyleSheet, Text, View, StatusBar, ScrollView, Dimensions, TextInput, TouchableOpacity } from 'react-native'
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { responsiveFontSize } from "react-native-responsive-dimensions";
import Entypo from 'react-native-vector-icons/dist/Entypo';
import Icon2 from 'react-native-vector-icons/dist/Octicons';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import TabBar from '../common/TabBar';
import image1 from '../assets/Newfolder/11.png'
import image2 from '../assets/Newfolder/6.png'
import image3 from '../assets/Newfolder/14.png'
import image4 from '../assets/Newfolder/66.png'
import image5 from '../assets/Newfolder/9.png'
import image6 from '../assets/Newfolder/0909.png'
import milk from '../assets/Newfolder/2.png'
import Soap from '../assets/Newfolder/8.png'
import Biscuit from '../assets/Newfolder/3.png'
import Egg from '../assets/Newfolder/4.png'
import Modal from "react-native-modal";
import SidebarModal from '../common/SidebarModal';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const { width } = Dimensions.get('window');
const Deshboard = () => {
    const navigation = useNavigation();
    const cartProducts = useSelector(state => state.cart);
    const primarycolor = "#066B8C"
    const zomatoRed = "#003243"
    const [sidebaropen, setsidebaropen] = useState(false);
    const [asyncdata, setasyncdata] = useState("");
    const backgroundcolor = "#003243"
    const [loader, setLoader] = useState(false);
    // const black = "#000"
    const scrollViewRef = useRef(null);
    const bannerImages = [
        require('../assets/tyty.jpg'),
        require('../assets/tyu.jpg'),
        require('../assets/banner.jpg'),
    ];

    const [getcategory, setgetcategory] = useState("");
    const categorylist = async () => {
        setLoader(true);
        try {
            let mr = await AsyncStorage.getItem('loginDetails');
            const modifiedUser = JSON.parse(mr);
            setasyncdata(modifiedUser)
            console.log("3333333333", modifiedUser)
            axios.defaults.headers.common['Authorization'] = `Bearer ${modifiedUser.token}`;
            const response = await axios.get(`/v1/lookup`);
            setgetcategory(response.data.data.categories)
            // console.log("00000000", response.data.data.categories);
            setLoader(false);
        } catch (error) {
            setLoader(false);
            console.error('Errorpostingdata', error);
        }
    };

    useEffect(() => {
        categorylist()
    }, [])
    const [cardadditem, setcardadditem] = useState("");

    const cartaddproducts = async () => {
        // console.log("popoopo")
        try {
            let mr = await AsyncStorage.getItem('loginDetails');
            const modifiedUser = JSON.parse(mr);
            axios.defaults.headers.common['Authorization'] = `Bearer ${modifiedUser.token}`;
            const response = await axios.get(`/v1/user/carts`);
            setcardadditem(response.data.data)
            // console.log("Response898989898", response.data.data.length);

        } catch (error) {
            console.error('Errorpostingdata', error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            cartaddproducts();
        }, [])
    );



    const products = [
        { id: 0, img: milk, text: "Milk" },
        { id: 1, img: image4, text: "Chips" },
        { id: 2, img: image6, text: "Drinks" },
        { id: 3, img: Soap, text: "Soap" },
        { id: 4, img: Biscuit, text: "Biscuit" },
        { id: 5, img: Egg, text: "Egg" },
        { id: 6, img: milk, text: "Milk" },
        { id: 7, img: image4, text: "Chips" },
        { id: 8, img: image6, text: "Drinks" },
        { id: 9, img: Soap, text: "Soap" },
        { id: 10, img: Biscuit, text: "Biscuit" },
        { id: 11, img: Egg, text: "Egg" },
    ]



    useEffect(() => {
        let currentIndex = 0;
        const interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % bannerImages.length;
            scrollViewRef.current.scrollTo({ x: currentIndex * width, animated: true });
        }, 3000);
        return () => clearInterval(interval);
    }, [bannerImages.length]);

    useFocusEffect(
        React.useCallback(() => {
            return () => {
                setsidebaropen(false);
            };
        }, [])
    );

    return (
        <View style={{ flex: 1, backgroundColor: backgroundcolor }}>
            <StatusBar
                animated={true}
                backgroundColor={primarycolor}
                translucent={false}
                barStyle={"light-content"}
            />

            <View style={{ alignItems: "center", backgroundColor: primarycolor, paddingTop: 10 }}>
                <Text style={{
                    fontSize: responsiveFontSize(2.2),
                    color: "#fff",
                    paddingLeft: 5,
                    fontWeight: "600",
                    // backgroundColor: primarycolor,

                }}>
                    SANTIREKHA RETAIL
                </Text>
            </View>

            <View style={{
                width: "100%",
                backgroundColor: primarycolor,
                paddingHorizontal: 10,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: 5,
                height: 50,
                paddingTop: 5,
                // marginBottom:10
            }}>
                <TouchableOpacity
                    onPress={() => setsidebaropen(true)}
                    style={{ flexDirection: "row", alignItems: "center" }}>
                    <Entypo name="menu" style={{ fontSize: responsiveFontSize(4.5), color: "#fff" }} />

                </TouchableOpacity>

                <View style={{ flexDirection: "row", gap: 4 }}>

                    <View style={{
                        // backgroundColor: 'rgba(166, 166, 166, 0.6)',
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                        padding: 3,
                        borderRadius: 5,
                        alignItems: "center"
                    }}>
                        {
                            asyncdata.p_code?
                            <Text style={{ fontSize: responsiveFontSize(1.6), color: "#fff", paddingLeft: 5, fontWeight: "600" }}>{asyncdata.p_code}</Text>
                            :<Text style={{ fontSize: responsiveFontSize(1.5), color: "#a9a9a9", paddingLeft: 5, fontWeight: "600" }}>None</Text>
                        }
                        <Text style={{ fontSize: responsiveFontSize(1.5), color: "#fff", paddingLeft: 5, fontWeight: "600" }}>Own Promo code</Text>
                    </View>

                    <View style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                        padding: 3,
                        borderRadius: 5,
                        alignItems: "center"
                    }}>
                        <Text style={{ fontSize: responsiveFontSize(1.6), color: "#fff", paddingLeft: 5, fontWeight: "600" }}>150</Text>
                        <Text style={{ fontSize: responsiveFontSize(1.5), color: "#fff", paddingLeft: 5, fontWeight: "600" }}>Total Promo Bonus</Text>
                    </View>

                    <View style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                        padding: 3,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 5,
                    }}>
                        <Text style={{ fontSize: responsiveFontSize(1.9), color: "#fff", fontWeight: "600" }}>SP</Text>
                        {/* <Text style={{ fontSize: responsiveFontSize(1.6), color: "#fff", paddingLeft: 5, fontWeight: "600" }}>SP</Text> */}
                    </View>

                    <TouchableOpacity
                        onPress={() => navigation.navigate("CartPage")}
                        style={{ marginRight: 5 }}
                    >
                        <View
                            style={{
                                width: 19,
                                height: 19,
                                borderRadius: 100,
                                backgroundColor: "#003243",
                                alignItems: "center",
                                position: "absolute",
                                left: 13,
                                bottom: 20
                            }}>
                            <Text style={{ color: "#fff", fontSize: responsiveFontSize(1.3), fontWeight: "600", paddingTop: 2 }}>{cardadditem.length}</Text>
                        </View>
                        <AntDesign name="shoppingcart"
                            style={{ fontSize: responsiveFontSize(3), color: "#fff", paddingTop: 10 }}
                        />
                    </TouchableOpacity>

                </View>

            </View>

            <ScrollView>
                {/* Searchbar */}
                <View View style={{ width: "100%", paddingHorizontal: 5, marginTop: 5, }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: "#D9D9D9",
                        borderRadius: 20,
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
                                <Icon2 name="search" size={18} color={zomatoRed} />
                            </View>
                            <TextInput
                                placeholder="Search Your Grocery Products"
                                placeholderTextColor="#a1a1a1"
                                // onChangeText={searchHandler}
                                // value={search}
                                // onFocus={() => setIsSearchFocused(true)}
                                // onBlur={() => setIsSearchFocused(false)}
                                style={{ flex: 1, fontSize: responsiveFontSize(2.1), color: "#000", paddingVertical: 5, fontWeight: "500", }}
                            />

                        </View>
                    </View>
                </View>
                {/* banner */}
                <View style={{ marginTop: 8, height: 160 }}>
                    <ScrollView
                        ref={scrollViewRef}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        style={styles.scrollView}
                    >
                        {bannerImages.map((image, index) => (
                            <Image
                                key={index}
                                source={image}
                                style={styles.image}
                                resizeMode="cover"
                            />
                        ))}
                    </ScrollView>
                </View>


                {/* categories */}
                {loader ?
                    <View style={{ flex: 2, flexDirection: 'column', justifyContent: 'center', alignItems: 'center',paddingTop:10}}>
                        <ActivityIndicator size="small" color="#fff" animating={loader} />
                        <Text style={{ fontSize: 10, color: "#fff", fontWeight: "400", }}>Please wait</Text>
                    </View> :
                    <View style={{
                        marginTop: 10,
                        flexWrap: "wrap",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 5
                    }}>
                        {
                            getcategory && getcategory.map((item, index) => {
                                console.log("84864864", item)
                                let imageStyle = { height: 80, width: 90 };
                                if (index === 0) {
                                    imageStyle = { height: 90, width: 90, bottom: 5 };
                                } else if (index === 1) {
                                    imageStyle = { height: 80, width: 80 };
                                } else if (index === 2) {
                                    imageStyle = { height: 99, width: 80, bottom: 10 };
                                } else if (index === 3) {
                                    imageStyle = { height: 70, width: 80, tjop: 5 };
                                } else if (index === 4) {
                                    imageStyle = { height: 90, width: 90, bottom: 10 };
                                } else if (index === 5) {
                                    imageStyle = { height: 80, width: 80, top: 5 };
                                }
                                return (
                                    <TouchableOpacity

                                        style={{ width: "31%", flexDirection: "column", alignItems: "center", marginVertical: 9 }}>
                                        <TouchableOpacity
                                            // onPress={() => navigation.navigate("CategoryProductList", { dataitem: item.name })}
                                            onPress={() => navigation.navigate("CategoryProductList", { dataitem: item.id ,category: item.name })}
                                            key={item.id}
                                            style={{
                                                // backgroundColor: 'rgba(166, 166, 166, 0.6)',

                                                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                                                height: 60,
                                                width: "100%",
                                                marginTop: 40,
                                                borderRadius: 10,
                                            }}>
                                            <View style={{ alignItems: "center", bottom: 40 }}>
                                                <Image
                                                    source={{ uri: item.image }}
                                                    style={imageStyle} />
                                            </View>
                                        </TouchableOpacity>
                                        <Text style={{ fontSize: responsiveFontSize(2), color: "#fff" }}>{item.name}</Text>
                                    </TouchableOpacity>
                                );
                            })
                        }

                    </View>
}

                {/* add section */}
                <View style={{ marginHorizontal: 10, marginTop: 10 }}>
                    <View style={{
                        backgroundColor: backgroundcolor,
                        elevation: 10,
                        width: "100%",
                        height: 70,
                        alignItems: "center",
                        justifyContent: 'center',
                    }}>
                        <Text style={{ fontSize: responsiveFontSize(2.2), color: "#fff", fontWeight: "400" }}>Special offer</Text>
                    </View>
                </View>

                {/* products */}
                <View style={{
                    marginTop: 20,
                    flexWrap: "wrap",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 5
                }}>
                    {
                        products.map((item, index) => {

                            let imageStyle = { height: 50, width: 50 };
                            if (index === 0) {
                                imageStyle = { height: 50, width: 50, };
                            } else if (index === 1) {
                                imageStyle = { height: 50, width: 50 };
                            } else if (index === 2) {
                                imageStyle = { height: 50, width: 50, };
                            } else if (index === 3) {
                                imageStyle = { height: 50, width: 50, };
                            } else if (index === 4) {
                                imageStyle = { height: 50, width: 50, };
                            } else if (index === 5) {
                                imageStyle = { height: 50, width: 50, };
                            }
                            return (
                                <TouchableOpacity style={{ width: "31%", flexDirection: "column", alignItems: "center" }}>
                                    <TouchableOpacity
                                        // onPress={()=>navigation.navigate("ProductDetails")}
                                        key={item.id} style={{
                                            backgroundColor: 'rgba(0, 0, 0, 0.4)',

                                            width: "100%",
                                            //   marginTop: 40,
                                            borderRadius: 10,
                                            alignItems: "center",
                                            justifyContent: "center",
                                            paddingVertical: 10
                                        }}>
                                        <Image
                                            source={item.img}
                                            style={imageStyle} />
                                        <Text style={{ fontSize: responsiveFontSize(2), color: "#fff", fontWeight: "400", paddingTop: 4 }}>{item.text}</Text>

                                    </TouchableOpacity>
                                </TouchableOpacity>
                            );
                        })
                    }

                </View>

                <View style={{ marginBottom: 60 }}></View>

            </ScrollView>

            <SidebarModal isVisible={sidebaropen} onClose={() => setsidebaropen(false)} />
            <TabBar />
        </View>
    )
}

export default Deshboard

const styles = StyleSheet.create({
    scrollView: {
        width: '100%',
    },
    image: {
        width: width - 20,
        height: 160,
        borderRadius: 5,
        marginHorizontal: 10,
    },
});