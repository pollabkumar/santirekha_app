// import {
//     StyleSheet,
//     TouchableOpacity,
//     View,
//     StatusBar,
//     Text,
//     Image,
//     TextInput,
//     ScrollView
// } from 'react-native'
// import React, { useRef, useEffect, useState } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios'
// import {
//     responsiveFontSize
// } from "react-native-responsive-dimensions";
// import AntDesign from 'react-native-vector-icons/dist/AntDesign';
// import { useNavigation } from '@react-navigation/native';
// import { useDispatch, useSelector } from 'react-redux';
// const EditUserProfile = () => {
//     const navigation = useNavigation();
//     const primarycolor = "#066B8C"
//     const backgroundcolor = "#003243"
//     const loginDetails = useSelector(state => state.login);
//     const [userDetails, setuserDetails] = useState("")

//     const data = async () => {
//         try {
//             let mr = await AsyncStorage.getItem('loginDetails');
//             const modifiedUser = JSON.parse(mr);
//             console.log('modifiedUserrrrr', modifiedUser.token);
//             console.log('modifiedUserrrrrid', modifiedUser.id);
//             axios.defaults.headers.common[
//                 'Authorization'
//             ] = `Bearer ${modifiedUser.token}`;
//             const response = await axios.put(`/v1/users/${modifiedUser.id}`);
//             setuserDetails(response)
//             // console.log("111111", response)
//         } catch (error) {
//             // setload(false)
//             console.error('Error fetching data:', error);
//         }
//     }
//     useEffect(() => {
//         data()
//       }, [])

//     console.log("pollabb", userDetails && userDetails)
//     return (
//         <View style={{ flex: 1, backgroundColor: "#e0e0e0" }}>
//             <StatusBar
//                 animated={true}
//                 backgroundColor={primarycolor}
//             />

//             <View
//                 style={{
//                     paddingVertical: 12,
//                     backgroundColor: primarycolor,
//                     // height: "10%",
//                     width: "100%",
//                     flexDirection: "row",
//                     paddingTop: 5,
//                     alignItems: "center",
//                     // paddingVertical: 5
//                 }}>
//                 <TouchableOpacity
//                     onPress={() => navigation.goBack()}
//                 >
//                     <AntDesign name="arrowleft"
//                         style={{ fontSize: responsiveFontSize(2.2), color: "#fff", paddingLeft: 10 }}
//                     />
//                 </TouchableOpacity>
//                 <View style={{ paddingLeft: 5 }}>
//                     <Text
//                         style={{
//                             fontSize: responsiveFontSize(1.9),
//                             color: "#fff",
//                             fontWeight: '500',
//                         }}>
//                         Edit Personal Information
//                     </Text>
//                 </View>


//             </View>

//             {/* ll */}
//             <View style={{

//                 alignItems: "center",
//                 justifyContent: "center",
//                 width: "100%",
//                 // height: 200,
//                 elevation: 10,
//             }}>

//                 {/* ll12 */}
//                 <View style={{ width: "100%", paddingHorizontal: 5, marginTop: 20 }}>

//                     <View style={{ marginHorizontal: 12, }}>
//                         <View style={{ width: "100%" }}>
//                             <View style={{
//                                 flexDirection: 'row',
//                                 alignItems: 'center',
//                                 justifyContent: 'center',
//                                 width: '15%',
//                                 paddingVertical: 2,
//                                 position: 'absolute',
//                                 zIndex: 10,
//                                 top: -10,
//                                 left: 5,
//                                 backgroundColor: "#e0e0e0"
//                             }}>
//                                 <Text style={{ color: '#000', fontWeight: '400', fontSize: responsiveFontSize(1.5) }}>Name</Text>
//                             </View>
//                             <View style={{}}>
//                                 <TextInput
//                                     style={{
//                                         paddingVertical: 8,
//                                         fontSize: responsiveFontSize(1.8),
//                                         fontWeight: "500",
//                                         color: "#000",
//                                         borderWidth: 0.5,
//                                         borderRadius: 5,
//                                         paddingLeft: 9
//                                     }}
//                                     placeholderTextColor="#6d6d6d"
//                                     // keyboardType='email-address'
//                                     placeholder='Enter Your Name '
//                                 />
//                             </View>
//                         </View>
//                     </View>

