
import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useSelector } from 'react-redux'
import axios from 'axios'
import Gustnav from './Gustnav';
import Authnav from './Authnav';

axios.defaults.baseURL = 'https://santi.3decolutions.com/shantirekha/backend/public/api';


const StackNavigator = () => {
  const result = useSelector((state) => state.loginUser);
  console.log(result, 'result65hjkjkjkjkjk');
  console.log(result.data?.api_token, 'result.data?.api_token');
  console.log(result.user_type, 'result.result.status');
  console.log(result.access_token, 'Stack11');
  const Stack = createNativeStackNavigator();




  return (
    <NavigationContainer>
      {
        result.error_code == false ? <Gustnav /> : <Authnav /> 
      }
    </NavigationContainer>
  )
}
export default StackNavigator;

const styles = StyleSheet.create({})