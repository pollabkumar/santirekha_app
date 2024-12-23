import { Image, StyleSheet, Text, View, StatusBar, ScrollView, FlatList, ToastAndroid, TouchableOpacity } from 'react-native'
import React, { useRef, useEffect, useState } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { responsiveFontSize } from "react-native-responsive-dimensions";
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import aashirvaadAttaImage from '../assets/Newfolder/66.png';
import { useSelector, useDispatch } from 'react-redux';
// import { addItemToCart } from '../redux/CartSlice';
// import { removewistlistItemFromCartlist } from '../redux/wistlistSlice';
import TabBar from '../common/TabBar';
const WistList = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const primarycolor = "#066B8C"
    const [sidebaropen, setsidebaropen] = useState(false);
    const cartProducts = useSelector(state => state.cart);
    const wistlistProducts = useSelector(state => state.wistlist);
    console.log("datadata", wistlistProducts)

    const calculateDiscountedPrice = (price, discount) => {
        const priceNumber = parseFloat(price);
        const discountNumber = parseFloat(discount);
        const discountAmount = (priceNumber * discountNumber) / 100;
        return priceNumber - discountAmount;
    };


    return (
        <View style={{ flex: 1, backgroundColor: "#003243" }}>
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
                    onPress={() => setsidebaropen(true)}
                    style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                    >
                        <AntDesign name="arrowleft"
                            style={{ fontSize: responsiveFontSize(2.2), color: "#fff" }}
                        />
                    </TouchableOpacity>
                    <Text
                        style={{ fontSize: responsiveFontSize(2.2), color: "#fff", paddingLeft: 5, fontWeight: "600" }}>
                        WistList
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate("CartPage")}
                >
                    <View
                        style={{
                            width: 17,
                            height: 17,
                            borderRadius: 100,
                            backgroundColor: "#003243",
                            alignItems: "center",
                            position: "absolute",
                            left: 13,
                            bottom: 16
                        }}>
                        <Text style={{ color: "#fff", fontSize: responsiveFontSize(1.3), fontWeight: "600" }}>{cartProducts.length}</Text>
                    </View>
                    <AntDesign name="shoppingcart"
                        style={{ fontSize: responsiveFontSize(3), color: "#fff" }}
                    />
                </TouchableOpacity>
            </View>

            {wistlistProducts.length === 0 ?

                (
                    <View style={{
                        flex: 2,
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <View style={{
                            // fontSize: responsiveFontSize(1.6),
                            // color: "#000",
                        }}>
                            <Image
                                source={require("../assets/Newfolder/cart.png")}
                                style={{ width: 120, height: 120 }}
                            />
                        </View>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Deshboard")}
                            style={{
                                backgroundColor: primarycolor,
                                paddingVertical: 12,
                                paddingHorizontal: 20,
                                borderRadius: 5

                            }}>
                            <Text style={{
                                fontSize: responsiveFontSize(1.9),
                                color: "#fff",
                                fontWeight: "500"
                            }}>
                                Go to the shopping page
                            </Text>
                        </TouchableOpacity>
                    </View>

                )
                :
                (
                    <FlatList
                        data={wistlistProducts}
                        numColumns={2}
                        style={{ marginHorizontal: 8, marginTop: 8 }}
                        renderItem={({ item }) => {
                            const actualPrice = calculateDiscountedPrice(item.price, item.discount);
                            return (
                                <TouchableOpacity
                                    onPress={() => navigation.navigate("ProductDetails")}
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
                                            // onPress={() => dispatch(removewistlistItemFromCartlist(item))}
                                            onPress={() => dispatch(removewistlistItemFromCartlist(item))}
                                            style={{ position: 'absolute', right: 9, top: 9 }}>
                                            <MaterialIcons
                                                name="delete"
                                                style={{ color: "#fff", fontSize: responsiveFontSize(2.6), }}
                                            />
                                        </TouchableOpacity>
                                        <Image
                                            source={item.image}
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
                                            ₹ {item.price}
                                        </Text>
                                        <Text
                                            style={{
                                                color: "#fff",
                                                fontSize: responsiveFontSize(1.7),
                                                fontWeight: "500",
                                                paddingLeft: 5,
                                                // textDecorationLine: 'line-through',
                                            }}>
                                            ₹ {actualPrice.toFixed(2)}
                                        </Text>
                                    </View>

                                    <TouchableOpacity
                                        // onPress={() => dispatch(addItemToCart(item))}dispatch(addItemToCart({ ...item, actualprice: actualPrice }))
                                        // onPress={() => setsizemodel(true)}

                                        // onPress={() => dispatch(addItemToCart({ ...item, actualprice: actualPrice }))}
                                        onPress={() => {
                                            dispatch(addItemToCart({ ...item, actualprice: actualPrice }));
                                            ToastAndroid.show('Item added to cart!', ToastAndroid.SHORT);
                                        }}
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
                                    </TouchableOpacity>
                                </TouchableOpacity>
                            )
                        }}
                    />

                )
            }


            <TabBar/>

        </View>
    )
}

export default WistList

const styles = StyleSheet.create({})