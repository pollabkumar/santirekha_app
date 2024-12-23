


import { StyleSheet, Text, View, StatusBar,Image } from 'react-native'
import React,{useEffect} from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { useNavigation } from '@react-navigation/native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
const SplashScreen = () => {
  const navigation = useNavigation();
  useEffect(()=>{
    setTimeout(()=>{
     navigation.navigate("Login")    
    },2000)
  })
  return (
    <View style={{flex:1 ,backgroundColor:"#000",alignItems:"center",justifyContent:"center"}}>
      
          </View>

  )
}

export default SplashScreen
const styles = StyleSheet.create({})

// const styles = StyleSheet.create({
//   backgroundImg: {
//   justifyContent:"center",
//     fontSize: 18,
//     fontFamily: 'Gill Sans',
//     textAlign: 'center',
//     margin: 10,
//     color: '#000',
//     backgroundColor: 'transparent',

//   },
// })
// import { Image, StyleSheet, Text, View, StatusBar } from 'react-native'
// import React, { useEffect } from 'react'
// import { useNavigation } from '@react-navigation/native';
// import {
//   responsiveHeight,
//   responsiveWidth,
//   responsiveFontSize
// } from "react-native-responsive-dimensions";
// const SplashScreen = () => {
//   const navigation = useNavigation();
//   // useEffect(()=>{
//   //   setTimeout(()=>{
//   //    navigation.navigate("Login")    
//   //   },2000)
//   // })
//   return (
//     <View style={{ backgroundColor: "#000", flex: 1 }}>
//       <StatusBar hidden={false} backgroundColor="#000" translucent={false} />
//       <View style={{
//         justifyContent: "center",
//         alignItems: "center",
//         height: "100%"
//       }}>
    
//             <Image
//               source={require('../assets/logo.jpg')}
//               style={{
//                 height: 130,
//                 width: 130,
//                 // borderWidth:1,
//                 // borderColor:'#fff',
//                 borderRadius: 80
//               }}
//             />
         

//         <Text style={{ color: "#fff", fontSize: responsiveFontSize(5), fontWeight: "100", fontStyle: 'italic', paddingTop: 0 }}>Athleticaly</Text>
//       </View>

//       {/* <View style={{position:'absolute',bottom:5,alignItems:"center",justifyContent:"center",width:"100%"}}>
//         <Text style={{color:"#fff",fontSize: responsiveFontSize(3),fontWeight:"200",fontStyle: 'italic'}}>Athleticaly</Text>
//     </View> */}

//     </View>
//   )
// }

// export default SplashScreen

// const styles = StyleSheet.create({})