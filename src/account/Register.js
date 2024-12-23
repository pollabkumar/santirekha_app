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
import React, { useState } from 'react'
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'

const Register = () => {
  const navigation = useNavigation();
  const primarycolor = "#066B8C";
  const Whitecolor = "#fff";
  const backgroundcolor = "#003243";
  const black = "#000";

  const [name, setname] = useState('')
  const [whatsappnumber, setwhatsappnumber] = useState('')
  const [mobile, setmobile] = useState('')
  const [password, setpassword] = useState('')
  const [pincode, setpincode] = useState('')
  const [rationcardno, setrationcardno] = useState('')
  const [iserror, setiserror] = useState('')
  const [load, setload] = useState(false)

  const handleSubmit = async () => {
    try {
      setload(true);
      const result = await axios.post('/v1/users', {
        name: name,
        mobile: mobile,
        password: password,
        wsap_no: whatsappnumber,
        pin: pincode,
        ration_card_no: rationcardno,
      });
      setload(false);

      if (result.data?.status === false) {
        setiserror(result.data.error_message)
      } else {
        Toast();
        navigation.navigate("Login");
      }
      console.log(typeof(result.data.status), 'registration data');

    } catch (error) {
      setload(false);
      console.error("Error during registration:", error);
      setiserror("An error occurred during registration. Please try again.");
    }
  };

  // const handleSubmit = async () => {
  //   try {
  //     const result = await axios.post(`/v1/users`, {
  //       name: name && name,
  //       mobile: mobile && mobile,
  //       password: password && password,
  //       wsap_no: whatsappnumber && whatsappnumber,
  //       pin: pincode && pincode,
  //       ration_card_no: rationcardno && rationcardno,
  //     });
  //     setload(false)


  //     if (result.data?.status == "false") {
  //       setiserror(result.data.error_message)
  //     }else {
  //       setload(false)
  //       Toast();
  //       navigation.navigate("Login")
  //     }
  //     console.log(result, 'registrtion data');

  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleSubmit = async () => {
  //   console.log("pincode")
  //   setload(true);
  //   try {
  //     const result = await axios.post(`/v1/users`, {
  //       name: name && name,
  //       mobile: mobile && mobile,
  //       password: password && password,
  //       wsap_no: whatsappnumber && whatsappnumber,
  //       pin: pincode && pincode,
  //       ration_card_no: rationcardno && rationcardno,
  //     });
  //     setload(false);
  //     if (result.data.error_code == "true") {
  //       setiserror(result.data.error_message)
  //     }
  //     // else {
  //     //   Toast();
  //     //   navigation.navigate("Login");
  //     // }

  //   } catch (error) {
  //     setload(false);
  //     console.error("Error during registration:", error);
  //     setiserror("An error occurred during registration. Please try again.");
  //   }
  // };


  const Toast = () => {
    ToastAndroid.showWithGravityAndOffset(
      'User added successfully !!',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,

    );
  };

  // console.log("pincode", pincode && pincode)
  return (
    <View style={{ flex: 1, backgroundColor: primarycolor }}>
      <StatusBar
        animated={true}
        backgroundColor={primarycolor}
        translucent={false}
        barStyle={"light-content"}
      />
      <ScrollView>
        <View style={{ height: "15%", justifyContent: "space-between", flexDirection: "row", alignItems: "center" }}>
          <View style={{ height: "80%", width: "20%", paddingTop: 10 }}>
            <Image
              source={require("../assets/Newfolder/11.png")}
              style={{ height: 124, width: 124 }}
            />
          </View>

          <View style={{ height: "80%" }}>
            <Image
              source={require("../assets/Newfolder/1212.png")}
              style={{ height: 140, width: 150 }}
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
            height: "85%"


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

          <View style={{ alignItems: "center", marginTop: 17 }}>
            <Text style={{ color: '#000', fontSize: responsiveFontSize(2.9), fontWeight: "600" }}>
              Sign Up
            </Text>

            <Text style={{ color: '#535353', fontSize: responsiveFontSize(1.8) }}>
              Get Started and grab yours best offers at Groceries
            </Text>
          </View>

          {/* Name */}
          <View style={{ marginTop: 17, alignItems: "center" }}>
            <View style={{ width: "100%", paddingBottom: 5, borderColor: "#fff", }}>
              <View style={{}}>
                <View style={{ paddingLeft: 5 }}>
                  <Text style={{ color: "#000", fontSize: responsiveFontSize(1.9), fontWeight: "500" }}>
                    Name
                  </Text>
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
                    placeholder="Enter Your name *"
                    placeholderTextColor={'#535353'}
                    onChangeText={value => setname(value)}
                    style={{
                      flex: 1,
                      color: "#535353",
                      fontSize: responsiveFontSize(1.8),
                      paddingLeft: 5,
                    }}
                  />
                </View>
                <View>
                  <View>

                    {iserror && iserror ? (
                      <Text style={{ color: 'red', fontSize: responsiveFontSize(1.5), paddingLeft: 5, paddingTop: 5 }}>
                        {iserror && iserror.name}
                      </Text>
                    ) : (
                      ''
                    )}
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* mobile */}
          <View style={{ marginTop: 5, alignItems: "center" }}>
            <View style={{ width: "100%", paddingBottom: 5, borderColor: "#fff", }}>
              <View style={{}}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>

                  <View style={{ paddingLeft: 5 }}>
                    <Text style={{ color: "#000", fontSize: responsiveFontSize(1.9), fontWeight: "500" }}>
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
                    placeholderTextColor={'#535353'}
                    maxLength={10}
                    keyboardType="numeric"
                    onChangeText={value => setmobile(value)}
                    style={{
                      flex: 1,
                      color: "#535353",
                      fontSize: responsiveFontSize(1.8),
                      paddingLeft: 5,
                    }}
                  />
                </View>

                {iserror && iserror ? (
                  <Text style={{ color: 'red', fontSize: responsiveFontSize(1.5), paddingLeft: 5, paddingTop: 5 }}>
                    {iserror && iserror.mobile}
                  </Text>
                ) : (
                  ''
                )}
              </View>
            </View>
          </View>

          {/* whatsappnumber */}
          <View style={{ marginTop: 5, alignItems: "center" }}>
            <View style={{ width: "100%", paddingBottom: 5, borderColor: "#fff", }}>
              <View style={{}}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={{ paddingLeft: 6 }}>
                    <Text style={{ color: "#000", fontSize: responsiveFontSize(1.9), fontWeight: "500" }}>
                      Whatsapp Number
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
                    placeholder="Enter Your Whatsapp Number *"
                    placeholderTextColor={'#535353'}
                    onChangeText={value => setwhatsappnumber(value)}
                     maxLength={10}
                    keyboardType="numeric"
                    style={{
                      flex: 1,
                      color: "#535353",
                      fontSize: responsiveFontSize(1.8),
                      paddingLeft: 5,
                    }}
                  />
                </View>

                {iserror && iserror ? (
                  <Text style={{ color: 'red', fontSize: responsiveFontSize(1.5), paddingLeft: 5, paddingTop: 5 }}>
                    {iserror && iserror.wsap_no}
                  </Text>
                ) : (
                  ''
                )}
              </View>
            </View>
          </View>

          {/* Password */}
          <View style={{ marginTop: 5, alignItems: "center" }}>
            <View style={{ width: "100%", paddingBottom: 5, borderColor: "#fff", }}>
              <View style={{}}>
                <View style={{}}>

                  <View style={{ paddingLeft: 5 }}>
                    <Text style={{ color: "#000", fontSize: responsiveFontSize(1.9), fontWeight: "500" }}>
                      Password
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
                    placeholder="Create Your Password *"
                    placeholderTextColor={'#535353'}
                    onChangeText={value => setpassword(value)}
                    style={{
                      flex: 1,
                      color: "#535353",
                      fontSize: responsiveFontSize(1.8),
                      paddingLeft: 5,
                    }}
                  />
                </View>

                {iserror && iserror ? (
                  <Text style={{ color: 'red', fontSize: responsiveFontSize(1.5), paddingLeft: 5, paddingTop: 5 }}>
                    {iserror && iserror.password}
                  </Text>
                ) : (
                  ''
                )}
              </View>
            </View>
          </View>


          {/* PIN CODE  */}
          <View style={{ marginTop: 5, alignItems: "center" }}>
            <View style={{ width: "100%", paddingBottom: 5, borderColor: "#fff", }}>
              <View style={{}}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>

                  <View style={{ paddingLeft: 5 }}>
                    <Text style={{ color: "#000", fontSize: responsiveFontSize(1.9), fontWeight: "500" }}>
                      Pin Code
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
                    placeholder="Enter Your Pin Code *"
                    placeholderTextColor={'#535353'}
                    onChangeText={value => setpincode(value)}
                    // maxLength={10}
                    keyboardType="numeric"
                    style={{
                      flex: 1,
                      color: "#535353",
                      fontSize: responsiveFontSize(1.8),
                      paddingLeft: 5,
                    }}
                  />
                </View>

                {iserror && iserror ? (
                  <Text style={{ color: 'red', fontSize: responsiveFontSize(1.5), paddingLeft: 5, paddingTop: 5 }}>
                    {iserror && iserror.pin}
                  </Text>
                ) : (
                  ''
                )}
              </View>
            </View>
          </View>

          {/* Ration card Number (Option) */}
          <View style={{ marginTop: "5%", alignItems: "center" }}>
            <View style={{ width: "100%", paddingBottom: 5, borderColor: "#fff", }}>
              <View style={{}}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>

                  <View style={{ paddingLeft: 6 }}>
                    <Text style={{ color: "#000", fontSize: responsiveFontSize(2), fontWeight: "500" }}>
                      Enter Ration card Number (Option)
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
                    placeholder="Enter Your Ration card Number"
                    placeholderTextColor={'#535353'}
                    onChangeText={value => setrationcardno(value)}
                    // maxLength={10}
                    keyboardType="numeric"
                    style={{
                      flex: 1,
                      color: "#535353",
                      fontSize: responsiveFontSize(1.8),
                      paddingLeft: 5,
                    }}
                  />
                </View>
              </View>
            </View>
          </View>




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
                <ActivityIndicator
                  // style={{ position: "absolute", top: 2 }}
                  size="small" color="#fff" /> :
                <Text
                  style={{
                    color: '#fff',
                    fontSize: responsiveFontSize(2.1),
                    fontWeight: "600"
                  }}>
                  REGISTER
                </Text>
            }
          </TouchableOpacity>

          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 5 }}>
            <View style={{}}>
              <Text style={{ color: "#000" }}>
                Already have account?
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              style={{ paddingLeft: 5 }}>
              <Text style={{ color: "#000", textDecorationLine: 'underline', fontSize: responsiveFontSize(1.9), fontWeight: "700" }}>
                Login
              </Text>
            </TouchableOpacity>

          </View>

        </View>
      </ScrollView>
    </View>
  );
}

export default Register

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: "#f3f3f3",
    borderRadius: 10,
    paddingHorizontal: 3,
    elevation: 5,
    marginTop: 5,
  },
  textInput: {
    flex: 1,
    color: "#9e9e9e",
    fontSize: responsiveFontSize(1.8),
    paddingLeft: 5,
  },
  icon: {
    color: "#000",
    fontSize: responsiveFontSize(2.5),
    paddingRight: 5,
  }
});
