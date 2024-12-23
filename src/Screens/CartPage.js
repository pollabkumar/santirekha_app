import { Image, StyleSheet, Text, View, StatusBar, ScrollView, FlatList, ToastAndroid, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useRef, useEffect, useState } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { responsiveFontSize } from "react-native-responsive-dimensions";
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import MinusIcon from 'react-native-vector-icons/dist/AntDesign';
import PlusIcon from 'react-native-vector-icons/dist/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/dist/FontAwesome6';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const CartPage = () => {
    const navigation = useNavigation();
    const primarycolor = "#066B8C"
    const backgroundcolor = "#003243"
    const [cardadditem, setcardadditem] = useState("");
    const [markadrressget, setmarkadrressget] = useState("");
    const [loading, setLoading] = useState(true);
    const [isShippingFreeState, setIsShippingFreeState] = useState(false);



    // const loadSavedAddress = async () => {
    //     try {
    //         const savedAddress = await AsyncStorage.getItem('defaultAddress');
    //         console.log("33377",savedAddress)
    //         if (savedAddress) {
    //             const parsedAddress = JSON.parse(savedAddress);
    //             setmarkadrressget(parsedAddress);
    //         }
    //     } catch (error) {
    //         console.error('Failed to load saved address:', error);
    //     }
    // };

    const loadSavedAddress = async () => {
        try {
            const savedAddress = await AsyncStorage.getItem('defaultAddress');
            console.log("Raw saved address data:", savedAddress);

            if (savedAddress) {
                try {
                    const parsedAddress = JSON.parse(savedAddress);
                    console.log("Parsed address data:", parsedAddress);

                    if (parsedAddress && Object.keys(parsedAddress).length > 0) {
                        setmarkadrressget(parsedAddress);
                    } else {
                        console.warn("Address data is empty or incomplete");
                    }
                } catch (parseError) {
                    console.error("Failed to parse saved address:", parseError);
                }
            } else {
                console.warn("No address data found in AsyncStorage.");
            }
        } catch (error) {
            console.error('Failed to load saved address:', error);
        }
    };

    console.log("lklklkl", markadrressget)
    useEffect(() => {
        loadSavedAddress()
    }, [])
    useFocusEffect(
        React.useCallback(() => {
            loadSavedAddress();
        }, [])
    );

    const cartaddproducts = async () => {
        console.log("popoopo")
        try {
            let mr = await AsyncStorage.getItem('loginDetails');
            const modifiedUser = JSON.parse(mr);
            axios.defaults.headers.common['Authorization'] = `Bearer ${modifiedUser.token}`;
            const response = await axios.get(`/v1/user/carts`);
            setcardadditem(response.data.data)
            setLoading(false);
            console.log("Response898989898", response.data.data);
            const isShippingFree = response.data.data.some(item => item.product.is_shipping_free === "2");
            setIsShippingFreeState(isShippingFree);

        } catch (error) {
            setLoading(false);
            console.error('Errorpostingdata', error);
        }
    };

    console.log("isShippingFreeState", isShippingFreeState)
    useEffect(() => {
        cartaddproducts()
    }, [])

    // const totalItems = cartProducts.length;

    const totalPrice = cardadditem && cardadditem.reduce((total, item) => total + (parseFloat(item.product?.price) * parseInt(item.quantity)), 0);

    // Calculate total promotional discount for all items in the cart
    const totalPromotionalDiscount = cardadditem && cardadditem.reduce((total, item) => total + (parseFloat(item.product?.promotional_discount || 0)), 0);

    console.log("totalPromotionalDiscount", totalPromotionalDiscount)
    const handleDelete = async (item) => {
        try {
            const result = await axios
                .delete(
                    `/v1/user/carts/${item}`,
                )
                .then(res => {
                    cartaddproducts()
                    // console.log(res, 'deleteditem');
                });
            console.log(result);
        } catch (error) {

            console.log("4242442", error);
        }
    };

    const incrementQuantity = async (item) => {
        console.log("itemitem2121212", item);

        const updatedItems = cardadditem.map((cartItem) => {
            if (cartItem.id === item.id) {
                return { ...cartItem, quantity: cartItem.quantity + 1 };
            }
            return cartItem;
        });

        setcardadditem(updatedItems);
        try {
            const updatedItem = updatedItems.find(cartItem => cartItem.id === item.id);
            const response = await axios.put(`/v1/user/carts/${item.id}`, {
                product_id: item.product.id,
                quantity: updatedItem.quantity
            });
            console.log("Quantity updated successfully on server:", response);

        } catch (error) {
            console.error('Error updating quantity on server:', error);
        }
    };

    const decrementQuantity = async (item) => {
        const updatedItems = cardadditem.map((cartItem) => {
            if (cartItem.id === item.id && cartItem.quantity > 1) {
                return { ...cartItem, quantity: cartItem.quantity - 1 };
            }
            return cartItem;
        });

        setcardadditem(updatedItems);
        try {
            const updatedItem = updatedItems.find(cartItem => cartItem.id === item.id);
            if (updatedItem.quantity > 0) {
                const response = await axios.put(`/v1/user/carts/${item.id}`, {
                    product_id: item.product.id,
                    quantity: updatedItem.quantity
                });
            }
        } catch (error) {
            console.error('Error updating quantity on server:', error);
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
            }}>
                <View
                    style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                    >
                        <AntDesign name="arrowleft"
                            style={{ fontSize: responsiveFontSize(2.2), color: "#fff" }}
                        />
                    </TouchableOpacity>
                    <Text style={{ fontSize: responsiveFontSize(2.2), color: "#fff", paddingLeft: 5, fontWeight: "600" }}>Shopping Bag</Text>
                </View>
                <TouchableOpacity style={{}}>
                    <AntDesign
                        style={{ fontSize: responsiveFontSize(2.5) }}
                        name="hearto" />
                </TouchableOpacity>

            </View>

            <>
                {loading ? (
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                        <ActivityIndicator size="large" color="#ffffff" />
                        <Text>Please wait</Text>
                    </View>
                ) : (
                    <>
                        {
                            cardadditem.length > 0 ?
                                (
                                    <>
                                        <ScrollView>
                                            {/* address */}
                                            <View style={{ marginHorizontal: 10, marginTop: 8, }}>
                                                <View style={{
                                                    width: "100%",
                                                    backgroundColor: '#D9D9D9',
                                                    paddingVertical: 10,
                                                    paddingHorizontal: 10,
                                                    borderRadius: 5,
                                                }}>
                                                    <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>
                                                        <View style={{}}>
                                                            <Text style={{ fontSize: responsiveFontSize(1.8), color: "#000", }}>
                                                                Delivered to :
                                                            </Text>
                                                        </View>

                                                        <TouchableOpacity
                                                            onPress={() => navigation.navigate("Address")}
                                                            style={{
                                                                backgroundColor: backgroundcolor,
                                                                paddingHorizontal: 10,
                                                                paddingVertical: 5,
                                                                borderRadius: 5,
                                                            }}>
                                                            <Text style={{ fontSize: responsiveFontSize(1.8), color: "#fff", }}>
                                                                Change address
                                                            </Text>
                                                        </TouchableOpacity>
                                                    </View>

                                                    {
                                                        markadrressget && markadrressget ?
                                                            <View style={{}}>
                                                                <Text style={{ fontSize: responsiveFontSize(1.9), color: "#000", fontWeight: "600" }}>
                                                                    {markadrressget && markadrressget.name}
                                                                </Text>

                                                                <Text style={{ fontSize: responsiveFontSize(1.8), color: "#000", fontWeight: "400" }}>
                                                                    {markadrressget && markadrressget.city}, {markadrressget && markadrressget.address}, {markadrressget && markadrressget.landmark}, {markadrressget && markadrressget.pin},{markadrressget && markadrressget.state}
                                                                </Text>

                                                                <Text style={{ fontSize: responsiveFontSize(1.8), color: "#000", fontWeight: "400" }}>
                                                                    {markadrressget && markadrressget.mobile}
                                                                </Text>
                                                            </View> :
                                                            ""

                                                    }

                                                </View>
                                            </View>

                                            <FlatList
                                                data={cardadditem}
                                                showsHorizontalScrollIndicator={false}
                                                renderItem={({ item, index }) => {
                                                    console.log("poooooo", item.product)
                                                    return (
                                                        <View
                                                            style={{
                                                                // marginTop: 10,
                                                                marginHorizontal: 10,
                                                            }}>


                                                            <View style={{
                                                                width: "100%",
                                                                backgroundColor: '#D9D9D9',
                                                                paddingVertical: 15,
                                                                borderRadius: 5,
                                                                elevation: 5,
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                marginTop: 10
                                                            }}>

                                                                <View style={{
                                                                    width: "96%",
                                                                    flexDirection: "row",
                                                                    borderBottomColor: "grey",
                                                                    borderBottomWidth: 1,
                                                                    paddingBottom: 5
                                                                }}>
                                                                    <Image
                                                                        // source={item.image}
                                                                        source={{ uri: item.product?.thumb_image }}
                                                                        style={{
                                                                            width: "30%", height: 70,
                                                                        }}
                                                                        resizeMode="stretch"
                                                                    />
                                                                    <View style={{
                                                                        width: "70%",
                                                                        paddingTop: 10,
                                                                    }}>
                                                                        <TouchableOpacity
                                                                            onPress={() => handleDelete(item.id)}
                                                                            // onPress={() => dispatch(removeItemFromCart(item))}handleDelete
                                                                            style={{
                                                                                position: "absolute",
                                                                                top: -3,
                                                                                right: 0,
                                                                                padding: 3,
                                                                                paddingHorizontal: 5
                                                                            }}>
                                                                            <MaterialIcons
                                                                                name="delete"
                                                                                style={{ color: "grey", fontSize: responsiveFontSize(2.4), }}
                                                                            />
                                                                        </TouchableOpacity>
                                                                        <View>
                                                                            <Text style={{ fontSize: responsiveFontSize(1.8), color: "#000", fontWeight: "500" }}>
                                                                                {item.product?.name}
                                                                            </Text>
                                                                        </View>

                                                                        <View
                                                                            style={{
                                                                                flexDirection: "row",
                                                                                alignItems: "center",
                                                                                justifyContent: "space-between",
                                                                                // backgroundColor:"yellow",
                                                                                width: "100%",
                                                                                // paddingTop: 5,

                                                                            }}>
                                                                            <View style={{ marginTop: 3, width: "69%" }}>

                                                                                <View style={{ flexDirection: "row", }}>
                                                                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                                                        <AntDesign
                                                                                            style={{ color: "#545454", fontSize: responsiveFontSize(2), }}
                                                                                            name="arrowdown" />
                                                                                        <Text style={{ color: "#545454", fontSize: responsiveFontSize(1.8), fontWeight: "500" }}>
                                                                                            {item.product?.discount}
                                                                                        </Text>
                                                                                    </View>

                                                                                    <Text
                                                                                        style={{
                                                                                            color: "#000",
                                                                                            fontSize: responsiveFontSize(1.8),
                                                                                            fontWeight: "500",
                                                                                            paddingLeft: 5,
                                                                                            textDecorationLine: 'line-through',
                                                                                        }}>
                                                                                        ₹ {item.product?.mrp}
                                                                                    </Text>

                                                                                    <Text
                                                                                        style={{
                                                                                            color: "#000",
                                                                                            fontSize: responsiveFontSize(1.8),
                                                                                            fontWeight: "500",
                                                                                            paddingLeft: 5,
                                                                                            // textDecorationLine: 'line-through',
                                                                                        }}>
                                                                                        ₹ {item.product?.price}
                                                                                    </Text>

                                                                                </View>

                                                                            </View>

                                                                            <View style={{ flexDirection: "row", alignItems: "center", }}>
                                                                                <TouchableOpacity
                                                                                    style={{
                                                                                        backgroundColor: "#e5e3e0",
                                                                                        borderRadius: 50,
                                                                                        flexDirection: "row",
                                                                                        alignItems: "center",
                                                                                        justifyContent: "center",
                                                                                        padding: 4
                                                                                    }} onPress={() => decrementQuantity(item)} >
                                                                                    <MinusIcon
                                                                                        name="minus"
                                                                                        style={{
                                                                                            fontSize: responsiveFontSize(2),
                                                                                            color: "#000"
                                                                                        }}
                                                                                    />
                                                                                </TouchableOpacity>
                                                                                <Text style={{ color: "#000", marginLeft: 6, fontWeight: "600", fontSize: responsiveFontSize(2) }}>{item.quantity}</Text>
                                                                                <TouchableOpacity
                                                                                    style={{
                                                                                        backgroundColor: "#e5e3e0",
                                                                                        borderRadius: 50,
                                                                                        padding: 4,
                                                                                        flexDirection: "row",
                                                                                        alignItems: "center",
                                                                                        justifyContent: "center",
                                                                                        marginLeft: 6
                                                                                    }} onPress={() => incrementQuantity(item)}>
                                                                                    <PlusIcon
                                                                                        name="plus"
                                                                                        style={{
                                                                                            fontSize: responsiveFontSize(2),
                                                                                            color: "#000"
                                                                                        }}
                                                                                    />
                                                                                </TouchableOpacity>
                                                                            </View>

                                                                            <View>
                                                                            </View>
                                                                        </View>
                                                                    </View>
                                                                </View>

                                                                <View style={{ flexDirection: "row", width: "90%", justifyContent: "space-between", paddingTop: 5 }}>

                                                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                                        <View style={{}}>
                                                                            <Text style={{ fontSize: responsiveFontSize(1.8), color: "#000" }}>
                                                                                Quantity
                                                                            </Text>
                                                                        </View>
                                                                        <View style={{ paddingLeft: 3 }}>
                                                                            <Text style={{ fontSize: responsiveFontSize(1.6), color: "#000" }}>
                                                                                : {item.quantity}
                                                                            </Text>
                                                                        </View>
                                                                    </View>

                                                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                                        <View style={{ paddingTop: 2 }}>
                                                                            <FontAwesome6 style={{ fontSize: responsiveFontSize(1.4), color: "#000", }} name="indian-rupee-sign" />
                                                                        </View>
                                                                        <View style={{}}>
                                                                            <Text style={{ fontSize: responsiveFontSize(1.8), color: "#000", paddingLeft: 2 }}>
                                                                                {/* {item.price} */}
                                                                                {item.product?.price * item.quantity}
                                                                            </Text>
                                                                        </View>
                                                                    </View>
                                                                </View>
                                                            </View>
                                                        </View>

                                                    )
                                                }}
                                            />

                                            <View style={{ paddingBottom: 50 }}></View>
                                        </ScrollView>

                                        <View
                                            style={{
                                                flexDirection: "row",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                backgroundColor: "#D9D9D9",
                                                paddingHorizontal: 10,
                                                paddingVertical: 5,
                                                borderTopWidth: 0.5,
                                                borderColor: "grey",
                                                position: "absolute",
                                                bottom: 0,
                                                width: "100%"

                                            }}>
                                            <View style={{}}>

                                                <View style={{ flexDirection: "row", alignItems: "center", }}>
                                                    <FontAwesome6
                                                        style={{
                                                            fontSize: responsiveFontSize(1.6),
                                                            color: "#000",

                                                        }} name="indian-rupee-sign" />
                                                    <Text
                                                        style={{
                                                            fontSize: responsiveFontSize(1.8),
                                                            color: "#000",
                                                            paddingLeft: 2,
                                                            fontWeight: "600"
                                                        }}>
                                                        {totalPrice}
                                                    </Text>
                                                </View>

                                                <View style={{}}>
                                                    <Text style={{ fontSize: responsiveFontSize(1.8), color: "#000", fontWeight: "500" }}>
                                                        Grant Total
                                                    </Text>
                                                </View>
                                            </View>

                                            {/* last */}

                                            {
                                                markadrressget && markadrressget ?
                                                    <TouchableOpacity
                                                        onPress={() => navigation.navigate("PaymentOption", { shipping: isShippingFreeState, data: cardadditem, data1: totalPrice, PromotionalDiscount: totalPromotionalDiscount, maadrressget: markadrressget.id, })}
                                                        style={{
                                                            flexDirection: "row",
                                                            backgroundColor: primarycolor,
                                                            alignItems: "center",
                                                            paddingHorizontal: 10,
                                                            paddingVertical: 5,
                                                            borderRadius: 5
                                                        }}>
                                                        <Text style={{ fontSize: responsiveFontSize(2), color: "#fff", fontWeight: "500" }}>
                                                            Continue
                                                        </Text>
                                                        <AntDesign
                                                            style={{ fontSize: responsiveFontSize(2.2), color: "#fff", paddingLeft: 5 }}
                                                            name="arrowright" />
                                                    </TouchableOpacity> :
                                                    <TouchableOpacity
                                                        onPress={() => {

                                                            ToastAndroid.show("Kindly provide your address.", ToastAndroid.SHORT);
                                                        }}
                                                        style={{
                                                            flexDirection: "row",
                                                            backgroundColor: primarycolor,
                                                            alignItems: "center",
                                                            paddingHorizontal: 10,
                                                            paddingVertical: 5,
                                                            borderRadius: 5
                                                        }}>
                                                        <Text style={{ fontSize: responsiveFontSize(2), color: "#fff", fontWeight: "500" }}>
                                                            Continue
                                                        </Text>
                                                        <AntDesign
                                                            style={{ fontSize: responsiveFontSize(2.2), color: "#fff", paddingLeft: 5 }}
                                                            name="arrowright" />
                                                    </TouchableOpacity>

                                            }

                                        </View>
                                    </>
                                )
                                :
                                (
                                    <View style={{
                                        flex: 1,
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
                        }

                    </>
                )}
            </>

        </View >
    )
}

export default CartPage

const styles = StyleSheet.create({})