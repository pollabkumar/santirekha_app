import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Deshboard from '../tabbarscreens/Deshboard';
import Login from '../account/Login';
import Register from '../account/Register';
import Account from '../tabbarscreens/Account';
import Wallet from '../Screens/Wallet';
import OrderPage from '../Screens/OrderPage';
import OrderDetails from '../Screens/OrderDetails';
import CategoriProductList from '../Screens/CategoryProductList';
import ProductDetails from '../Screens/ProductDetails';
import CouponsPage from '../Screens/CouponsPage';
import NewAddress from '../Screens/NewAddress';
import CartPage from '../Screens/CartPage';
import Category from '../Screens/Category';
import PaymentGatway from '../Screens/PaymentGatway';
import WistList from '../Screens/WistList';
import ResetPaasword from '../Screens/ResetPaasword';
import PersonalorEditinformation from "../Screens/PersonalorEditInformation";
import EarningsandCashbacks from '../Screens/EarningsandCashbacks';
import Address from '../Screens/Address';
import ThankYouPage from '../Screens/ThankYouPage';
import WalletHistory from '../Screens/WalletHistory';
import TermAndCondition from '../Screens/TermAndCondition';
import Practise from '../Screens/Practise';
import PaymentOption from '../Screens/PaymentOption';
import Enquiry from '../Screens/Enquiry';
import EditUserProfile from '../Screens/EditUserProfile';
import EditAddress from '../Screens/EditAddress';
const Gustnav = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name="Deshboard" component={Deshboard} />
      <Stack.Screen name="OrderPage" component={OrderPage} />
      <Stack.Screen name="OrderDetails" component={OrderDetails} />
      <Stack.Screen name="Address" component={Address} />
      <Stack.Screen name="EditAddress" component={EditAddress} />
      <Stack.Screen name="NewAddress" component={NewAddress} />
      <Stack.Screen name="ResetPaasword" component={ResetPaasword} />
      <Stack.Screen name="EditUserProfile" component={EditUserProfile} />
      <Stack.Screen name="PersonalorEditinformation" component={PersonalorEditinformation} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="PaymentOption" component={PaymentOption} />
      <Stack.Screen name="Enquiry" component={Enquiry} />
      <Stack.Screen name="WalletHistory" component={WalletHistory} />
      <Stack.Screen name="Wallet" component={Wallet} />
      <Stack.Screen name="Practise" component={Practise} />
      <Stack.Screen name="TermAndCondition" component={TermAndCondition} />
      <Stack.Screen name="ThankYouPage" component={ThankYouPage} />
      <Stack.Screen name="CouponsPage" component={CouponsPage} />
      <Stack.Screen name="EarningsandCashbacks" component={EarningsandCashbacks} />
      <Stack.Screen name="CartPage" component={CartPage} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="WistList" component={WistList} />
      <Stack.Screen name="CategoriProductList" component={CategoriProductList} />
      <Stack.Screen name="Category" component={Category} />
      <Stack.Screen name="PaymentGatway" component={PaymentGatway} />
    </Stack.Navigator>
  );
}

export default Gustnav;


