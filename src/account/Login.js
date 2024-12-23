

// import {
//   StyleSheet,
//   Text,
//   View,
//   Dimensions,
//   StatusBar,
//   TextInput,
//   Image,
//   TouchableOpacity,
//   ScrollView,
//   ToastAndroid,
//   ActivityIndicator
// } from 'react-native'
// import React, { useState } from 'react'
// import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
// import Entypo from 'react-native-vector-icons/Entypo';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import { responsiveFontSize } from "react-native-responsive-dimensions";
// import { useNavigation } from '@react-navigation/native';
// const windowHeight = Dimensions.get('window').height;
// import axios from 'axios'
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useDispatch } from 'react-redux'; import { addLoginUser } from '../redux/LoginSlice';

// const Login = () => {
//   const navigation = useNavigation();
//   const dispatch = useDispatch();
//   const primarycolor = "#066B8C"
//   const Whitecolor = "#fff"
//   const backgroundcolor = "#003243"
//   const black = "#000"

//   const [mobile, setmobile] = useState('')
//   const [password, setpassword] = useState('')

//   const handleSubmit = async () => {
//     try {
//       const result = await axios.post(`v1/login`, {
//         mobile: mobile && mobile,
//         password: password && password
//       });

//       console.log("ppppppp11", result.data.data)
//       if (result && result.data) {
//         dispatch(addLoginUser(result.data.data));

//         ToastAndroid.show('Login Successful!', ToastAndroid.SHORT);
//       } else {
//         ToastAndroid.show("Login failed. Please try again.", ToastAndroid.SHORT);
//       }
//     } catch (error) {
//       console.error("Error during login:", error);
//       ToastAndroid.show("An error occurred during login. Please try again.", ToastAndroid.SHORT);
//     }
//   };



//   // const handleSubmit = async () => {
//   //   try {
//   //     const result = await axios.post(`/v1/login`, {
//   //       mobile: mobile && mobile,
//   //       password: password && password
//   //     });

//   //     if (result && result.data) {
//   //       dispatch(addLoginUser(result.data.data));

//   //       try {
//   //         // Storing login details in AsyncStorage
//   //         await AsyncStorage.setItem('loginDetails', JSON.stringify(result.data.data));
//   //         ToastAndroid.show('Login Successful!', ToastAndroid.SHORT);
//   //       } catch (storageError) {
//   //         console.error("Error saving data to AsyncStorage:", storageError);
//   //         ToastAndroid.show("An error occurred while saving login details. Please try again.", ToastAndroid.SHORT);
//   //       }

//   //     } else {
//   //       ToastAndroid.show("Login failed. Please try again.", ToastAndroid.SHORT);
//   //     }
//   //   } catch (error) {
//   //     console.error("Error during login:", error);
//   //     ToastAndroid.show("An error occurred during login. Please try again.", ToastAndroid.SHORT);
//   //   }
//   // };


//   return (
//     <View style={{ flex: 1, backgroundColor: primarycolor }}>
//       <StatusBar
//         animated={true}
//         backgroundColor={primarycolor}
//         translucent={false}
//         barStyle={"light-content"}
//       />
//       <View style={{ height: "50%" }}>
//         <View style={{}}>
//           <Image
//             source={require("../assets/loginfirst.png")}
//             style={{
//               height: "100%",
//               width: '100%',

//             }}
//           // resizeMode="stretch"
//           />
//         </View>
//       </View>

//       <View
//         style={{
//           backgroundColor: '#fff',
//           borderTopStartRadius: 20,
//           borderTopEndRadius: 20,
//           padding: 10,
//           width: '100%',
//           height: "50%"


//         }}>

//         <View style={{ alignItems: "center" }}>
//           <View style={{
//             backgroundColor: "#fff",
//             borderRadius: 150,
//             padding: 17,
//             position: "absolute",
//             bottom: -25

//           }}>
//             <FontAwesome5
//               name="luggage-cart"
//               style={{ color: '#0078a8', fontSize: responsiveFontSize(4) }}
//             />
//           </View>
//         </View>
//         <View style={{ alignItems: "center", marginTop: 19 }}>
//           <Text style={{ color: '#000', fontSize: responsiveFontSize(2.9), fontWeight: "600" }}>
//             Login
//           </Text>
//         </View>

//         <ScrollView>

//           {/* mobile */}
//           <View style={{ marginTop: "3%", alignItems: "center" }}>
//             <View style={{ width: "100%", paddingBottom: 5, borderColor: "#fff", }}>
//               <View style={{}}>
//                 <View style={{ flexDirection: "row", alignItems: "center" }}>
//                   <View style={{}}>
//                     <Entypo name="mobile"
//                       style={{ color: "#000" }}
//                     />
//                   </View>
//                   <View style={{ paddingLeft: 5 }}>
//                     <Text style={{ color: "#000", fontSize: responsiveFontSize(1.8), fontWeight: "500" }}>
//                       Mobile
//                     </Text>
//                   </View>
//                 </View>
//                 <View style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   width: '100%',
//                   justifyContent: 'center',
//                   backgroundColor: "#f3f3f3",
//                   borderRadius: 10,
//                   paddingHorizontal: 3,
//                   elevation: 5,
//                   marginTop: 5
//                 }}>

