import React from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import Modal from 'react-native-modal';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import Feather from 'react-native-vector-icons/dist/Feather';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/dist/FontAwesome6';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux'
import { emptyCart } from '../redux/action/Action';
const SidebarModal = ({ isVisible, onClose }) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const handleLogout = async () => {
        try {
            // Remove loginDetails from AsyncStorage
            await AsyncStorage.removeItem('loginDetails');
            // Optionally, you can navigate to the login screen or perform other actions
            navigation.navigate('Login'); // Adjust the navigation target as needed
            onClose(); // Close the modal
        } catch (error) {
            console.error('Failed to remove loginDetails:', error);
        }
    };

    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onClose}
            onSwipeComplete={onClose}
            swipeDirection="left"
            backdropOpacity={0.5}
            animationIn="slideInLeft"
            animationOut="slideOutLeft"
            style={{ margin: 0 }}
        >
            <View style={{ backgroundColor: "#D9D9D9", width: "80%", flex: 1 }}>
                <ScrollView style={{ padding: 3, paddingHorizontal: 10 }}>

                    <TouchableOpacity 
                    onPress={()=>navigation.navigate("Account")}
                    style={{ flexDirection: "row", alignItems: "center", borderBottomWidth: 0.5, borderStyle: "dotted", justifyContent: "space-between", paddingHorizontal: 5, marginTop: 11 }}>
                        <View style={{ padding: 6, borderRadius: 70, flexDirection: "row", }}>
                            <FontAwesome name='user' size={20} color="grey" />
                            <Text style={{ color: "#000", fontSize: responsiveFontSize(1.8), fontWeight: "400", paddingLeft: 7 }}>
                                My Profile
                            </Text>
                        </View>
                        <FontAwesome name='chevron-right' size={15} color="#000" />
                    </TouchableOpacity>

                    <TouchableOpacity 
                    onPress={()=>navigation.navigate("WistList")}
                    style={{ flexDirection: "row", alignItems: "center", borderBottomWidth: 0.5, borderStyle: "dotted", justifyContent: "space-between", marginTop: 15 }}>
                        <View style={{ padding: 6, borderRadius: 70, flexDirection: "row", }}>
                            <Feather name='file-text' size={20} color="grey" />
                            <Text style={{ color: "#000", fontSize: responsiveFontSize(1.8), fontWeight: "400", paddingLeft: 7 }}>
                             WistList products
                            </Text>
                        </View>
                        <FontAwesome name='chevron-right' size={15} color="#000" />
                    </TouchableOpacity>

                    <TouchableOpacity 
                    onPress={()=>navigation.navigate("OrderPage")}
                    style={{ flexDirection: "row", alignItems: "center", borderBottomWidth: 0.5, borderStyle: "dotted", justifyContent: "space-between", marginTop: 15 }}>
                        <View style={{ padding: 6, borderRadius: 70, flexDirection: "row", }}>
                            <Feather name='file-text' size={20} color="grey" />
                            <Text style={{ color: "#000", fontSize: responsiveFontSize(1.8), fontWeight: "400", paddingLeft: 7 }}>
                                My orders
                            </Text>
                        </View>
                        <FontAwesome name='chevron-right' size={15} color="#000" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate("Wallet")} style={{ flexDirection: "row", alignItems: "center", borderBottomWidth: 0.5, borderStyle: "dotted", justifyContent: "space-between", marginTop: 15 }}>
                        <View style={{ padding: 6, borderRadius: 70, flexDirection: "row", }}>
                            <Ionicons name='wallet' size={20} color="grey" />
                            <View>
                                <Text style={{ color: "#000", fontSize: responsiveFontSize(1.8), fontWeight: "400", paddingLeft: 7 }}>
                                    1. Total Win Rs.200
                                </Text>
                                <Text
                                    style={{
                                        color: "#000",
                                        fontSize: responsiveFontSize(1.8),
                                        fontWeight: "400",
                                        paddingLeft: 7,
                                        paddingTop:5
                                    }}>
                                    2. Pending Rs.50
                                </Text>
                            </View>
                        </View>
                        <FontAwesome name='chevron-right' size={15} color="#000" />
                    </TouchableOpacity>

                    <TouchableOpacity
                    onPress={()=>navigation.navigate("TermAndCondition")}
                    style={{ flexDirection: "row", alignItems: "center", borderBottomWidth: 0.5, borderStyle: "dotted", justifyContent: "space-between", marginTop: 15 }}>
                        <View style={{ padding: 6, borderRadius: 70, flexDirection: "row", }}>
                            <FontAwesome name='file' size={20} color="grey" />
                            <Text style={{ color: "#000", fontSize: responsiveFontSize(1.8), fontWeight: "400", paddingLeft: 7 }}>
                                T & C
                            </Text>
                        </View>
                        <FontAwesome name='chevron-right' size={15} color="#000" />
                    </TouchableOpacity>

                    <TouchableOpacity 
                    onPress={()=>navigation.navigate("Enquiry")}
                    style={{ flexDirection: "row", alignItems: "center", borderBottomWidth: 0.5, borderStyle: "dotted", justifyContent: "space-between", marginTop: 15 }}>
                        <View style={{ padding: 6, borderRadius: 70, flexDirection: "row", }}>
                            <AntDesign name='questioncircle' size={20} color="grey" />
                            <Text style={{ color: "#000", fontSize: responsiveFontSize(1.8), fontWeight: "400", paddingLeft: 7 }}>
                                Enquiry
                            </Text>
                        </View>
                        <FontAwesome name='chevron-right' size={15} color="#000" />
                    </TouchableOpacity>

                    <TouchableOpacity 
                    onPress={()=>navigation.navigate("Address")}
                    style={{ flexDirection: "row", alignItems: "center", borderBottomWidth: 0.5, borderStyle: "dotted", justifyContent: "space-between", marginTop: 15 }}>
                        <View style={{ padding: 6, borderRadius: 70, flexDirection: "row", }}>
                            <FontAwesome6 name='location-dot' size={20} color="grey"/>
                            <Text style={{ color: "#000", fontSize: responsiveFontSize(1.8), fontWeight: "400", paddingLeft: 7 }}>
                                Change Shipping Address
                            </Text>
                        </View>
                        <FontAwesome name='chevron-right' size={15} color="#000" />
                    </TouchableOpacity>
                </ScrollView>
                <TouchableOpacity 
                onPress={() => dispatch(emptyCart())}
                style={{ backgroundColor: "grey", alignItems: "center", }}>
                    <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: 5 }}>
                        <AntDesign style={{ fontSize: responsiveFontSize(1.8), color: "#fff", fontWeight: "500" }} name="logout" />
                        <Text style={{ fontSize: responsiveFontSize(2), color: "#fff", paddingLeft: 5, fontWeight: "500" }}>Logout</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

export default SidebarModal;
