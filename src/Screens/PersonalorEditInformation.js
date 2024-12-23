
import {
  StyleSheet,
  TouchableOpacity,
  View,
  StatusBar,
  Text,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
const PersonalorEditinformation = () => {
  const navigation = useNavigation();
  const primarycolor = '#066B8C';
  const loginDetails = useSelector(state => state.login);
  const [userDetails, setuserDetails] = useState('');
  const [loading, setLoading] = useState(true);

  const data = async () => {
    try {
      let mr = await AsyncStorage.getItem('loginDetails');
      const modifiedUser = JSON.parse(mr);
      console.log('modifiedUserrrrr', modifiedUser.token);
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${modifiedUser.token}`;
      const response = await axios.get(`/v1/users/${modifiedUser.id}`);
      setuserDetails(response.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    data();
  }, []);

  // console.log('userDetailsuserDetails', userDetails && userDetails);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar animated={true} backgroundColor={primarycolor} />
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft"
            style={{ fontSize: responsiveFontSize(2.2), color: "#fff",  }}
          />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerText}>User Personal Details</Text>
        </View>
        <View>
                  
                  </View>
      </View>

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#ffffff" />
          <Text>Please wait</Text>
        </View>
      ) : (
        <>

          <View style={styles.detailContainer}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{userDetails && userDetails.name}</Text>
          </View>

          <View style={styles.detailContainer}>
            <Text style={styles.label}>Mobile Number:</Text>
            <Text style={styles.value}>{userDetails && userDetails.mobile}</Text>
          </View>

          <View style={styles.detailContainer}>
            <Text style={styles.label}>WhatsApp Number:</Text>
            <Text style={styles.value}>{userDetails && userDetails.wsap_no}</Text>
          </View>

          <View style={styles.detailContainer}>
            <Text style={styles.label}>Ration Card:</Text>
            <Text style={styles.value}>{userDetails && userDetails.ration_card_no}</Text>
          </View>

          <View style={styles.detailContainer}>
            <Text style={styles.label}>PIN Number:</Text>
            <Text style={styles.value}>{userDetails && userDetails.pin_code}</Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("EditUserProfile")}
            style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Details</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    backgroundColor: '#066B8C', // Main background color
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff', // White text for the header
  },
  detailContainer: {
    backgroundColor: '#fff', // White background for each detail container
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5, // For Android shadow effect
  },
  label: {
    fontSize: responsiveFontSize(2.3),
    color: '#066B8C', // Primary color for the label
    fontWeight: 'bold',
  },
  value: {
    fontSize: responsiveFontSize(2.5),
    color: '#000', // Black text for value
    marginTop: 5,
  },
  editButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  editButtonText: {
    color: '#066B8C', // Primary color for button text
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PersonalorEditinformation;

