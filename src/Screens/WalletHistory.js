import { StyleSheet, Text, View, StatusBar, Dimensions, TouchableOpacity, FlatList, RefreshControl, Image, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import BackIcon from 'react-native-vector-icons/dist/Ionicons';
import { useNavigation } from '@react-navigation/native';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const WalletHistory = () => {
    const navigation = useNavigation();
    const primarycolor = "#066B8C"
    const zomatoRed = "#003243"
    const backgroundcolor = "#003243"
    const [loader, setLoader] = useState(false);
    const [historydata, sethistorydata] = useState("");
    const [refreshing, setRefreshing] = useState(false);

    const wallethistorydata = async () => {
        setLoader(true);
        try {
            let mr = await AsyncStorage.getItem('loginDetails');
            const modifiedUser = JSON.parse(mr);
            axios.defaults.headers.common['Authorization'] = `Bearer ${modifiedUser.token}`;
            const response = await axios.get(`/v1/wallet/history`);
            setLoader(false);
            sethistorydata(response.data.data.history)
            console.log("wallet history List:", response.data.data.history);
        } catch (error) {
            setLoader(false);
            console.error('Error fetching data', error);
        }
    };

    useEffect(() => {
        wallethistorydata();
    }, []);

    const onRefresh = () => {
        wallethistorydata();
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
                    <Text style={{ fontSize: responsiveFontSize(2.2), color: "#fff", paddingLeft: 5, fontWeight: "600" }}>Wallet payment History</Text>
                </View>


            </View>


            {loader ? (
                <View style={{ alignItems: 'center', justifyContent: 'center', height: '60%' }}>
                    <ActivityIndicator size="small" color="#fff" animating={loader} />
                    <Text style={{ color: '#fff' }}>Please wait...</Text>
                </View>
            ) :

                <FlatList
                    data={historydata}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                          refreshing={refreshing}
                          onRefresh={onRefresh}
                          colors={['#000']}
                        />
                      }
                    renderItem={({ item }) => (
                        <View
                            style={{
                                backgroundColor:"#000",
                                padding: 10,
                                marginTop: 5,
                                marginHorizontal: 10,
                                borderRadius: 9

                            }}>
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    // paddingHorizontal: 2
                                }}>
                                <Text
                                    style={{
                                        fontSize: responsiveFontSize(1.9),
                                        color: "#fff",
                                        fontWeight: "500"
                                    }}>
                                    Transaction Amount :
                                </Text>
                                <Text
                                    style={{
                                        fontSize: responsiveFontSize(1.9),
                                        color: "#fff",
                                        fontWeight: "600",
                                        paddingRight: 10
                                    }}>
                                    {item.amount}
                                </Text>
                            </View>

                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                // paddingHorizontal: 5,
                                paddingTop: 5,

                            }}>
                                <Text style={{ fontSize: responsiveFontSize(1.9), color: "#fff", }}>
                                    Date : {new Date(item.created_at).toISOString().split('T')[0]}
                                </Text>

                                <View style={{
                                    backgroundColor: "#003243",
                                    paddingHorizontal: 10,
                                    paddingVertical: 5,
                                    borderRadius: 5,

                                }}>
                                    {
                                        item.status == "1" ?
                                            <Text style={{ fontSize: responsiveFontSize(1.5), }}>
                                                Credit
                                            </Text> :
                                            <Text style={{ fontSize: responsiveFontSize(1.5), }}>
                                                Debit 
                                            </Text>
                                    }
                                </View>
                            </View>
                            <View style={{}}>
                            <Text
                                    style={{
                                        fontSize: responsiveFontSize(1.5),
                                        color: "#fff",
                                        fontWeight: "300",
                                        paddingRight: 10
                                    }}>
                                    {item.comment}
                                </Text>
                            </View>
                        </View>
                    )}
                />
            }

            {/* <View
                style={{
                    backgroundColor: 'rgba(166, 166, 166, 0.6)',
                    padding: 10,
                    marginTop: 5,
                    marginHorizontal: 10,
                    borderRadius: 9

                }}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        // paddingHorizontal: 2
                    }}>
                    <Text
                        style={{
                            fontSize: responsiveFontSize(1.9),
                            color: "#fff",
                            fontWeight:"500"
                        }}>
                        Transaction Amount :
                    </Text>
                    <Text
                        style={{
                            fontSize: responsiveFontSize(1.9),
                            color: "#fff",
                            fontWeight: "600",
                            paddingRight: 10
                        }}>
                        250.00
                    </Text>
                </View>

                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    // paddingHorizontal: 5,
                    paddingTop: 5,

                }}>
                    <Text style={{ fontSize: responsiveFontSize(1.9), color: "#fff", }}>
                        Date : 12-05-2024
                    </Text>

                    <View style={{
                        backgroundColor: "#003243",
                        paddingHorizontal: 8,
                        paddingVertical: 5,
                        borderRadius: 50,

                    }}>
                        <Text style={{ fontSize: responsiveFontSize(1.5), }}>
                            Successful
                        </Text>
                    </View>
                </View>
            </View> */}
            {/* 
            <View
                style={{
                    backgroundColor: 'rgba(166, 166, 166, 0.6)',
                    padding: 10,
                    marginTop: 5,
                    marginHorizontal: 10,
                    borderRadius: 9

                }}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        // paddingHorizontal: 2
                    }}>
                    <Text
                        style={{
                            fontSize: responsiveFontSize(1.9),
                            color: "#fff",
                            fontWeight:"500"
                        }}>
                        Transaction Amount :
                    </Text>
                    <Text
                        style={{
                            fontSize: responsiveFontSize(1.9),
                            color: "#fff",
                            fontWeight: "600",
                            paddingRight: 10
                        }}>
                        250.00
                    </Text>
                </View>

                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    // paddingHorizontal: 5,
                    paddingTop: 5,

                }}>
                    <Text style={{ fontSize: responsiveFontSize(1.9), color: "#fff", }}>
                        Date : 12-05-2024
                    </Text>

                    <View style={{
                        backgroundColor: "#003243",
                        paddingHorizontal: 8,
                        paddingVertical: 5,
                        borderRadius: 50,

                    }}>
                        <Text style={{ fontSize: responsiveFontSize(1.5), }}>
                            Successful
                        </Text>
                    </View>
                </View>
            </View> */}



            <View style={{ marginBottom: 5 }}></View>


        </View>
    )
}

export default WalletHistory

const styles = StyleSheet.create({})