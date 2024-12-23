import React,{useEffect} from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { useNavigation } from '@react-navigation/native';
const App = () => {
  const navigation=useNavigation()
  useEffect(()=>{
    setTimeout(()=>{
     navigation.navigate("Login")    
    },2000)
  })
  return (
    <LinearGradient
      colors={['#0078a8', '#003243']}
      style={styles.linearGradient}
    >
      <StatusBar
        animated={true}
        backgroundColor="transparent"
        translucent
      />
  
      <View style={styles.container}>
        <View style={{backgroundColor:"#fff",borderRadius:150,padding:15,}}>
        <FontAwesome5 
          name="luggage-cart"
          style={{color:'#0078a8',fontSize:responsiveFontSize(4)}}
        />

        </View>
        <Text style={styles.text}>Santirekha</Text>
        <Text style={styles.subtext}>ONLINE STORE</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize:responsiveFontSize(4.5),
    fontWeight: 'bold',
  },
  subtext: {
    color: 'white',
    fontSize:responsiveFontSize(2),
    
  },
});

export default App;
