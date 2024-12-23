
import { StyleSheet } from 'react-native';
import SplashScreen from '../account/SplashScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../account/Login';
import Register from '../account/Register';

const Authnav = () => {
  const Stack = createNativeStackNavigator();
  return (
    
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
 
  )
}

export default Authnav

const styles = StyleSheet.create({})