//                     <View style={{ marginHorizontal: 12, marginTop: 20 }}>
//                         <View style={{ width: "100%" }}>
//                             <View style={{
//                                 flexDirection: 'row',
//                                 alignItems: 'center',
//                                 justifyContent: 'center',
//                                 width: '15%',
//                                 paddingVertical: 2,
//                                 position: 'absolute',
//                                 zIndex: 10,
//                                 top: -10,
//                                 left: 5,
//                                 backgroundColor: "#e0e0e0"
//                             }}>
//                                 <Text style={{ color: '#000', fontWeight: '400', fontSize: responsiveFontSize(1.5) }}>Mobile</Text>
//                             </View>
//                             <View style={{}}>
//                                 <TextInput
//                                     style={{
//                                         paddingVertical: 8,
//                                         fontSize: responsiveFontSize(1.8),
//                                         fontWeight: "500",
//                                         color: "#000",
//                                         borderWidth: 0.5,
//                                         borderRadius: 5,
//                                         paddingLeft: 9
//                                     }}
//                                     placeholderTextColor="#6d6d6d"
//                                     // keyboardType='email-address'
//                                     placeholder='Enter Your Mobile '
//                                 />
//                             </View>
//                         </View>
//                     </View>

//                     <View style={{ marginHorizontal: 12, marginTop: 20 }}>
//                         <View style={{ width: "100%" }}>
//                             <View style={{
//                                 flexDirection: 'row',
//                                 alignItems: 'center',
//                                 justifyContent: 'center',
//                                 width: '35%',
//                                 paddingVertical: 2,
//                                 position: 'absolute',
//                                 zIndex: 10,
//                                 top: -10,
//                                 left: 5,
//                                 backgroundColor: "#e0e0e0"
//                             }}>
//                                 <Text style={{ color: '#000', fontWeight: '400', fontSize: responsiveFontSize(1.5) }}>WhatsApp Number</Text>
//                             </View>
//                             <View style={{}}>
//                                 <TextInput
//                                     style={{
//                                         paddingVertical: 8,
//                                         fontSize: responsiveFontSize(1.8),
//                                         fontWeight: "500",
//                                         color: "#000",
//                                         borderWidth: 0.5,
//                                         borderRadius: 5,
//                                         paddingLeft: 9
//                                     }}
//                                     placeholderTextColor="#6d6d6d"
//                                     // keyboardType='email-address'
//                                     placeholder='Enter Your WhatsApp Number '
//                                 />
//                             </View>
//                         </View>
//                     </View>

//                     <View style={{ marginHorizontal: 12, marginTop: 20 }}>
//                         <View style={{ width: "100%" }}>
//                             <View style={{
//                                 flexDirection: 'row',
//                                 alignItems: 'center',
//                                 justifyContent: 'center',
//                                 width: '15%',
//                                 paddingVertical: 2,
//                                 position: 'absolute',
//                                 zIndex: 10,
//                                 top: -10,
//                                 left: 5,
//                                 backgroundColor: "#e0e0e0"
//                             }}>
//                                 <Text style={{ color: '#000', fontWeight: '400', fontSize: responsiveFontSize(1.5) }}>Pin</Text>
//                             </View>
//                             <View style={{}}>
//                                 <TextInput
//                                     style={{
//                                         paddingVertical: 8,
//                                         fontSize: responsiveFontSize(1.8),
//                                         fontWeight: "500",
//                                         color: "#000",
//                                         borderWidth: 0.5,
//                                         borderRadius: 5,
//                                         paddingLeft: 9
//                                     }}
//                                     placeholderTextColor="#6d6d6d"
//                                     // keyboardType='email-address'
//                                     placeholder='Enter Your Pin Number '
//                                 />
//                             </View>
//                         </View>
//                     </View>

//                     <View style={{ marginHorizontal: 12, marginTop: 20 }}>
//                         <View style={{ width: "100%" }}>
//                             <View style={{
//                                 flexDirection: 'row',
//                                 alignItems: 'center',
//                                 justifyContent: 'center',
//                                 width: '40%',
//                                 paddingVertical: 2,
//                                 position: 'absolute',
//                                 zIndex: 10,
//                                 top: -10,
//                                 left: 5,
//                                 backgroundColor: "#e0e0e0"
//                             }}>
//                                 <Text style={{ color: '#000', fontWeight: '400', fontSize: responsiveFontSize(1.5) }}>Ration Card Number</Text>
//                             </View>
//                             <View style={{}}>
//                                 <TextInput
//                                     style={{
//                                         paddingVertical: 8,
//                                         fontSize: responsiveFontSize(1.8),
//                                         fontWeight: "500",
//                                         color: "#000",
//                                         borderWidth: 0.5,
//                                         borderRadius: 5,
//                                         paddingLeft: 9
//                                     }}
//                                     placeholderTextColor="#6d6d6d"
//                                     // keyboardType='email-address'
//                                     placeholder='Enter Your Ration Card Number '
//                                 />
//                             </View>
//                         </View>
//                     </View>

