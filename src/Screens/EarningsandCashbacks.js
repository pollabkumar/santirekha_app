import {
    StyleSheet,
    TouchableOpacity,
    View,
    StatusBar,
    Text,
    Image,
    TextInput,
    Share
} from 'react-native'
import React, { useState, useMemo } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    responsiveFontSize
} from "react-native-responsive-dimensions";
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import { useNavigation } from '@react-navigation/native';

const EarningsandCashbacks = () => {
    const navigation = useNavigation();
    const primarycolor = "#066B8C"
    const backgroundcolor = "#003243"

    const onShare = async () => {
        try {
          const result = await Share.share({
            message:
              'AASHIRVAAD AASHIRVAAD ATTA(1kg)',
          });
          if (result.action === Share.sharedAction) {
    
            if (result.activityType) {
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          Alert.alert(error.message);
        }
      };
    

    return (
        <View style={{ flex: 1, backgroundColor: primarycolor }}>

            <StatusBar
                animated={true}
                backgroundColor={primarycolor}

            />

            <View
                style={{
                    paddingVertical: 2,
                    backgroundColor: primarycolor,
                    height: "20%",
                    width: "100%",
                    flexDirection: "row",
                    // alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: 5,
                    paddingHorizontal: 10
                }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <AntDesign name="arrowleft"
                        style={{ fontSize: responsiveFontSize(2.2), color: "#fff", paddingTop: 5, }}
                    />
                </TouchableOpacity>
                <View
                // style={{ alignItems: 'center', paddingTop: 15 }}
                >
                    <Text
                        style={{
                            fontSize: responsiveFontSize(2.3),
                            color: "#fff",
                            fontWeight: '500',
                        }}>
                        Earnings and Cash backs
                    </Text>
                </View>
                <View>

                </View>
            </View>

            <View style={{
                position: "absolute",
                top: 54,
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: 200,
                zIndex: 11,
                elevation: 10
            }}>
                <View style={{
                    backgroundColor: "#fff",
                    // paddingHorizontal: 15,
                    borderRadius: 10,
                    elevation: 3,
                    // alignItems: "center",
                    // paddingVertical: 22,
                    width: "90%",
                    elevation: 10,
                    padding: 25
                }}>

                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        borderBottomWidth: 0.6,
                        paddingBottom: 5,
                        borderBottomColor: "#999999"
                    }}>
                        <Text style={{ color: "#000", fontSize: responsiveFontSize(1.9), fontWeight: "500", }}>AVAILABLE BALANCE:</Text>
                        <Text style={{ color: "#000", fontSize: responsiveFontSize(1.9), fontWeight: "800", }}>$ 150</Text>

                    </View>


                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "100%"
                    }}>

                        <View style={{ width: "65%" }}>
                            <View style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                borderBottomWidth: 0.6,
                                paddingBottom: 5,
                                borderBottomColor: "#999999",
                                marginTop: 10
                            }}>

                                <Text style={{
                                    color: "#000", fontSize: responsiveFontSize(1.9), fontWeight: "500",
                                    // borderBottomWidth: 0.6,
                                    // paddingBottom: 5,
                                    // borderBottomColor: "#999999"
                                }}>Total Earnings:</Text>
                                <Text style={{ color: "#000", fontSize: responsiveFontSize(1.9), fontWeight: "800", }}>$ 150</Text>

                            </View>

                            <View style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginTop: 10
                            }}>

                                <Text style={{
                                    color: "#000", fontSize: responsiveFontSize(1.9), fontWeight: "500",

                                }}>Total Spent:</Text>
                                <Text style={{ color: "#000", fontSize: responsiveFontSize(1.9), fontWeight: "800", }}>$ 150</Text>
                            </View>
                        </View>


                        <View style={{ width: "35%" }}>
                            <Image
                                source={require("../assets/Newfolder/earn.png")}
                                style={{ height: 80, width: "100%", borderRadius: 90 }}
                                resizeMode="contain"
                            />
                        </View>
                    </View>
                </View>
            </View>

            <View style={{
                height: "80%",
                width: "100%",
                backgroundColor: "#e0e0e0",
                borderTopStartRadius: 30,
                borderTopEndRadius: 30

            }}>
                <View style={{ marginTop: "30%", }}>
                    <View style={{ width: "100%", paddingHorizontal: 5, marginTop: 5, }}>

                        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                            <Text style={{ fontSize: responsiveFontSize(2.1), fontWeight: "600", color: "#000" }}>
                                Total Reward Earnings :
                            </Text>

                            <Text style={{ fontSize: responsiveFontSize(2.1), fontWeight: "600", color: "#000" }}>
                                ₹12.60
                            </Text>
                        </View>



                        <View style={{ flexDirection: "row", marginTop: 10, justifyContent: "space-evenly" }}>
                            <Text style={{ fontSize: responsiveFontSize(2.1), fontWeight: "600", color: "#000" }}>
                                Total Referral Earnings:
                            </Text>

                            <Text style={{ fontSize: responsiveFontSize(2.1), fontWeight: "600", color: "#000" }}>
                                ₹12.60
                            </Text>
                        </View>





                    </View>
                </View>


                <View style={{}}>
                    <View style={{ width: "100%", backgroundColor: "", padding: 10, marginTop: 27 }}>
                        <View style={{ flexDirection: "row", }}>
                            <Text style={{ color: "#000", fontSize: responsiveFontSize(1.9), fontWeight: "800", }}>Refer & Earn</Text>
                            <TouchableOpacity
                                onPress={() => onShare()}
                                style={{ backgroundColor: 'rgba(166, 166, 166, 0.6)', padding: 5, borderRadius: 50, marginLeft: 5 }}>
                                <MaterialCommunityIcons
                                    name="share-all-outline"
                                    style={{ fontSize: responsiveFontSize(1.5), color: "#000" }}
                                />

                            </TouchableOpacity>
                        </View>
                        <Text style={{ color: "#000", fontSize: responsiveFontSize(1.9), fontWeight: "400", marginTop: 5 }}>
                            Earn $200 for every friend joining Santirekha
                            App using your referral code.
                        </Text>
                    </View>

                </View>
            </View>
        </View>



    )
}

export default EarningsandCashbacks

const styles = StyleSheet.create({
    absoluteContainer: {
        position: "absolute",
        // top: 46,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: 200,
        zIndex: 11,
        elevation: 10
    },
    absoluteContent: {
        backgroundColor: "#fff",
        paddingHorizontal: 80,
        borderRadius: 10,
        elevation: 3,
        alignItems: "center",
        paddingVertical: 19,
        width: "90%",
        elevation: 10
    },
    button: {
        width: "100%",
        backgroundColor: "#066B8C",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        borderRadius: 5,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: responsiveFontSize(2),
        fontWeight: "600",
    }
});