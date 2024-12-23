import { StyleSheet, Text, View, StatusBar, TextInput, TouchableOpacity, Button, RefreshControl, Image, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import BackIcon from 'react-native-vector-icons/dist/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize } from "react-native-responsive-dimensions";
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
const Enquiry = () => {
    const navigation = useNavigation();
    const primarycolor = "#066B8C"
    const backgroundcolor = "#003243"

    const [enquiry, setenquiry] = useState('');

    const handleSubmit = () => {
        if (enquiry.trim() === '') {
            Alert.alert('Error', 'Please enter your enquiry.');
            return;
        }

        // Handle the form submission (e.g., send the enquiry to a server)
        Alert.alert('Inquiry Submitted', `Your inquiry: ${enquiry}`);
        setInquiry('');
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
                    <Text style={{ fontSize: responsiveFontSize(2.2), color: "#fff", paddingLeft: 5, fontWeight: "600" }}>jgflhkgjhl</Text>
                </View>


            </View>


            <View style={styles.container}>
                <View style={{
                    marginTop: 5
                    // paddingHorizontal: 8 , 
                }}>
                    <Text style={{ fontSize: responsiveFontSize(2), color: "#fff", fontWeight: "500" }}>
                        Have any questions or special requests about your order? Let us know, and we'll assist you promptly!
                    </Text>
                </View>
                <TextInput
                    style={styles.textInput}
                    placeholder="Write your enquiry here..."
                    value={enquiry}
                    onChangeText={setenquiry}
                    multiline
                    numberOfLines={4}
                />
                {/* <Button title="Submit" onPress={handleSubmit} /> */}
                <TouchableOpacity
                    style={{
                        backgroundColor: primarycolor,
                        alignItems: "center",
                        paddingVertical: 8,
                        borderRadius: 19,
                        marginTop: 15
                    }}>
                    <Text style={{ fontSize: responsiveFontSize(2), color: "#fff", fontWeight: "500" }}>
                        Submit
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}


export default Enquiry


const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingHorizontal: 10,
    },

    textInput: {
        height: 100,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        textAlignVertical: 'top',
        color: '#c9c9c9',
        marginTop: 10,
        borderRadius: 3
    },
});