//                 </View>
//             </View>
//         </View>
//     )
// }

// export default EditUserProfile

// const styles = StyleSheet.create({
//     absoluteContainer: {
//         position: "absolute",
//         // top: 46,
//         alignItems: "center",
//         justifyContent: "center",
//         width: "100%",
//         height: 200,
//         zIndex: 11,
//         elevation: 10
//     },
//     absoluteContent: {
//         backgroundColor: "#e0e0e0",
//         paddingHorizontal: 80,
//         borderRadius: 10,
//         elevation: 3,
//         alignItems: "center",
//         paddingVertical: 19,
//         width: "90%",
//         elevation: 10
//     },
//     button: {
//         width: "100%",
//         backgroundColor: "#066B8C",
//         alignItems: "center",
//         justifyContent: "center",
//         paddingVertical: 10,
//         borderRadius: 5,
//     },
//     buttonContainer: {
//         position: 'absolute',
//         bottom: 0,
//         width: '100%',
//         paddingHorizontal: 10,
//         marginBottom: 10,
//     },
//     buttonText: {
//         color: "#fff",
//         fontSize: responsiveFontSize(2),
//         fontWeight: "600",
//     }
// });

import {
    StyleSheet,
    TouchableOpacity,
    View,
    StatusBar,
    Text,
    TextInput,
    ScrollView,
    ToastAndroid,
    ActivityIndicator
} from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {
    responsiveFontSize
} from "react-native-responsive-dimensions";
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