//                   <TextInput
//                     placeholder="Enter Your Mobile Number *"
//                     placeholderTextColor={'#9e9e9e'}
//                     onChangeText={value => setmobile(value)}
//                     maxLength={10}
//                     keyboardType="numeric"
//                     style={{
//                       flex: 1,
//                       color: "#000",
//                       fontSize: responsiveFontSize(1.8),
//                       paddingLeft: 5,
//                     }}
//                   />
//                 </View>
//               </View>
//             </View>
//           </View>

//           {/* password */}
//           <View style={{ marginTop: "4%", alignItems: "center" }}>
//             <View style={{ width: "100%", paddingBottom: 5, borderColor: "#fff", }}>
//               <View style={{}}>
//                 <View style={{ flexDirection: "row", alignItems: "center" }}>
//                   <View style={{}}>
//                     <MaterialIcons name="lock-outline"
//                       style={{ color: "#000", fontSize: responsiveFontSize(2.1), }}
//                     />
//                   </View>
//                   <View style={{ paddingLeft: 6 }}>
//                     <Text style={{ color: "#000" }}>
//                       Enter Password
//                     </Text>
//                   </View>
//                 </View>
//                 <View style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   width: '100%',
//                   justifyContent: 'center',
//                   backgroundColor: "#f3f3f3",
//                   borderRadius: 10,
//                   paddingHorizontal: 3,
//                   elevation: 5,
//                   marginTop: 5
//                 }}>

//                   <TextInput
//                     placeholder="Enter Your Password *"
//                     placeholderTextColor={'#9e9e9e'}
//                     onChangeText={value => setpassword(value)}

//                     style={{
//                       flex: 1,
//                       color: "#000",
//                       fontSize: responsiveFontSize(1.8),
//                       paddingLeft: 5,
//                     }}
//                   />
//                 </View>
//               </View>
//             </View>
//           </View>

//           <TouchableOpacity
//             // onPress={() => navigation.navigate("Deshboard")}
//             onPress={() => handleSubmit()}
//             style={{
//               borderRadius: 10,
//               padding: 10,
//               alignItems: 'center',
//               backgroundColor: '#003243',
//               fontSize: responsiveFontSize(1.8),
//               marginTop: "3%",
//             }}>
//             <Text
//               style={{
//                 color: '#fff',
//                 fontSize: responsiveFontSize(2.1),
//                 fontWeight: "600"
//               }}>
//               Login
//             </Text>
//           </TouchableOpacity>
//           <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 5 }}>
//             <View style={{}}>
//               <Text style={{ color: "#000" }}>
//                 Dont have account?
//               </Text>
//             </View>
//             <TouchableOpacity
//               onPress={() => navigation.navigate("Register")}
//               style={{ paddingLeft: 5 }}>
//               <Text style={{ color: "#000", textDecorationLine: 'underline', fontSize: responsiveFontSize(1.8), fontWeight: "700" }}>
//                 REGISTER
//               </Text>
//             </TouchableOpacity>
//           </View>

//           <TouchableOpacity style={{ width: "100%", alignItems: "center", marginTop: 10 }}>
//             <Text style={{ color: "#000" }}>
//               Forgot password ?
//             </Text>
//           </TouchableOpacity>
//         </ScrollView>
//       </View>

//     </View>
//   )
// }

// export default Login

// const styles = StyleSheet.create({})
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  ActivityIndicator
} from 'react-native'
import React, { useState, useEffect } from 'react'
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { useNavigation } from '@react-navigation/native';
const windowHeight = Dimensions.get('window').height;
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/action/Action';


