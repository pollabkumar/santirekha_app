
import { TextInput, StyleSheet, Text, View, StatusBar, ActivityIndicator, Button, ToastAndroid, TouchableOpacity } from 'react-native';
import React, { useRef, useEffect, useState } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { responsiveFontSize } from "react-native-responsive-dimensions";
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import { useSelector, useDispatch } from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
const PaymentOption = ({ route }) => {
    console.log("77887788778", (route))
    const navigation = useNavigation();
    const primarycolor = "#066B8C"
    const color = "#fff"
    const wistlistProducts = useSelector(state => state.wistlist);
    const backgroundcolor = "#003243"
    // console.log("datadata", wistlistProducts)
    const [promoVisible, setPromoVisible] = useState(false);
    const [promoreceived, setpromoreceived] = useState(null);
    const [bonusprice, setbonusprice] = useState();
    const [discount, setdiscount] = useState("0");
    const [isSelected, setIsSelected] = useState(false);
    const [sendpromocode, setsendpromocode] = useState("");
    const [load, setload] = useState(false)

    const togglePromoCode = () => {
        setPromoVisible(!promoVisible);
    };

    const loadpromocode = async () => {
        try {
            const promocodes = await AsyncStorage.getItem('loginDetails');
            if (promocodes) {
                const parsepromocodes = JSON.parse(promocodes);
                setbonusprice(parsepromocodes.p_code)
                console.log("parsepromocodes", parsepromocodes)
            }
            console.log()
        } catch (error) {
            console.error('Failed to load saved address:', error);
        }
    };

    useEffect(() => {
        loadpromocode()
    }, [])

    const calculatepromocode = async (code) => {
        try {
            let loginDetails = await AsyncStorage.getItem('loginDetails');
            const user = JSON.parse(loginDetails);
            axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;

            const response = await axios.get('/v1/check/promo/code', { params: { p_code: code } });

            if (!response.data.status) {
                ToastAndroid.show('Promo code not valid', ToastAndroid.SHORT);
                setdiscount("0");
            } else {
                setsendpromocode(code)
                setdiscount(route.params.PromotionalDiscount);
                ToastAndroid.show('Promo code applied successfully', ToastAndroid.SHORT);
            }
        } catch (error) {
            console.error('Error applying promo code:', error);
        }
    };
    console.log("lllllllllllllllll",sendpromocode && sendpromocode)

    const handleCheckboxToggle = () => {
        setIsSelected(!isSelected);
    };


    const bookfunction = async () => {
        setload(true)
        try {
            let mr = await AsyncStorage.getItem('loginDetails');
            const modifiedUser = JSON.parse(mr);
            console.log("tokennn",modifiedUser)
            axios.defaults.headers.common['Authorization'] = `Bearer ${modifiedUser.token}`;
             
            const response = await axios.post(`/v1/order/place`, {
                shipping_address_id: route.params.maadrressget,
                wallet_use: isSelected && isSelected,
                p_code: sendpromocode && sendpromocode,
            });
            setload(false)
            if(response.data.status == false){
                ToastAndroid.show('Promotional Code You Have applied is invalid', ToastAndroid.SHORT); 
            }else{
                setload(false)
                ToastAndroid.show('book Successfully', ToastAndroid.SHORT);
                navigation.navigate("ThankYouPage")
            }
               
                console.log("Response:", response);

        } catch (error) {
            setload(false)
            console.error('Error fetching data:', error);
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
            {/* Check Out */}
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
                        style={{ fontSize: responsiveFontSize(2), color: "#fff", paddingLeft: 5, fontWeight: "600" }}>
                        Check Out
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={{
                marginTop: 10,
                marginHorizontal: 10,
            }}>
                <View style={{
                    width: "100%",
                    backgroundColor: '#D9D9D9',
                    padding: 5,
                    borderRadius: 5
                }}>

                    <View style={{}}>
                        <Text style={{ fontSize: responsiveFontSize(2.1), color: "#000", fontWeight: "700" }}>
                            Price Details
                        </Text>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingTop: 10, paddingHorizontal: 5 }} >
                        <Text style={{ color: "#000", fontWeight: "400", fontSize: responsiveFontSize(2), }}>
                            Total Items
                        </Text>

                        <Text style={{ color: "#000", fontWeight: "400", fontSize: responsiveFontSize(2), }}>
                        {/* {route.params.data.map((item)=>item.quantity)} */}
                        {route.params.data?.length}
                        </Text>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingTop: 10, paddingHorizontal: 5 }} >
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
                                    // paddingLeft: 2
                                }}>
                                {route.params.data1}
                            </Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingTop: 10, paddingHorizontal: 5 }} >
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
                                {discount}
                            </Text>
                        </View>
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            paddingTop: 10,
                            borderBottomWidth: 1,
                            paddingBottom: 10,
                            paddingHorizontal: 5
                        }} >
                        <Text style={{ color: "#000", fontWeight: "400", fontSize: responsiveFontSize(2), }}>
                            Shipping
                        </Text>

                        {
                            route.params.shipping == true?
                        <Text style={{ color: "#000", fontWeight: "400", fontSize: responsiveFontSize(2), }}>
                            paid
                        </Text>:
                          <Text style={{ color: "#000", fontWeight: "400", fontSize: responsiveFontSize(2), }}>
                          Free
                      </Text>

                        }
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingTop: 5, paddingHorizontal: 5 }} >
                        <Text style={{ color: "#000", fontWeight: "600", fontSize: responsiveFontSize(2), paddingLeft: 0 }}>
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
                                {Number(route.params.data1) - Number(discount)}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={{ marginHorizontal: 10, marginTop: 15 }}>
                <View
                    style={{
                        backgroundColor: 'rgba(166, 166, 166, 0.6)',
                        paddingVertical: 9,
                        borderRadius: 5,
                        width: "100%",
                        paddingHorizontal: 6

                    }}>
                    <View
                        style={{
                            alignItems: "center",
                            flexDirection: "row",
                            justifyContent: "space-between"
                        }}>

                        <Text style={{
                            color: "#fff",
                            fontSize: responsiveFontSize(1.7),
                            fontWeight: "600",
                            // paddingLeft:7
                        }}>
                            Add Promo Code
                        </Text>

                        <TouchableOpacity
                            style={{
                                paddingHorizontal: 10,
                                borderRadius: 5,
                                paddingVertical: 4,
                            }}
                            onPress={togglePromoCode}
                        >
                            <AntDesign
                                name={promoVisible ? "caretup" : "caretdown"}
                                style={{ fontSize: responsiveFontSize(1.7), color: '#fff' }}
                            />

                        </TouchableOpacity>
                    </View>

                    {promoVisible && (
                        <View style={{
                            width: "100%",
                            alignItems: "center",
                            flexDirection: "row",
                            justifyContent: "center", marginTop: 10
                        }}>
                            <View style={{ width: '70%', }}>
                                <TextInput
                                    placeholder="Enter Promo Code"
                                    placeholderTextColor={'#fff'}
                                    onChangeText={(value) => setpromoreceived(value)}
                                    style={{
                                        width: '100%',
                                        borderBottomWidth: 0.29,
                                        borderBottomColor: "#fff",
                                        padding: 0,
                                        fontSize: responsiveFontSize(1.85),
                                        color: '#fff',
                                        fontWeight: '300',
                                    }}
                                />
                            </View>

                            <View
                                style={{
                                    width: '30%', alignItems: "center"
                                }}>
                                <TouchableOpacity
                                    onPress={() => calculatepromocode(promoreceived)}
                                    style={{
                                        backgroundColor: "#066B8C",
                                        width: '80%',
                                        alignItems: "center",
                                        borderRadius: 5,
                                        paddingVertical: 7,
                                    }}
                                >
                                    <Text style={{ fontSize: responsiveFontSize(1.9), fontWeight: '500', color: '#fff' }} >Apply</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}

                </View>
            </View>

            {/* Wallet Section */}
            <View style={{
                marginTop: 15,
                backgroundColor: 'rgba(166, 166, 166, 0.6)',
                paddingVertical: 7,
                borderRadius: 5,
                marginHorizontal: 10,
                paddingHorizontal: 5,
            }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <MaterialCommunityIcons
                        name={isSelected ? "checkbox-marked" : "checkbox-blank-outline"}
                        size={24}
                        color={color}
                        onPress={handleCheckboxToggle}
                    />
                    <Text style={{ fontSize: responsiveFontSize(2), marginLeft: 8 }}>
                        Use Wallet
                    </Text>
                </View>
            </View>
            
        
            <TouchableOpacity
            // onPress={()=>navigation.navigate("ThankYouPage")}
            onPress={()=>bookfunction()}
            
                style={{ position: "absolute", bottom: 10, width: "100%", paddingHorizontal: 8 }}
            >
              
                <View style={{ backgroundColor: '#066B8C', width: "100%", paddingVertical: 6, borderRadius: 20, alignItems: "center" }}>
                {
              load && load ?
                <ActivityIndicator size="small" color="#fff" animating={load} />
                :
                    <Text style={{ fontSize: responsiveFontSize(2), fontWeight: "500" }}>
                        Place Order
                    </Text>
}
                </View>

                
            </TouchableOpacity>
        </View>
    )
}

export default PaymentOption

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 5,
        backgroundColor: "#003243",
    },
    title: {
        fontSize: responsiveFontSize(3),
        marginBottom: 7,
        color: "#fff",
        fontWeight: "bold",
    },
    option: {
        backgroundColor: 'rgba(166, 166, 166, 0.6)',
        width: '100%',
        // elevation: 5,
        marginTop: 7,
        paddingVertical: 12,
        borderRadius: 4,
        flexDirection: "row",
        alignItems: 'center',
    },
    selectedOption: {
        borderColor: '#007bff',
        backgroundColor: '#e6f7ff',
    },
    optionText: {
        fontSize: responsiveFontSize(2.2),
        color: "#003243",
        fontWeight: "500",
        paddingLeft: 5
    },
    selectedContainer: {
        marginTop: 10,
        alignItems: 'center',
    },
    selectedText: {
        fontSize: responsiveFontSize(2.2),
        marginBottom: 10,
        color: "grey",
        fontWeight: "400",
    },
    amountText: {
        fontSize: responsiveFontSize(2.2),
        // marginBottom: 20,
        color: "#066B8C",
        fontWeight: "700",
    },
});