const EditUserProfile = () => {
    const navigation = useNavigation();
    const primarycolor = "#066B8C";
    const backgroundcolor = "#003243";
    const loginDetails = useSelector(state => state.login);
    const [name, setname] = useState('');
    const [mobilenumber, setmobilenumber] = useState('');
    const [pincode, setpincode] = useState('');
    const [whatsapp, setwhatsapp] = useState('');
    const [rationcard, setrationcard] = useState('');
    const [errors, setErrors] = useState({});
    const [load, setload] = useState(false)
    const data = async () => {
        setload(true)
        try {
            let mr = await AsyncStorage.getItem('loginDetails');
            const modifiedUser = JSON.parse(mr);
            console.log('modifiedUserrrrr', modifiedUser.token);
            console.log('modifiedUserrrrrid', modifiedUser.id);
            axios.defaults.headers.common['Authorization'] = `Bearer ${modifiedUser.token}`;
            const response = await axios.put(`/v1/users/${modifiedUser.id}`,{
                
                    name: name && name,
                    mobile: mobilenumber && mobilenumber,
                    pin: pincode && pincode,
                    wsap_no: whatsapp && whatsapp,
                    ration_card_no: rationcard && rationcard,
                
            });
            console.log("lkklklklklkklklk",response);
            if (response.data.error_code === true) {
                setload(false)
                setErrors(response.data.error_message);
            }else{
                setload(false)
                ToastAndroid.show("User Updated Successfully", ToastAndroid.SHORT);
                navigation.navigate("Deshboard")
            }
        } catch (error) {
            setload(false)
            console.error('Error fetching data:', error);
        }
    };


    // console.log("pollabb", userDetails && userDetails);

    return (
        <View style={{ flex: 1, backgroundColor: "#e0e0e0" }}>
            <StatusBar animated={true} backgroundColor={primarycolor} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" style={styles.backIcon} />
                </TouchableOpacity>
                <View style={{ paddingLeft: 5 }}>
                    <Text style={styles.headerText}>Edit Personal Information</Text>
                </View>
            </View>

            {/* Input Fields */}
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.inputContainer}>
                    <View style={styles.inputGroup}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '15%',
                            paddingVertical: 2,
                            position: 'absolute',
                            zIndex: 10,
                            top: -10,
                            left: 5,
                            backgroundColor: "#e0e0e0"
                        }}>
                            <Text style={styles.labelText}>Name</Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholderTextColor="#6d6d6d"
                            placeholder='Enter Your Name'
                            onChangeText={value => setname(value)}
                        />
                           {errors.name && (
                            <Text style={{ color: 'red', fontSize: responsiveFontSize(1.5), paddingLeft: 5, paddingTop: 5 }}>
                                {errors.name[0]}
                            </Text>
                        )}
                    </View>

                    <View style={styles.inputGroup}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '15%',
                            paddingVertical: 2,
                            position: 'absolute',
                            zIndex: 10,
                            top: -10,
                            left: 5,
                            backgroundColor: "#e0e0e0"
                        }}>
                            <Text style={styles.labelText}>Mobile</Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholderTextColor="#6d6d6d"
                            placeholder='Enter Your Mobile'
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

                    <View style={styles.inputGroup}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '35%',
                            paddingVertical: 2,
                            position: 'absolute',
                            zIndex: 10,
                            top: -10,
                            left: 5,
                            backgroundColor: "#e0e0e0"
                        }}>
                            <Text style={styles.labelText}>WhatsApp Number</Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholderTextColor="#6d6d6d"
                            placeholder='Enter Your WhatsApp Number'
                            onChangeText={value => setwhatsapp(value)}
                              maxLength={10}
                            keyboardType="numeric"
                        />
                            {errors.mobile && (
                            <Text style={{ color: 'red', fontSize: responsiveFontSize(1.5), paddingLeft: 5, paddingTop: 5 }}>
                                {errors.wsap_no[0]}
                            </Text>
                        )}
                    </View>

                    <View style={styles.inputGroup}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '15%',
                            paddingVertical: 2,
                            position: 'absolute',
                            zIndex: 10,
                            top: -10,
                            left: 5,
                            backgroundColor: "#e0e0e0"
                        }}>
                            <Text style={styles.labelText}>Pin</Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholderTextColor="#6d6d6d"
                            placeholder='Enter Your Pin Number'
                            onChangeText={value => setpincode(value)}
                        />
                            {errors.mobile && (
                            <Text style={{ color: 'red', fontSize: responsiveFontSize(1.5), paddingLeft: 5, paddingTop: 5 }}>
                                {errors.pin[0]}
                            </Text>
                        )}
                    </View>

                    <View style={styles.inputGroup}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '35%',
                            paddingVertical: 2,
                            position: 'absolute',
                            zIndex: 10,
                            top: -10,
                            left: 5,
                            backgroundColor: "#e0e0e0"
                        }}>
                            <Text style={styles.labelText}>Ration Card Number</Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholderTextColor="#6d6d6d"
                            placeholder='Enter Your Ration Card Number'
                            onChangeText={value => setrationcard(value)}
                            keyboardType="numeric"
                        />
                      
                    </View>
                </View>
            </ScrollView>

            {/* Edit Button */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => data()}>
                {
              load && load ?
                <ActivityIndicator size="small" color="#fff" animating={load} />
                :
                    <Text style={styles.buttonText}>Update Information</Text>
                }
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default EditUserProfile;

const styles = StyleSheet.create({
    header: {
        paddingVertical: 12,
        backgroundColor: "#066B8C",
        width: "100%",
        flexDirection: "row",
        paddingTop: 4,
        alignItems: "center",
    },
    backIcon: {
        fontSize: responsiveFontSize(2.2),
        color: "#fff",
        paddingLeft: 10
    },
    headerText: {
        fontSize: responsiveFontSize(1.9),
        color: "#fff",
        fontWeight: '500',
    },
    inputContainer: {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        paddingHorizontal: 5,
        marginTop: 5
    },
    inputGroup: {
        marginHorizontal: 12,
        marginTop: 20,
        width: "100%"
    },
    labelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 'auto',
        paddingVertical: 2,
        position: 'absolute',
        zIndex: 10,
        top: -10,
        left: 5,
        backgroundColor: "#e0e0e0"
    },
    labelText: {
        color: '#000',
        fontWeight: '400',
        fontSize: responsiveFontSize(1.5)
    },
    input: {
        paddingVertical: 8,
        fontSize: responsiveFontSize(1.8),
        fontWeight: "500",
        color: "#000",
        borderWidth: 0.5,
        borderRadius: 5,
        paddingLeft: 9
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
        paddingVertical: 15,
        borderRadius: 5,
    },
    buttonText: {
        color: "#fff",
        fontSize: responsiveFontSize(2),
        fontWeight: "600",
    }
});
