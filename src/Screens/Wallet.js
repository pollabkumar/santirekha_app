import { Image, StyleSheet, Text, View, StatusBar, ScrollView, Dimensions, TextInput, TouchableOpacity } from 'react-native'
import React, { useRef, useEffect, useState } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { responsiveFontSize } from "react-native-responsive-dimensions";
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import TabBar from '../common/TabBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Wallet = () => {
    const navigation = useNavigation();
    const primarycolor = "#066B8C"
    const zomatoRed = "#003243"
    const backgroundcolor = "#003243"
    const [amount, setamount] = useState("");
    const walletdata = async () => {
       
        try {
            let mr = await AsyncStorage.getItem('loginDetails');
            const modifiedUser = JSON.parse(mr);
            axios.defaults.headers.common['Authorization'] = `Bearer ${modifiedUser.token}`;
            const response = await axios.get(`/v1/wallet/history`);
            setamount(response.data.data.wallet.amount)
            console.log("wallet List:", response.data.data.wallet.amount);
        } catch (error) {
          
            console.error('Error fetching data', error);
        }
    };

    useEffect(() => {
        walletdata();
    }, []);

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
                paddingHorizontal: 15,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: 5,
                height: 45,
            }}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}>
                            <AntDesign name="arrowleft"
                                style={{ fontSize: responsiveFontSize(2.2), color: "#fff" }}
                            />
                        </TouchableOpacity>
                        <Text style={{ fontSize: responsiveFontSize(2.2), color: "#fff", paddingLeft: 5, fontWeight: "600" }}>Wallet</Text>
                    </View>
                </View>

                <TouchableOpacity 
                onPress={()=>navigation.navigate("WalletHistory")}
                style={{
                 backgroundColor: 'rgba(166, 166, 166, 0.6)',
                 paddingHorizontal:12,
                 paddingVertical:5,
                 borderRadius:6
                }}>
                    <Text style={{ fontSize: responsiveFontSize(1.8), color: "#fff" }}>
                        Wallet History
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={{ marginTop: 10, marginHorizontal: 10, }}>
                <View style={{
                    width: "100%",
                    backgroundColor: 'rgba(166, 166, 166, 0.6)',
                    paddingVertical: 15,
                    borderRadius: 5,
                    paddingHorizontal: 10,
                    // elevation:10
                }}>

                    <TouchableOpacity
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}>
                        <Text
                            style={{
                                fontSize: responsiveFontSize(2.2),
                                color: "#fff",
                                fontWeight: "500",

                            }}>
                            Total Wallet Balance
                        </Text>
                        <Ionicons name='wallet'
                            size={15}
                            color="#fff"
                            style={{ fontSize: responsiveFontSize(2.2), }}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", marginTop: 10, }}>
                        <FontAwesome5 name='rupee-sign'
                            size={15}
                            color="#fff"
                            style={{ fontSize: responsiveFontSize(3), }}
                        />
                        <Text
                            style={{
                                fontSize: responsiveFontSize(3),
                                color: "#fff",
                                fontWeight: "600",
                                paddingLeft: 5

                            }}>
                            {amount && amount}
                        </Text>

                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ marginTop: 10, marginHorizontal: 10, }}>
                <View style={{
                    width: "100%",
                    backgroundColor: 'rgba(166, 166, 166, 0.6)',
                    paddingVertical: 15,
                    borderRadius: 5,
                    paddingHorizontal: 10,
                    // elevation:10
                }}>

                    <TouchableOpacity
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}>
                        <Text
                            style={{
                                fontSize: responsiveFontSize(2.2),
                                color: "#fff",
                                fontWeight: "600",

                            }}>
                            Total Earn
                        </Text>
                        <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", }}>
                            <FontAwesome5 name='rupee-sign'
                                size={15}
                                color="#fff"
                                style={{ fontSize: responsiveFontSize(2), }}
                            />
                            <Text
                                style={{
                                    fontSize: responsiveFontSize(2.2),
                                    color: "#fff",
                                    fontWeight: "600",
                                    paddingLeft: 5

                                }}>
                                300
                            </Text>

                        </TouchableOpacity>
                    </TouchableOpacity>


                </View>
            </View>

            {/* add section */}
            {/* <View style={{ marginHorizontal: 10, marginTop: 10 }}>
                <View style={{
                    backgroundColor: backgroundcolor,
                    elevation: 10,
                    width: "100%",
                    height: 100,
                    alignItems: "center",
                    justifyContent: 'center',
                }}>
                    <Text style={{ fontSize: responsiveFontSize(2), color: "#fff" }}>Ad Section</Text>
                </View>
            </View> */}

            <TabBar />


        </View>
    )
}

export default Wallet

const styles = StyleSheet.create({})