import { StyleSheet, Text, View,BackHandler } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Deshboard from '../tabbarscreens/Deshboard';
import OrderPage from '../Screens/OrderPage';
import OrderDetails from '../Screens/OrderDetails';
import Address from '../Screens/Address';
import EditAddress from '../Screens/EditAddress';
import NewAddress from '../Screens/NewAddress';
import ResetPaasword from '../Screens/ResetPaasword';
import EditUserProfile from '../Screens/EditUserProfile';
import PersonalorEditinformation from '../Screens/PersonalorEditInformation';
import Account from '../tabbarscreens/Account';
import PaymentOption from '../Screens/PaymentOption';
import Enquiry from '../Screens/Enquiry';
import WalletHistory from '../Screens/WalletHistory';
import Wallet from '../Screens/Wallet';
import TermAndCondition from '../Screens/TermAndCondition';
import ThankYouPage from '../Screens/ThankYouPage';
import CouponsPage from '../Screens/CouponsPage';
import EarningsandCashbacks from '../Screens/EarningsandCashbacks';
import CartPage from '../Screens/CartPage';
import ProductDetails from '../Screens/ProductDetails';
import WistList from '../Screens/WistList';
import Category from '../Screens/Category';
import PaymentGatway from '../Screens/PaymentGatway';
import CategoryProductList from '../Screens/CategoryProductList';
const Guestnavigation = () => {
 
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
   
      screenOptions={{
        headerShown: false
      }}>
     
      <Stack.Screen name="Deshboard" component={Deshboard} />
      <Stack.Screen name="WalletHistory" component={WalletHistory} />
      <Stack.Screen name="Wallet" component={Wallet} />
      <Stack.Screen name="OrderPage" component={OrderPage} />
      <Stack.Screen name="OrderDetails" component={OrderDetails} />
      <Stack.Screen name="Address" component={Address} />
      <Stack.Screen name="EditAddress" component={EditAddress} />
      <Stack.Screen name="NewAddress" component={NewAddress} />
      <Stack.Screen name="ResetPaasword" component={ResetPaasword} />
      <Stack.Screen name="EditUserProfile" component={EditUserProfile} />
      <Stack.Screen name="PersonalorEditinformation" component={PersonalorEditinformation} />
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="PaymentOption" component={PaymentOption} />
      <Stack.Screen name="Enquiry" component={Enquiry} />
      <Stack.Screen name="TermAndCondition" component={TermAndCondition} />
      <Stack.Screen name="ThankYouPage" component={ThankYouPage} />
      <Stack.Screen name="CouponsPage" component={CouponsPage} />
      <Stack.Screen name="EarningsandCashbacks" component={EarningsandCashbacks} />
      <Stack.Screen name="CartPage" component={CartPage} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen name="WistList" component={WistList} />
      <Stack.Screen name="CategoryProductList" component={CategoryProductList} />
      <Stack.Screen name="Category" component={Category} />
      <Stack.Screen name="PaymentGatway" component={PaymentGatway} />
       
    </Stack.Navigator>
  );
}

export default Guestnavigation;

const styles = StyleSheet.create({});





































  // useEffect(() => {
  //   // Retrieve the value from AsyncStorage
  //   const fetchAsyncStorageValue = async () => {
  //     try {
  //       const mr = await AsyncStorage.getItem('usertoken');
  //       console.log('mr:', mr); // Log retrieved AsyncStorage value
  //       if (mr !== null) {
  //         const modifiedUser = JSON.parse(mr);
  //         console.log('modifiedUser:', modifiedUser); // Log parsed user data
  //         setModifiedUser1(modifiedUser);
  //       } else {
  //         console.log('No user data found in AsyncStorage');
  //       }
  //     } catch (error) {
  //       console.error('Error retrieving AsyncStorage value:', error);
  //     }
  //   };
  
  //   fetchAsyncStorageValue();
  // }, []);