const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const primarycolor = "#066B8C";
  const Whitecolor = "#fff";
  const backgroundcolor = "#003243";
  const black = "#000";
  const [load, setload] = useState(false)
  const [mobile, setmobile] = useState('');
  const [password, setpassword] = useState('');
  const [iserror, setiserror] = useState('')

  const handleSubmit = async () => {
    setload(true)
    try {
      const result = await axios.post(`/v1/login`, {
        mobile: mobile && mobile,
        password: password && password
      });

      if (result.data?.status === false) {
        setload(false)
        setiserror(result.data)
        // ToastAndroid.show({result.data.message}, ToastAndroid.SHORT);
      } else {
        setload(false)
        // Toast();
        // dispatch(addLoginUser(result.data.data));
        dispatch(addToCart(result.data));
           setload(false)
            // Storing login details in AsyncStorage
           await AsyncStorage.setItem('loginDetails', JSON.stringify(result.data.data));
           ToastAndroid.show('Login Successful!', ToastAndroid.SHORT);
       
      }
   
    } catch (error) {
      setload(false)
      console.error("Error during login:", error);
      // ToastAndroid.show("An error occurred during login. Please try again.", ToastAndroid.SHORT);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: primarycolor }}>
      <StatusBar
        animated={true}
        backgroundColor={primarycolor}
        translucent={false}
        barStyle={"light-content"}
      />
      <View style={{ height: "50%" }}>
        <View style={{}}>
          <Image
            source={require("../assets/loginfirst.png")}
            style={{
              height: "100%",
              width: '100%',
            }}
          />
        </View>
      </View>

      <View
        style={{
          backgroundColor: '#fff',
          borderTopStartRadius: 20,
          borderTopEndRadius: 20,
          padding: 10,
          width: '100%',
          height: "50%"
        }}>
        <View style={{ alignItems: "center" }}>
          <View style={{
            backgroundColor: "#fff",
            borderRadius: 150,
            padding: 17,
            position: "absolute",
            bottom: -25
          }}>
            <FontAwesome5
              name="luggage-cart"
              style={{ color: '#0078a8', fontSize: responsiveFontSize(4) }}
            />
          </View>
        </View>
        <View style={{ alignItems: "center", marginTop: 19 }}>
          <Text style={{ color: '#000', fontSize: responsiveFontSize(2.9), fontWeight: "600" }}>
            Login
          </Text>
        </View>

        <ScrollView>
          {/* mobile */}
          <View style={{ marginTop: "3%", alignItems: "center" }}>
            <View style={{ width: "100%", paddingBottom: 5, borderColor: "#fff" }}>
              <View style={{}}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Entypo name="mobile" style={{ color: "#000" }} />
                  <View style={{ paddingLeft: 5 }}>
                    <Text style={{ color: "#000", fontSize: responsiveFontSize(1.8), fontWeight: "500" }}>
                      Mobile
                    </Text>
                  </View>
                </View>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                  justifyContent: 'center',
                  backgroundColor: "#f3f3f3",
                  borderRadius: 10,
                  paddingHorizontal: 3,
                  elevation: 5,
                  marginTop: 5
                }}>
                  <TextInput
                    placeholder="Enter Your Mobile Number *"
                    placeholderTextColor={'#9e9e9e'}
                    onChangeText={value => setmobile(value)}
                    maxLength={10}
                    keyboardType="numeric"
                    style={{
                      flex: 1,
                      color: "#000",
                      fontSize: responsiveFontSize(1.8),
                      paddingLeft: 5,
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
          {iserror && iserror ? (
            <Text style={{ color: 'red', fontSize: responsiveFontSize(1.5), paddingLeft: 5, paddingTop: 5 }}>
              {iserror && iserror.error_message.mobile}
            </Text>
          ) : (
            ''
          )}

          {/* password */}
          <View style={{ marginTop: "4%", alignItems: "center" }}>
            <View style={{ width: "100%", paddingBottom: 5, borderColor: "#fff" }}>
              <View style={{}}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <MaterialIcons name="lock-outline"
                    style={{ color: "#000", fontSize: responsiveFontSize(2.1) }}
                  />
                  <View style={{ paddingLeft: 6 }}>
                    <Text style={{ color: "#000" }}>
                      Enter Password
                    </Text>
                  </View>
                </View>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                  justifyContent: 'center',
                  backgroundColor: "#f3f3f3",
                  borderRadius: 10,
                  paddingHorizontal: 3,
                  elevation: 5,
                  marginTop: 5
                }}>
                  <TextInput
                    placeholder="Enter Your Password *"
                    placeholderTextColor={'#9e9e9e'}
                    onChangeText={value => setpassword(value)}
                    secureTextEntry={true}
                    style={{
                      flex: 1,
                      color: "#000",
                      fontSize: responsiveFontSize(1.8),
                      paddingLeft: 5,
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
          {iserror && iserror ? (
            <Text style={{ color: 'red', fontSize: responsiveFontSize(1.5), paddingLeft: 5, paddingTop: 5, }}>
              {iserror && iserror.error_message.password}
            </Text>
          ) : (
            ''
          )}

          <TouchableOpacity
            onPress={() => handleSubmit()}
            style={{
              borderRadius: 10,
              padding: 10,
              alignItems: 'center',
              backgroundColor: '#003243',
              fontSize: responsiveFontSize(1.8),
              marginTop: "3%",
            }}>

            {
              load && load ?
                <ActivityIndicator size="small" color="#fff" animating={load} />
                :
                <Text
                  style={{
                    color: '#fff',
                    fontSize: responsiveFontSize(2.1),
                    fontWeight: "600"
                  }}>
                  Login
                </Text>

            }
          </TouchableOpacity>
            {iserror && iserror ? (
              <View style={{alignItems:"center",justifyContent:"center"}}>
              <Text style={{ color: 'red', fontSize: responsiveFontSize(1.5), paddingLeft: 5, paddingTop: 5}}>
                {iserror && iserror.message}
              </Text>
              </View>
            ) : (
              ''
            )}
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 5 }}>
            <Text style={{ color: "#000" }}>
              Don't have an account?
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Register")}
              style={{ paddingLeft: 5 }}>
              <Text style={{ color: "#000", textDecorationLine: 'underline', fontSize: responsiveFontSize(1.8), fontWeight: "700" }}>
                REGISTER
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={{ width: "100%", alignItems: "center", marginTop: 10 }}>

            <Text style={{ color: "#000" }}>
              Forgot password?
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  )
}

export default Login;

const styles = StyleSheet.create({});


