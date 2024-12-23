import { StyleSheet, Text, View, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Guestnavigation from './Guestnavigation';
import Authnavigation from './Authnavigation';
import { addLoginUser } from '../redux/LoginSlice';

axios.defaults.baseURL = 'https://santi.3decolutions.com/shantirekha/backend/public/api';

const StackNavigator = () => {
  const dispatch = useDispatch();
  const result = useSelector((state) => state.loginUser);
  const [isAppLoading, setIsAppLoading] = useState(true); // Handle app loading state

  const Stack = createNativeStackNavigator();

  // Function to check if user is already logged in
  useEffect(() => {
    const loadLoginDetails = async () => {
      try {
        const storedLoginDetails = await AsyncStorage.getItem('loginDetails');
        if (storedLoginDetails) {
          dispatch(addLoginUser(JSON.parse(storedLoginDetails))); // Dispatch login details to Redux
        }
      } catch (error) {
        Alert.alert(error.message);
      } finally {
        setIsAppLoading(false); // End loading state
      }
    };

    loadLoginDetails();
  }, [dispatch]);

  // Fallback to ensure the app doesn't stay in loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAppLoading(false);
    }, 1500); // Adjust delay if needed

    return () => clearTimeout(timer);
  }, []);

  if (isAppLoading) {
    return (
      <NavigationContainer>
        <Authnavigation initialRoute="SplashScreen" /> 
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      {result.data?.token ? <Guestnavigation /> : <Authnavigation initialRoute="Login" />}
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
