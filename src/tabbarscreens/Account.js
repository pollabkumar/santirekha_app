import { Image, StyleSheet, Text, View, StatusBar, ScrollView, Dimensions, TextInput, TouchableOpacity } from 'react-native'
import React, { useRef, useEffect, useState } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { responsiveFontSize } from "react-native-responsive-dimensions";
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import TabBar from '../common/TabBar';
import { useDispatch, useSelector } from 'react-redux';
const Account = () => {
    const navigation = useNavigation();
    const backgroundcolor = "#003243"
   

    const matches = async () => {
        try {
        //   setload(true)
          let mr = await AsyncStorage.getItem('loginDetails');
          const modifiedUser = JSON.parse(mr);
          console.log('modifiedUserrrrr', modifiedUser);
          axios.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${loginDetails[0].token}`;
          const response = await axios.get(`/v1/users/${loginDetails[0].id}`);
          if (response.data.err == false) {
            setload(false)
            setdata(response.data.data);
    
          }
          console.log("111111", response)
        } catch (error) {
        //   setload(false)
          console.error('Error fetching data:', error);
        }
      }
    

      useEffect(()=>{
        matches()
      })

    return (
        <View style={{ flex: 1, backgroundColor: backgroundcolor }}>
            <StatusBar
                animated={true}
                backgroundColor={backgroundcolor}
                translucent={false}
                barStyle={"light-content"}
            />

            <View style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 10,
                borderBottomWidth: 1,
                borderColor: 'rgba(166, 166, 166, 0.6)',
                paddingBottom: 10,
                marginTop:10
            }}>

                <View style={{ width: "50%", alignItems: "flex-start", paddingLeft: 10 }}>
                    <Text style={{ fontSize: responsiveFontSize(2.8), color: "#fff" }}>
                        Hello
                    </Text>
                    <Text style={{ fontSize: responsiveFontSize(3.3), color: "#fff", paddingTop: 2, fontWeight: "600" }}>
                        Pollab
                    </Text>
                </View>
                <View style={{ width: "50%", alignItems: "flex-end",paddingRight:10 }}>
                    <View style={{
                        width: 75,
                        alignItems: "center",
                        height: 75,
                        backgroundColor: "#D9D9D9",
                        justifyContent: "center",
                        borderRadius:50
                    }}>
                        <FontAwesome
                            name="user"
                            style={{ fontSize: responsiveFontSize(5.3),color:"#000" }}
                        />
                    </View>
                </View>
            </View>

            <View style={{ marginTop: 10, marginHorizontal: 10 }}>
                <View style={{
                    width: "100%",
                    backgroundColor: 'rgba(166, 166, 166, 0.6)',
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingVertical: 10,
                    borderRadius: 5

                }}>

                    <TouchableOpacity
                    onPress={()=>navigation.navigate("OrderPage")}
                    style={{
                        width: "45%",
                        alignItems: "center",
                        borderWidth: 0.8,
                        paddingVertical: 10,
                        borderColor: "#fff",
                        borderRadius: 5
                    }}>
                        <Text style={{ fontSize: responsiveFontSize(2), color: "#fff" }}>Order List</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                    onPress={()=>navigation.navigate("Wallet")}
                    style={{
                        width: "45%",
                        alignItems: "center",
                        borderWidth: 0.8,
                        paddingVertical: 10,
                        borderColor: "#fff",
                        borderRadius: 5,
                        marginLeft: 8

                    }}>
                        <Text style={{ fontSize: responsiveFontSize(2), color: "#fff" }}>Wallet</Text>
                    </TouchableOpacity>


                </View>
            </View>

            <View style={{ marginTop: 10, marginHorizontal: 10 }}>
                <View style={{
                    width: "100%",
                    backgroundColor: 'rgba(166, 166, 166, 0.6)',
                    paddingVertical: 15,
                    borderRadius: 5,
                    paddingHorizontal: 15,

                }}>
                    <View style={{}}>
                        <Text style={{ fontSize: responsiveFontSize(2.6), color: "#fff", fontWeight: "600" }}>
                            Account Settings
                        </Text>
                    </View>

                    <TouchableOpacity
                    onPress={()=>navigation.navigate("ResetPaasword")}
                    style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
                        <Text
                            style={{
                                fontSize: responsiveFontSize(2.2),
                                color: "#fff",
                                fontWeight: "400",
                                paddingLeft: 10

                            }}>
                            Change Password
                        </Text>
                        <FontAwesome name='chevron-right'
                            size={10}
                            color="#fff"
                            style={{ al: "center" }}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity 
                    onPress={()=>navigation.navigate("PersonalorEditinformation")}
                    style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
                        <Text
                            style={{
                                fontSize: responsiveFontSize(2.2),
                                color: "#fff",
                                fontWeight: "400",
                                paddingLeft: 10

                            }}>
                            Personal Information
                        </Text>
                        <FontAwesome name='chevron-right'
                            size={10}
                            color="#fff"
                            style={{ al: "center" }}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                    onPress={()=>navigation.navigate("Address")}
                    style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
                        <Text
                            style={{
                                fontSize: responsiveFontSize(2.2),
                                color: "#fff",
                                fontWeight: "400",
                                paddingLeft: 10

                            }}>
                            Address 
                        </Text>
                        <FontAwesome name='chevron-right'
                            size={10}
                            color="#fff"
                            style={{ al: "center" }}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity 
                     onPress={()=>navigation.navigate("PersonalorEditinformation")}
                    style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
                        <Text
                            style={{
                                fontSize: responsiveFontSize(2.2),
                                color: "#fff",
                                fontWeight: "400",
                                paddingLeft: 10

                            }}>
                            Edit profile
                        </Text>
                        <FontAwesome name='chevron-right'
                            size={10}
                            color="#fff"
                            style={{ al: "center" }}
                        />
                    </TouchableOpacity>



                </View>
            </View>

            <View style={{ marginTop: 10, marginHorizontal: 10, }}>
                <View style={{
                    width: "100%",
                    backgroundColor: 'rgba(166, 166, 166, 0.6)',
                    paddingVertical: 15,
                    borderRadius: 5,
                    paddingHorizontal: 15,
                    // elevation:10
                }}>
                    <View style={{}}>
                        <Text style={{fontSize: responsiveFontSize(2.6), color: "#fff", fontWeight: "600"  }}>
                            Earnings
                        </Text>
                    </View>

                    <TouchableOpacity
                    onPress={()=>navigation.navigate("EarningsandCashbacks")}
                    style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
                        <Text
                            style={{
                                fontSize: responsiveFontSize(2.2),
                                color: "#fff",
                                fontWeight: "400",
                                paddingLeft: 10

                            }}>
                            Earnings & Cashback
                        </Text>
                        <FontAwesome name='chevron-right'
                            size={10}
                            color="#fff"
                            style={{ al: "center" }}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity 
                      onPress={()=>navigation.navigate("EarningsandCashbacks")}
                    style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
                        <Text
                            style={{
                                fontSize: responsiveFontSize(2.2),
                                color: "#fff",
                                fontWeight: "400",
                                paddingLeft: 10

                            }}>
                            Total Spent
                        </Text>
                        <FontAwesome name='chevron-right'
                            size={10}
                            color="#fff"
                            style={{ al: "center" }}
                        />
                    </TouchableOpacity>

                 

                </View>
            </View>

            <TabBar/>

        </View>
    )
}

export default Account

const styles = StyleSheet.create({})