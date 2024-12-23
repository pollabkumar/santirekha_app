import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../account/Login';
import SplashScreen from '../account/SplashScreen';
import Register from '../account/Register';


const AstrologerNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    // <NavigationContainer>
    <Stack.Navigator screenOptions={{
      headerShown: false}}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
    // </NavigationContainer>
  )
}

export default AstrologerNavigator

const styles = StyleSheet.create({})