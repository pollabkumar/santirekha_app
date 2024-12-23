import {
  StyleSheet,
  TouchableOpacity,
  View,
  StatusBar,
  Text,
  Image,
  RefreshControl,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { responsiveFontSize } from "react-native-responsive-dimensions";
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Modal from 'react-native-modal';

const Address = () => {
  const navigation = useNavigation();
  const primarycolor = "#066B8C";
  const [loader, setLoader] = useState(false);
  const [addressList, setAddressList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [savedAddress, setSavedAddress] = useState(null);

  const data = async () => {
    setLoader(true);
    try {
      const savedAddressString = await AsyncStorage.getItem('defaultAddress');
      setSavedAddress(savedAddressString ? JSON.parse(savedAddressString) : null);

      let mr = await AsyncStorage.getItem('loginDetails');
      const modifiedUser = JSON.parse(mr);
      axios.defaults.headers.common['Authorization'] = `Bearer ${modifiedUser.token}`;

      const response = await axios.get(`/v1/user/address`);
      setLoader(false);
      console.log("54545454",response)
      setAddressList(response.data.data);
    } catch (error) {
      setLoader(false);
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    data();
  }, []);

  const onRefresh = () => {
    data();
  };

  const toggleModal = (address) => {
    setSelectedAddress(address);
    setModalVisible(!isModalVisible);
  };

  const handleEdit = () => {
    setModalVisible(false);
    navigation.navigate("EditAddress", { addressid: selectedAddress });
  };

  const handleDelete = async () => {
    setModalVisible(false);
    try {
      let mr = await AsyncStorage.getItem('loginDetails');
      const modifiedUser = JSON.parse(mr);
      axios.defaults.headers.common['Authorization'] = `Bearer ${modifiedUser.token}`;
      
      // Delete address from the server
      await axios.delete(`/v1/user/address/${selectedAddress}`);
  
      // Check if the deleted address is the same as the saved address
      if (savedAddress && savedAddress.id === selectedAddress) {
        // Remove the saved address from AsyncStorage
        await AsyncStorage.removeItem('defaultAddress');
        setSavedAddress(null); // Update the state
      }
  
      data(); // Refresh address list
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };
  

  // const handleSelectAddress = async (item) => {
  //   console.error('pollllllaabbb', item);
  //   try {
  //     setSavedAddress(item); // Update the state
  //     await AsyncStorage.setItem('defaultAddress', JSON.stringify(item)); // Save the selected address in AsyncStorage
  //   } catch (error) {
  //     console.error('Error saving address:', error);
  //   }
  // };

  const handleSelectAddress = async (item) => {
    console.log('123', item); // Log item details for debugging
    try {
      setSavedAddress(item); // Update the saved address in state
      await AsyncStorage.setItem('defaultAddress', JSON.stringify(item)); // Save full address details in AsyncStorage
      console.log('Address saved successfully:', item); // Confirm success
    } catch (error) {
      console.error('321', error);
    }
  };

  const EmptyListMessage = () => (
    <View style={{ paddingTop: "30%" }}>
      <View style={{ alignItems: 'center', justifyContent: "center" }}>
        <Image
          style={{ width: '70%', height: 170, alignItems: 'center', justifyContent: "center" }}
          source={require('../assets/empty.png')}
        />
      </View>
      <View style={{ alignItems: 'center', margin: 10 }}>
        <Text style={{ color: '#000', fontSize: 15, fontWeight: '300' }}>
          No Data Found
        </Text>
      </View>
    </View>
  );

  const isAddressMatching = (item) => {
    if (!savedAddress) return false;
    return item.name === savedAddress.name && item.city === savedAddress.city && item.address === savedAddress.address;
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar
        animated={true}
        backgroundColor={primarycolor}
        translucent={false}
        barStyle={"light-content"}
      />
      <View style={{
        width: "100%",
        backgroundColor: primarycolor,
        paddingHorizontal: 10,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 5,
        height: 45,
      }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" style={{ fontSize: responsiveFontSize(2.2), color: "#fff" }} />
          </TouchableOpacity>
          <Text style={{ fontSize: responsiveFontSize(2), color: "#fff", paddingLeft: 5, fontWeight: "600" }}>
            My Addresses
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("NewAddress")}
        style={{ width: "100%", backgroundColor: "#fff", elevation: 10, paddingHorizontal: 10, paddingVertical: 9 }}>
        <Text style={{ color: "#000", fontSize: responsiveFontSize(2) }}>
          + Add a new Address
        </Text>
      </TouchableOpacity>

      {loader ?
        <View style={{ alignItems:"center",justifyContent:"center"}}>
          <ActivityIndicator size="small" color="#000" animating={loader} />
          <Text style={{ fontSize: 12, color: "#000", fontWeight: "400", }}>Please wait</Text>
        </View> :
        <>
          <FlatList
            data={addressList}
            ListEmptyComponent={EmptyListMessage}
            style={{ flex: 1, marginTop: 10 }}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={['#000']}
              />
            }
            renderItem={({ item }) => {
              console.log("98989898",item)
             return (
                  <TouchableOpacity onPress={() => handleSelectAddress(item)}>
                    <View style={{ marginHorizontal: 10, marginBottom: 10 }}>
                      <View style={{
                        width: "100%",
                        // backgroundColor: isAddressMatching(item) ? 'lightgreen' : "#fff",
                        backgroundColor: "#fff",
                        elevation: 5,
                        paddingHorizontal: 10,
                        paddingVertical: 9
                      }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                          <View>
                            <Text style={{ color: "#000", fontSize: responsiveFontSize(2), fontWeight: "500" }}>{item.name}</Text>
                          </View>
                          <TouchableOpacity
                            style={{
                              paddingHorizontal: 15,
                              alignItems: "center",
                              paddingVertical: 10,
                              position: "absolute",
                              right: 0
                            }}
                            onPress={() => toggleModal(item.id)}>
                            <FontAwesome5
                              style={{ color: "#000", fontSize: responsiveFontSize(1.5), fontWeight: "500" }}
                              name="ellipsis-v"
                            />
                          </TouchableOpacity>
                        </View>
                        <Text style={{ color: "#000", fontSize: responsiveFontSize(1.8), marginTop: 2 }}>
                          {item.address}, {item.landmark}, {item.city}, {item.state}, {item.pin}
                        </Text>
                        <Text style={{ color: "#000", fontSize: responsiveFontSize(1.8), marginTop: 2 }}>{item.mobile}</Text>
                        {isAddressMatching(item) && (
                          <View style={{backgroundColor:primarycolor,
                          marginTop: 5,
                          paddingVertical:3,
                          width:55,
                          alignItems:"center",
                          borderRadius:1
                          }}>
                            <Text style={{ color: "#fff", fontSize: responsiveFontSize(1.3),fontWeight:"300" }}>
                            Selected
                          </Text>
                          </View>
                        )}
                      </View>
                    </View>
                  </TouchableOpacity>
                )
            }}
            // renderItem={({ item }) => (
            //   <TouchableOpacity onPress={() => handleSelectAddress(item)}>
            //     <View style={{ marginHorizontal: 10, marginBottom: 10 }}>
            //       <View style={{
            //         width: "100%",
            //         // backgroundColor: isAddressMatching(item) ? 'lightgreen' : "#fff",
            //         backgroundColor: "#fff",
            //         elevation: 5,
            //         paddingHorizontal: 10,
            //         paddingVertical: 9
            //       }}>
            //         <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            //           <View>
            //             <Text style={{ color: "#000", fontSize: responsiveFontSize(2), fontWeight: "500" }}>{item.name}</Text>
            //           </View>
            //           <TouchableOpacity
            //             style={{
            //               paddingHorizontal: 15,
            //               alignItems: "center",
            //               paddingVertical: 10,
            //               position: "absolute",
            //               right: 0
            //             }}
            //             onPress={() => toggleModal(item.id)}>
            //             <FontAwesome5
            //               style={{ color: "#000", fontSize: responsiveFontSize(1.5), fontWeight: "500" }}
            //               name="ellipsis-v"
            //             />
            //           </TouchableOpacity>
            //         </View>
            //         <Text style={{ color: "#000", fontSize: responsiveFontSize(1.8), marginTop: 2 }}>
            //           {item.address}, {item.landmark}, {item.city}, {item.state}, {item.pin}
            //         </Text>
            //         <Text style={{ color: "#000", fontSize: responsiveFontSize(1.8), marginTop: 2 }}>{item.mobile}</Text>
            //         {isAddressMatching(item) && (
            //           <View style={{backgroundColor:primarycolor,
            //           marginTop: 5,
            //           paddingVertical:3,
            //           width:55,
            //           alignItems:"center",
            //           borderRadius:1
            //           }}>
            //             <Text style={{ color: "#fff", fontSize: responsiveFontSize(1.3),fontWeight:"300" }}>
            //             Selected
            //           </Text>
            //           </View>
            //         )}
            //       </View>
            //     </View>
            //   </TouchableOpacity>
            // )}
          />
          <Modal
            isVisible={isModalVisible}
            onBackdropPress={() => setModalVisible(false)}
            style={styles.modal}
          >
            <View style={styles.modalContent}>
              <TouchableOpacity onPress={handleEdit}
                style={{ flexDirection: "row", alignItems: "center" }}>
                <FontAwesome5
                  style={{ color: "#000", fontSize: responsiveFontSize(1.8), }}
                  name="edit" />
                <Text style={{ color: "#000", fontSize: responsiveFontSize(2), fontWeight: "400", paddingLeft: 5 }}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleDelete}
                style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                <AntDesign
                  style={{ color: "red", fontSize: responsiveFontSize(1.8), }}
                  name="delete" />
                <Text style={{ color: "red", fontSize: responsiveFontSize(2), fontWeight: "400", paddingLeft: 5 }}>Delete</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </>
      }
    </View>
  );
};

export default Address;

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
});




