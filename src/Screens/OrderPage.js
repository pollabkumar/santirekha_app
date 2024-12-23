
import { Image, StyleSheet, Text, View, StatusBar, FlatList, TouchableOpacity,ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize } from "react-native-responsive-dimensions";
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import TabBar from '../common/TabBar';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const OrderPage = () => {
    const navigation = useNavigation();
    const primarycolor = "#066B8C"
    const [orderlist, setOrderList] = useState([]); // Initialize as an array
    const backgroundcolor = "#D9D9D9"
    const [loader, setLoader] = useState(false);
    const cartaddproducts = async () => {
        setLoader(true);
        try {
            let mr = await AsyncStorage.getItem('loginDetails');
            const modifiedUser = JSON.parse(mr);
            axios.defaults.headers.common['Authorization'] = `Bearer ${modifiedUser.token}`;
            const response = await axios.get(`v1/order/list`);
            setOrderList(response.data.data);
            setLoader(false);
            console.log("Order List:", response.data.data);
        } catch (error) {
            setLoader(false);
            console.error('Error fetching data', error);
        }
    };

    useEffect(() => {
        cartaddproducts();
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: backgroundcolor }}>
            <StatusBar
                animated={true}
                backgroundColor={primarycolor}
                translucent={false}
                barStyle={"light-content"}
            />
            <View style={styles.headerContainer}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <AntDesign name="arrowleft" style={styles.backIcon} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>My Order</Text>
                </View>
            </View>

            {loader ? (
                <View style={{ alignItems: 'center', justifyContent: 'center', height: '60%' }}>
                    <ActivityIndicator size="small" color="#000" animating={loader} />
                    <Text style={{ color: '#000' }}>Please wait...</Text>
                </View>
            ) :
            
                <FlatList
                data={orderlist} 
                // keyExtractor={(item, index) => `${item.id}-${index}`} // Unique key for each item
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("OrderDetails", { data: item })}
                            style={styles.itemTouchable}
                        >
                            <Image
                                source={{ uri: item.product?.thumb_image }}
                                style={styles.itemImage}
                                resizeMode="stretch"
                            />
                            <View style={styles.itemDetails}>
                                <Text style={styles.itemTitle}>{item.product?.name}</Text>
                                <Text style={styles.itemDescription}>{item.product?.short_desc}</Text>
                            </View>
                            <View style={styles.chevronContainer}>
                                <FontAwesome name='chevron-right' size={15} color="#000" />
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
            />
            

           }




            {/* <FlatList
                data={orderlist} // Use the state for data
                keyExtractor={(item, index) => `${item.id}-${index}`} // Unique key for each item
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("OrderDetails", { data: item })}
                            style={styles.itemTouchable}
                        >
                            <Image
                                source={{ uri: item.product?.thumb_image }}
                                style={styles.itemImage}
                                resizeMode="stretch"
                            />
                            <View style={styles.itemDetails}>
                                <Text style={styles.itemTitle}>{item.product?.name}</Text>
                                <Text style={styles.itemDescription}>{item.product?.short_desc}</Text>
                            </View>
                            <View style={styles.chevronContainer}>
                                <FontAwesome name='chevron-right' size={15} color="#000" />
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
            /> */}
            <View style={{ marginTop: 10, height: 60 }} />
            <TabBar />
        </View>
    )
}

export default OrderPage

const styles = StyleSheet.create({
    headerContainer: {
        width: "100%",
        backgroundColor: "#066B8C",
        paddingHorizontal: 19,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 5,
        height: 45,
    },
    backIcon: {
        fontSize: responsiveFontSize(2.2),
        color: "#fff"
    },
    headerTitle: {
        fontSize: responsiveFontSize(2.2),
        color: "#fff",
        paddingLeft: 5,
        fontWeight: "600"
    },
    itemContainer: {
        marginTop: 10,
        marginHorizontal: 10,
    },
    itemTouchable: {
        width: "100%",
        backgroundColor: '#D9D9D9',
        paddingVertical: 15,
        borderRadius: 5,
        paddingHorizontal: 8,
        elevation: 5,
        flexDirection: "row",
        alignItems:"center"
    },
    itemImage: {
        width: "30%",
        height: 70,
    },
    itemDetails: {
        width: "60%",
        paddingLeft: 5
    },
    itemTitle: {
        fontSize: responsiveFontSize(1.8),
        color: "#000",
        fontWeight: "500"
    },
    itemDescription: {
        fontSize: responsiveFontSize(2),
        color: "#000",
        fontWeight: "400",
        paddingTop: 3
    },
    chevronContainer: {
        width: "10%",
        justifyContent: "center",
        alignItems: "flex-end"
    }
});
