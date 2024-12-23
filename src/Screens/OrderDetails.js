
import { Image, StyleSheet, Text, View, StatusBar, ScrollView, ToastAndroid, TextInput, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { responsiveFontSize } from "react-native-responsive-dimensions";
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TabBar from '../common/TabBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const OrderDetails = ({ route }) => {
    const navigation = useNavigation();
    const primarycolor = "#066B8C"
    const backgroundcolor = "#003243"

    const [paramsData, setParamsData] = useState(route);
    const refreshScreen = (updatedStatus) => {
        const updatedParams = { ...paramsData, params: { ...paramsData.params, data: { ...paramsData.params.data, order_status: updatedStatus } } };
        setParamsData(updatedParams);
    };
    const cartaddproducts = async () => {
        try {
            let mr = await AsyncStorage.getItem('loginDetails');
            const modifiedUser = JSON.parse(mr);
            axios.defaults.headers.common['Authorization'] = `Bearer ${modifiedUser.token}`;
            const response = await axios.post(`v1/order/cancel/${route.params.data.id}`);
            console.log("uuuuuu", response)
            ToastAndroid.show("Order Cancelled Successfully", ToastAndroid.SHORT);
            refreshScreen("5");
        } catch (error) {
            console.error('Error fetching cart data:', error);
        }
    };


    // const steps = [
    //     {
    //         label: 'Order Confirmed',
    //         date: 'Sun, 5th Nov \'23',
    //         completed: true
    //     },
    //     { label: 'Shipped', date: 'Mon, 6th Nov \'23', completed: true },
    //     { label: 'Out For Delivery', date: 'Thu, 9th Nov \'23', completed: true },
    //     { label: 'Delivered', date: 'Thu, 9th Nov \'23', completed: false },
    // ];

    // const steps = [
    //     { label: 'New', key: "1", completed: route.params.data.order_status === "1" },
    //     { label: 'In Process', key: "2", completed: route.params.data.order_status === "2" },
    //     { label: 'Out For Delivery', key: "3", completed: route.params.data.order_status === "3" },
    //     { label: 'Delivered', key: "4", completed: route.params.data.order_status === "4" },
    //     { label: 'Cancelled', key: "5", completed: route.params.data.order_status === "5" },
    //     { label: 'Rejected', key: "6", completed: route.params.data.order_status === "6" },
    // ];

    // // Function to get the display color based on the completion status and order status
    // const getStepColor = (completed) => {
    //     return completed ? '#0A4972' : '#BDC3C7';
    // }

    const getPaymentType = (paymentType) => {
        switch (paymentType) {
            case "1":
                return "COD";
            case "2":
                return "ONLINE";
            case "3":
                return "CASH";
            case "4":
                return "UPI";
            case "5":
                return "POS";

            default:
                return "";
        }
    }
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
                    <Text style={{ fontSize: responsiveFontSize(2.2), color: "#fff", paddingLeft: 5, fontWeight: "600" }}>
                        Order Details</Text>
                </View>

            </View>
            <ScrollView>

                <View style={{ marginHorizontal: 10, marginTop: 5 }}>
                    <View style={{ backgroundColor: "#D9D9D9", width: "100%", elevation: 5, borderRadius: 5 }}>

                        <View style={{ alignItems: "center", paddingVertical: 10 }}>
                            <Text style={{ color: "#000", fontWeight: "600", fontSize: responsiveFontSize(2), }}>
                                Order ID - {route.params.data.id}
                            </Text>
                        </View>

                        <View
                            style={{
                                width: "100%",
                                marginTop: 10,
                                flexDirection: "row",
                                borderBottomWidth: 1,
                                paddingBottom: 10,
                            }}>

                            <View style={{ width: "40%" }}>
                                <Image
                                    source={{ uri: route.params.data.product?.thumb_image }}
                                    style={{ width: "100%", height: 110 }}
                                    resizeMode="contain"
                                />
                            </View>

                            <View style={{ width: "60%" }}>
                                <View style={{}}>
                                    <Text style={{ fontSize: responsiveFontSize(2.2), color: "#000" }}>
                                        {route.params.data.product?.name}
                                    </Text>
                                    <Text style={{ fontSize: responsiveFontSize(2.2), color: "#000" }}>
                                        {route.params.data.product?.short_desc}
                                    </Text>


                                </View>

                                <View style={{ alignItems: "flex-end", marginTop: 20, paddingRight: 10 }}>
                                    <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", }}>
                                        <FontAwesome5 name='rupee-sign'
                                            size={15}
                                            color="#000"
                                            style={{ fontSize: responsiveFontSize(2.2), }}
                                        />
                                        <Text
                                            style={{
                                                fontSize: responsiveFontSize(1.9),
                                                color: "#000",
                                                fontWeight: "600",
                                                paddingLeft: 5,
                                                textDecorationLine: 'line-through',

                                            }}>
                                            {route.params.data.mrp}
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: responsiveFontSize(2.2),
                                                color: "#000",
                                                fontWeight: "600",
                                                paddingLeft: 5,
                                                // textDecorationLine: 'line-through',

                                            }}>
                                            {route.params.data.price}
                                        </Text>

                                    </TouchableOpacity>


                                </View>


                            </View>
                        </View>

                        <View style={styles.container}>
                            <View style={{}}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <View style={{}}>
                                        <Text style={{ color: "#000", fontSize: responsiveFontSize(1.9), fontWeight: "500" }}>Order Status :</Text>
                                    </View>
                                    <View style={{}}>
                                        <Text style={{ color: "#000", fontSize: responsiveFontSize(1.9), paddingLeft: 4 }}>
                                            {paramsData && paramsData.params.data.order_status == "1" ? "New" :
                                                paramsData && paramsData.params.data.order_status == "2" ? "Online" :
                                                    paramsData && paramsData.params.data.order_status == "3" ? "Cash" :
                                                        paramsData && paramsData.params.data.order_status == "4" ? "Upi" :
                                                            paramsData && paramsData.params.data.order_status == "5" ? "Pos" :
                                                                ""}
                                        </Text>

                                    </View>
                                </View>
                                <Text style={{ fontSize: responsiveFontSize(1.9), color: "#000" }}>
                                    Home Delivery : {paramsData && paramsData.params.data.is_home_delivery == "2" ? "Yes" : "No"}
                                </Text>

                                <Text style={{ fontSize: responsiveFontSize(1.9), color: "#000" }}>
                                    Payment Type: {getPaymentType(route.params.data.payment_type)}
                                </Text>

                            </View>

                            <View style={{}}>
                                {
                                    paramsData && paramsData.params.data.order_status == "1" ?
                                        <TouchableOpacity
                                            onPress={() => cartaddproducts()}
                                            style={{
                                                backgroundColor: "#003243",
                                                paddingHorizontal: 10,
                                                paddingVertical: 5,
                                                borderRadius: 5
                                            }}>
                                            <Text style={{ fontSize: responsiveFontSize(1.6), color: "#fff" }}>
                                                Cancel the order
                                            </Text>
                                        </TouchableOpacity> :
                                        ""
                                }

                            </View>

                            {/* {steps.map((step, index) => (
                                <View key={index} style={styles.stepContainer}>
                                    <View style={styles.iconContainer}>
                                        <Icon
                                            name="check-circle"
                                            size={24}
                                            color={getStepColor(step.completed)}
                                        />
                                        {index < steps.length - 1 && <View style={styles.line} />}
                                    </View>
                                    <View style={styles.textContainer}>
                                        <Text style={[styles.label, { color: step.color }]}>{step.label}</Text>
                                        <Text style={[styles.date, { color: step.color }]}>{step.date}</Text>
                                    </View>
                                </View>
                            ))}
                        */}
                            {/* {steps.map((step, index) => (
                                <View key={index} style={styles.stepContainer}>
                                    <View style={styles.iconContainer}>
                                        <Icon
                                            name="check-circle"
                                            size={24}
                                            color={step.completed ? '#0A4972' : '#BDC3C7'}
                                        />
                                        {index < steps.length - 1 && <View style={styles.line} />}
                                    </View>
                                    <View style={styles.textContainer}>
                                        <Text style={styles.label}>{step.label}</Text>
                                        <Text style={styles.date}>{step.date}</Text>
                                    </View>
                                </View>
                            ))} */}
                        </View>

                        <View style={{
                            padding: 10,

                            borderRadius: 10,
                            // borderBottomWidth: 1,
                            paddingBottom: 10
                        }}>
                            <View>
                                <Text style={{ color: "#000", fontWeight: "600", fontSize: responsiveFontSize(2), }}>
                                    Shipping Address
                                </Text>
                            </View>
                            <View>
                                <View>
                                    <Text style={{ fontSize: responsiveFontSize(1.9), color: "#000", paddingTop: 5 }}>
                                        {route.params.data.shipping_address.name}
                                    </Text>
                                </View>



                                <View>
                                    <Text style={{ fontSize: responsiveFontSize(1.9), color: "#000" }}>
                                        {route.params.data.shipping_address.address}
                                    </Text>
                                </View>

                                <View>
                                    <Text style={{ fontSize: responsiveFontSize(1.9), color: "#000" }}>
                                        {route.params.data.shipping_address.city} ,{route.params.data.shipping_address.state}, {route.params.data.shipping_address.pin},
                                    </Text>
                                </View>
                                <View>
                                    <Text style={{ fontSize: responsiveFontSize(1.9), color: "#000" }}>
                                        {route.params.data.shipping_address.mobile}
                                    </Text>
                                </View>
                            </View>
                        </View>


                        {/* Price Details */}
                        <View style={{ padding: 10, }}>
                            <View style={{}}>
                                <Text style={{ color: "#000", fontWeight: "600", fontSize: responsiveFontSize(2), }}>
                                    Price Details
                                </Text>
                            </View>

                            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingTop: 10 }} >
                                <Text style={{ color: "#000", fontWeight: "400", fontSize: responsiveFontSize(2), }}>
                                    Total Items
                                </Text>

                                <Text style={{ color: "#000", fontWeight: "400", fontSize: responsiveFontSize(2), }}>
                                    {route.params.data.quantity}
                                </Text>
                            </View>

                            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingTop: 10 }} >
                                <Text style={{ color: "#000", fontWeight: "400", fontSize: responsiveFontSize(2), }}>
                                    MRP
                                </Text>

                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <FontAwesome5 name='rupee-sign'
                                        // size={1}
                                        color="#000"
                                        style={{ fontSize: responsiveFontSize(1.6), fontWeight: "400" }}
                                    />
                                    <Text
                                        style={{
                                            color: "#000",
                                            fontWeight: "400",
                                            fontSize: responsiveFontSize(2),
                                            paddingLeft: 2
                                        }}>
                                        {route.params.data.price * route.params.data.quantity}
                                    </Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingTop: 10 }} >
                                <Text style={{ color: "#000", fontWeight: "400", fontSize: responsiveFontSize(2), }}>
                                    Discount
                                </Text>

                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Text
                                        style={{
                                            color: "green",
                                            fontWeight: "400",
                                            fontSize: responsiveFontSize(2.5),

                                        }}>
                                        -
                                    </Text>
                                    <FontAwesome5 name='rupee-sign'
                                        // size={1}
                                        color="#000"
                                        style={{ fontSize: responsiveFontSize(1.5), fontWeight: "400", color: "green", paddingLeft: 2 }}
                                    />
                                    <Text
                                        style={{
                                            color: "green",
                                            fontWeight: "400",
                                            fontSize: responsiveFontSize(2),
                                            paddingLeft: 2
                                        }}>
                                        {parseInt(route.params.data.promotional_discount)}
                                    </Text>
                                </View>
                            </View>

                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    paddingTop: 10,
                                    borderBottomWidth: 1, paddingBottom: 10
                                }} >
                                <Text style={{ color: "#000", fontWeight: "400", fontSize: responsiveFontSize(2), }}>
                                    Shipping
                                </Text>
                                {
                                    route.params.data.is_shipping_free == "1" ?
                                        <Text style={{ color: "#000", fontWeight: "400", fontSize: responsiveFontSize(2), }}>
                                            Free
                                        </Text> :
                                        <Text style={{ color: "#000", fontWeight: "400", fontSize: responsiveFontSize(2), }}>
                                            paid
                                        </Text>


                                }
                            </View>


                            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingTop: 5 }} >
                                <Text style={{ color: "#000", fontWeight: "600", fontSize: responsiveFontSize(2.3), paddingLeft: 10 }}>
                                    Total
                                </Text>

                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <FontAwesome5 name='rupee-sign'
                                        // size={1}
                                        color="#000"
                                        style={{ fontSize: responsiveFontSize(1.6), fontWeight: "400" }}
                                    />
                                    <Text
                                        style={{
                                            color: "#000",
                                            fontWeight: "400",
                                            fontSize: responsiveFontSize(2),
                                            paddingLeft: 2
                                        }}>
                                        {route.params.data.price * route.params.data.quantity - route.params.data.promotional_discount}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ marginHorizontal: 8, marginTop: 10 }}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: "#D9D9D9",
                            width: "100%",
                            paddingVertical: 14,
                            flexDirection: "row",
                            alignItems: "center",
                            paddingHorizontal: 10,
                            justifyContent: "space-between",
                            borderRadius: 5
                        }}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <FontAwesome5
                                style={{ color: "grey", fontWeight: "600", fontSize: responsiveFontSize(2), }}
                                name="file-invoice" />

                            <View style={{ paddingLeft: 5 }}>
                                <Text style={{ color: "grey", fontWeight: "600", fontSize: responsiveFontSize(2), }}>
                                    Invoice download
                                </Text>
                            </View>
                        </View>

                        <FontAwesome name='chevron-right'
                            style={{ fontSize: responsiveFontSize(2), color: "grey", }}
                        />

                    </TouchableOpacity>
                </View>

                <View style={{ marginBottom: 65 }}></View>
            </ScrollView>
            <TabBar />
        </View>
    )
}

export default OrderDetails

const styles = StyleSheet.create({
    container: {
        padding: 10,
        // backgroundColor: '#E8E8E8',
        borderRadius: 10,
        borderBottomWidth: 1,
        paddingBottom: 10,
        flexDirection: "row",
        justifyContent: "space-between"

    },
    stepContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    iconContainer: {
        alignItems: 'center',
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
    },
    label: {
        fontSize: responsiveFontSize(2),
        fontWeight: 'bold',
        color: '#000',
    },
    date: {
        fontSize: responsiveFontSize(1.8),
        color: '#000',
    },
    line: {
        width: 2,
        height: 35,
        backgroundColor: '#0A4972',
        marginVertical: 5,
    },
});

