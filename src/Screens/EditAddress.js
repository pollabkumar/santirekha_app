import { ActivityIndicator, StyleSheet, Text, View, StatusBar, ScrollView, ToastAndroid, TextInput, TouchableOpacity } from 'react-native'
import React, { useRef, useEffect, useState } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { responsiveFontSize } from "react-native-responsive-dimensions";
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
const EditAddress = ({route}) => {
    console.log("routeroute",route.params.addressid)
    const navigation = useNavigation();
    const primarycolor = "#066B8C"
    const backgroundcolor = "#003243"
    const [isSelected, setIsSelected] = useState(false);
    const [name, setname] = useState('');
    const [mobilenumber, setmobilenumber] = useState('');
    const [pincode, setpincode] = useState('');
    const [landmark, setlandmark] = useState('');
    const [address, setaddress] = useState('');
    const [city, setcity] = useState('');
    const [state, setstate] = useState('');
    const [errors, setErrors] = useState({});
    const [load, setload] = useState(false)

    const data = async () => {
        setload(true)
        try {
            let mr = await AsyncStorage.getItem('loginDetails');
            const modifiedUser = JSON.parse(mr);
            console.log("tokennn",modifiedUser)
            axios.defaults.headers.common['Authorization'] = `Bearer ${modifiedUser.token}`;
             
            const response = await axios.put(`/v1/user/address/${route.params.addressid}`, {
                name: name && name,
                mobile: mobilenumber && mobilenumber,
                pin: pincode && pincode,
                landmark: landmark && landmark,
                address: address && address,
                city: city && city,
                state: state && state,
            });
                setname("")
                setmobilenumber("")
                setpincode("")
                setaddress("")
                setcity("")
                setstate("")
                setload(false)
                setErrors({});
                ToastAndroid.show('Address Edited Successfully', ToastAndroid.SHORT);
                navigation.navigate("Address")
                console.log("Response:", response);

        } catch (error) {
            console.error('Error fetching data:', error);
            if (error.response.data.error_code === true) {
                setload(false)
                setErrors(error.response.data.error_message);
            }
        }
    };
    console.log("89898989:", errors);

    return (
        <View style={{ flex: 1, backgroundColor: backgroundcolor }}>
            <StatusBar
                animated={true}
                backgroundColor={primarycolor}
                translucent={false}
                barStyle={"light-content"}
            />
            
            
            <ScrollView>
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
                    <Text
                        style={{ fontSize: responsiveFontSize(2.2), color: "#fff", paddingLeft: 5, fontWeight: "600" }}>
                        Edit Address
                    </Text>
                </View>
            </View>

            <View style={{ paddingLeft: 10, marginTop: 5 }}>
                <Text style={{ fontSize: responsiveFontSize(2.1), color: "#fff", fontWeight: "500" }}>
                    Contact Details
                </Text>
            </View>

            <View style={{ marginHorizontal: 10, marginTop: 5 }}>
                <View style={{ backgroundColor: "#a9b9bf", paddingHorizontal: 10, borderRadius: 5, paddingVertical: 10 }}>
                    <View style={{}}>
                        <TextInput
                            style={{
                                paddingVertical: 8,
                                fontSize: responsiveFontSize(1.8),
                                fontWeight: "500",
                                color: "#000",
                                borderWidth: 0.5,
                                borderRadius: 5,
                                paddingLeft: 5
                            }}
                            placeholderTextColor="#6d6d6d"
                            // keyboardType='email-address'
                            placeholder='Name*'
                            onChangeText={value => setname(value)}
                        />
                        {errors.name && (
                            <Text style={{ color: 'red', fontSize: responsiveFontSize(1.5), paddingLeft: 5, paddingTop: 5 }}>
                                {errors.name[0]}
                            </Text>
                        )}
                    </View>

                    <View style={{ paddingTop: 5 }}>
                        <TextInput
                            style={{
                                paddingVertical: 8,
                                fontSize: responsiveFontSize(1.8),
                                fontWeight: "500",
                                color: "#000",
                                borderWidth: 0.5,
                                borderRadius: 5,
                                paddingLeft: 5
                            }}
                            placeholderTextColor="#6d6d6d"
                        
                            placeholder='Mobile No*'
                            onChangeText={value => setmobilenumber(value)}
                              maxLength={10}
                               keyboardType="numeric"
                        />
                        {errors.mobile && (
                            <Text style={{ color: 'red', fontSize: responsiveFontSize(1.5), paddingLeft: 5, paddingTop: 5 }}>
                                {errors.mobile[0]}
                            </Text>
                        )}
                    </View>
                </View>
            </View>

            <View style={{ paddingLeft: 10, marginTop: 10 }}>
                <Text style={{ fontSize: responsiveFontSize(2.1), color: "#fff", fontWeight: "500" }}>
                    Address
                </Text>
            </View>

            <View style={{ marginHorizontal: 10, marginTop: 10 }}>
                <View style={{
                    backgroundColor: "#a9b9bf",
                    paddingHorizontal: 10,
                    borderRadius: 5,
                    paddingVertical: 10,

                }}>

                    {/* Pincode */}
                    <View style={{ backgroundColor: "#a9b9bf", marginTop: 5 }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '16%',
                            paddingVertical: 2,
                            position: 'absolute',
                            zIndex: 10,
                            top: -10,
                            left: 10,
                            backgroundColor: "#a9b9bf"
                        }}>
                            <Text style={{ color: '#000', fontWeight: '400', fontSize: responsiveFontSize(1.5) }}>Pincode</Text>
                        </View>
                        <View style={{}}>
                            <TextInput
                                style={{
                                    paddingVertical: 8,
                                    fontSize: responsiveFontSize(1.8),
                                    fontWeight: "500",
                                    color: "#000",
                                    borderWidth: 0.5,
                                    borderRadius: 5,
                                    paddingLeft: 5
                                }}
                                placeholderTextColor="#6d6d6d"
                                onChangeText={value => setpincode(value)}
                                placeholder='Pincode *'
                            />
                            {errors.pin && (
                                <Text style={{ color: 'red', fontSize: responsiveFontSize(1.5), paddingLeft: 5, paddingTop: 5 }}>
                                    {errors.pin[0]}
                                </Text>
                            )}
                        </View>
                    </View>

                    <View style={{ paddingTop: 5 }}>
                        <TextInput
                            style={{
                                paddingVertical: 8,
                                fontSize: responsiveFontSize(1.8),
                                fontWeight: "500",
                                color: "#000",
                                borderWidth: 0.5,
                                borderRadius: 5,
                                paddingLeft: 5
                            }}
                            placeholderTextColor="#6d6d6d"
                            onChangeText={value => setlandmark(value)}
                            placeholder='House No, Building, Street ,Area *'
                        />

                    </View>

                    <View style={{ paddingTop: 5 }}>
                        <TextInput
                            style={{
                                paddingVertical: 8,
                                fontSize: responsiveFontSize(1.8),
                                fontWeight: "500",
                                color: "#000",
                                borderWidth: 0.5,
                                borderRadius: 5,
                                paddingLeft: 5
                            }}
                            placeholderTextColor="#6d6d6d"
                            placeholder='Locality/Town*'
                            onChangeText={value => setaddress(value)}
                        />
                    </View>


                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 5 }}>
                        <View style={{ width: '48%' }}>
                            <TextInput
                                style={{
                                    paddingVertical: 8,
                                    fontSize: responsiveFontSize(1.8),
                                    fontWeight: "500",
                                    color: "#000",
                                    borderWidth: 0.5,
                                    borderRadius: 5,
                                    paddingLeft: 5
                                }}
                                onChangeText={value => setcity(value)}
                                placeholderTextColor="#6d6d6d"
                                placeholder='City/District*'
                            />
                            {errors.city && (
                                <Text style={{ color: 'red', fontSize: responsiveFontSize(1.5), paddingLeft: 5, paddingTop: 5 }}>
                                    {errors.city[0]}
                                </Text>
                            )}
                        </View>

                        <View style={{ width: '48%' }}>
                            <TextInput
                                style={{
                                    paddingVertical: 8,
                                    fontSize: responsiveFontSize(1.8),
                                    fontWeight: "500",
                                    color: "#000",
                                    borderWidth: 0.5,
                                    borderRadius: 5,
                                    paddingLeft: 5
                                }}
                                onChangeText={value => setstate(value)}
                                placeholderTextColor="#6d6d6d"
                                placeholder='State*'
                            />
                            {errors.state && (
                                <Text style={{ color: 'red', fontSize: responsiveFontSize(1.5), paddingLeft: 5, paddingTop: 5 }}>
                                    {errors.state[0]}
                                </Text>
                            )}
                        </View>
                    </View>



                </View>
            </View>

            {/* <View
                style={{
                    backgroundColor: "#a9b9bf",
                    marginHorizontal: 10,
                    marginTop: 10,
                    paddingHorizontal: 5,
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: 10,
                    borderRadius: 5,
                }}>


                <TouchableOpacity
                    style={{ width: "9%", alignItems: "center" }}
                    onPress={() => setIsSelected(!isSelected)}
                >
                    <MaterialCommunityIcons
                        name={isSelected ? "checkbox-marked-outline" : "checkbox-blank-outline"}
                        style={{
                            color: backgroundcolor,
                            fontSize: responsiveFontSize(3)
                        }}
                    />
                </TouchableOpacity>

                <View style={{}}>
                    <Text style={{
                        color: backgroundcolor,
                        fontSize: responsiveFontSize(1.8),
                        paddingLeft: 5
                    }}>
                        Make this my default Address
                    </Text>
                </View>
            </View> */}

            <View style={{marginBottom:150}}></View>

            </ScrollView>
           
            <TouchableOpacity
                onPress={() => data()}
                style={{
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                    backgroundColor: "#066B8C",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingVertical: 10,
                    borderRadius: 5
                }}>

                     {
                        load && load ?
                            <ActivityIndicator size="small" color="#fff" animating={load} />
                            :
                            <Text style={{
                                color: "#fff",
                                fontSize: responsiveFontSize(2),
                                fontWeight: "600"
                            }}>
                                Edit Address
                            </Text>
                    }
               
            </TouchableOpacity>
            
        </View>
    )
}

export default EditAddress

const styles = StyleSheet.create({})