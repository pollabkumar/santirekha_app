import { Image, StyleSheet, Text, View, StatusBar, ScrollView, FlatList, ToastAndroid, TouchableOpacity } from 'react-native'
import React, { useRef, useEffect, useState } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { responsiveFontSize } from "react-native-responsive-dimensions";
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import { useSelector, useDispatch } from 'react-redux';

const TermAndCondition = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const primarycolor = "#066B8C"
    const [sidebaropen, setsidebaropen] = useState(false);
    const cartProducts = useSelector(state => state.cart);
    const wistlistProducts = useSelector(state => state.wistlist);
    console.log("datadata", wistlistProducts)

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
                        style={{ fontSize: responsiveFontSize(2), color: "#fff", paddingLeft: 5, fontWeight: "600" }}>
                        Term And Condition
                    </Text>
                </TouchableOpacity>

            </View>

            <View style={{ padding: 10 }}>
                <Text style={{ fontSize: responsiveFontSize(1.6), color: "#fff" }}>
                    If users can post content on your website or mobile app (create content and share it on your platform),
                    you can remove any content they created if it infringes copyright. Your Terms and Conditions will inform users
                    that they can only create and/or share content they own rights to. Similarly, if users can register for an account
                    and choose a username, you can inform users that they are not allowed to choose usernames that may infringe trademarks,
                     i.e. usernames like Google, Facebook, and so on.
                </Text>

                <Text style={{ fontSize: responsiveFontSize(1.6), color: "#fff" }}>
                    If users can post content on your website or mobile app (create content and share it on your platform),
                    you can remove any content they created if it infringes copyright. Your Terms and Conditions will inform users
                    that they can only create and/or share content they own rights to. Similarly, if users can register for an account
                    and choose a username, you can inform users that they are not allowed to choose usernames that may infringe trademarks,
                     i.e. usernames like Google, Facebook, and so on.
                </Text>
            </View>


        </View>
    )
}

export default TermAndCondition

const styles = StyleSheet.create({})