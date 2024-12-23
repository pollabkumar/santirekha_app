
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
    StatusBar,
    ScrollView,
    FlatList,
    TextInput,
    ToastAndroid,
    TouchableOpacity
} from 'react-native'
import React, { useRef, useEffect, useState } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { responsiveFontSize } from "react-native-responsive-dimensions";
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const ResetPaasword = () => {
    const navigation = useNavigation();
    const primarycolor = "#066B8C";
    const backgroundcolor = "#003243";
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [errors, setErrors] = useState({});
    const [load, setload] = useState(false)

    const data = async () => {
        setload(true)
        setErrorMessage('');
        if (newPassword !== confirmPassword) {
            setload(false)
            setErrorMessage('New password and confirm password do not match');
            return;
        }

        try {
            let mr = await AsyncStorage.getItem('loginDetails');
            const modifiedUser = JSON.parse(mr);
            axios.defaults.headers.common['Authorization'] = `Bearer ${modifiedUser.token}`;

            const response = await axios.put(`/v1/change/password/${modifiedUser.id}`, {
                current_password: currentPassword,
                new_password: newPassword,
                confirm_password: confirmPassword,
            });

            if (response.data.error_code === true) {
                setload(false)
                setErrors(response.data.error_message);
            } else {
                setload(false)
                setErrors({});
                ToastAndroid.show('Password Changed Successfully', ToastAndroid.SHORT);
                navigation.navigate("Deshboard")
            }

            console.log("Response:", response);

        } catch (error) {
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
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <AntDesign name="arrowleft"
                            style={{ fontSize: responsiveFontSize(2.2), color: "#fff" }}
                        />
                    </TouchableOpacity>
                    <Text
                        style={{ fontSize: responsiveFontSize(2), color: "#fff", paddingLeft: 5, fontWeight: "600" }}>
                        Reset Password
                    </Text>
                </View>
            </View>

            <View style={{ padding: 10 }}>
                <View>
                    <Text style={{ fontSize: responsiveFontSize(2), color: "#fff" }}>
                        Current Password
                    </Text>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Enter Current Password *"
                        onChangeText={value => setCurrentPassword(value)}
                        placeholderTextColor={'#535353'}
                        style={styles.textInput}
                    />
                </View>
                {errors.current_password && (
                    <Text style={{ color: 'red', fontSize: responsiveFontSize(1.5), paddingLeft: 5, paddingTop: 5 }}>
                        {errors.current_password[0]}
                    </Text>
                )}

                <View style={{ marginTop: 10 }}>
                    <Text style={{ fontSize: responsiveFontSize(2), color: "#fff" }}>
                        New Password
                    </Text>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Enter New Password *"
                        onChangeText={value => setNewPassword(value)}
                        placeholderTextColor={'#535353'}
                        style={styles.textInput}
                    />
                </View>
                {errors.new_password && (
                    <Text style={{ color: 'red', fontSize: responsiveFontSize(1.5), paddingLeft: 5, paddingTop: 5 }}>
                        {errors.new_password[0]}
                    </Text>
                )}

                <View style={{ marginTop: 10 }}>
                    <Text style={{ fontSize: responsiveFontSize(2), color: "#fff" }}>
                        Confirm New Password
                    </Text>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Enter Confirm New Password *"
                        onChangeText={value => setConfirmPassword(value)}
                        placeholderTextColor={'#535353'}
                        style={styles.textInput}
                    />
                </View>
                {errors.confirm_password && (
                    <Text style={{ color: 'red', fontSize: responsiveFontSize(1.5), paddingLeft: 5, paddingTop: 5 }}>
                        {errors.confirm_password[0]}
                    </Text>
                )}

                {/* Display error message if passwords don't match */}
                {errorMessage ? (
                    <Text style={{ color: 'red', marginTop: 10, fontSize: responsiveFontSize(1.8) }}>
                        {errorMessage}
                    </Text>
                ) : null}
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={data}
                    style={styles.button}>

                    {
                        load && load ?
                            <ActivityIndicator size="small" color="#fff" animating={load} />
                            :
                            <Text style={styles.buttonText}>
                                Update Password
                            </Text>
                    }
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default ResetPaasword
const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
        backgroundColor: "#a9b9bf",
        borderRadius: 10,
        paddingHorizontal: 3,
        elevation: 5,
        marginTop: 8
    },
    textInput: {
        flex: 1,
        color: "#535353",
        fontSize: responsiveFontSize(1.8),
        paddingLeft: 5,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    button: {
        width: "100%",
        backgroundColor: "#066B8C",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: "#fff",
        fontSize: responsiveFontSize(2),
        fontWeight: "600",
    }
});


