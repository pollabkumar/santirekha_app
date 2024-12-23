import { Image, StyleSheet, Text, View, StatusBar, ScrollView, FlatList, TextInput, TouchableOpacity } from 'react-native';
import React, { useMemo, useEffect, useState } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { responsiveFontSize } from "react-native-responsive-dimensions";
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/dist/FontAwesome6';

const CouponsPage = () => {
  const navigation = useNavigation();
  const primarycolor = "#066B8C";
  const zomatoRed = "#003243";
  const backgroundcolor = "#003243";
  const [selectedId, setSelectedId] = useState(null);

  const data = [
    {
      id: 1,
      name: "XYZABCD",
      value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor i"
    },
    {
      id: 2,
      name: "XYZABCD",
      value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor i"
    },
    {
      id: 3,
      name: "XYZABCD",
      value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor i"
    },
  ];

  const handlePress = (id) => {
    setSelectedId(id);
  };
  return (
    <View style={{ flex: 1, backgroundColor: backgroundcolor }}>
      <StatusBar
        animated={true}
        backgroundColor={primarycolor}
        translucent={false}
        barStyle={"light-content"}
      />
      <View style={{
        width: "100%",
        backgroundColor: primarycolor,
        paddingHorizontal: 19,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 5,
        height: 45,
      }}>
        <View
          style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
          >
            <AntDesign name="arrowleft"
              style={{ fontSize: responsiveFontSize(2.2), color: "#fff" }}
            />
          </TouchableOpacity>
          <Text style={{ fontSize: responsiveFontSize(2.2), color: "#fff", paddingLeft: 5, fontWeight: "600" }}>Coupons</Text>
        </View>
        <TouchableOpacity style={{}}>
          <AntDesign
            style={{ fontSize: responsiveFontSize(2.5) }}
            name="hearto" />
        </TouchableOpacity>

      </View>

      {/* search */}
      <View style={{ marginHorizontal: 8, marginTop: 10 }}>
        <View style={{ width: "100%", paddingLeft: 2 }}>
          <View style={{ width: "100%", }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'rgba(166, 166, 166, 0.6)',
              borderRadius: 6,
              paddingHorizontal: 8,
              width: "100%",
              alignSelf: "center",

            }}>
              <TextInput
                placeholder="Enter Coupon Code"
                placeholderTextColor="#fff"
                style={{
                  flex: 1,
                  fontSize: responsiveFontSize(2),
                  color: "#fff",
                  paddingVertical: 5,
                  fontWeight: "400",
                  width: "90%",
                }}
              />
              <TouchableOpacity style={{
                borderRadius: 4,
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 8,
                marginLeft: 3,
                backgroundColor: primarycolor,
                paddingVertical: 5
              }}>
                <Text style={{ fontSize: responsiveFontSize(1.6), }}>
                  Check
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <View style={{ paddingHorizontal: 10, width: "100%", marginTop: 5 }}>
        {
          data.map((item) => {
            const isSelected = item.id === selectedId;
            return (
              <TouchableOpacity
                key={item.id}
                style={{
                  flexDirection: "row",
                  backgroundColor: isSelected ? "#a9b9bf" : 'rgba(166, 166, 166, 0.6)',
                  marginBottom: 10,
                  padding: 10,
                  borderRadius: 5
                }}
                onPress={() => handlePress(item.id)}
              >
                <View style={{ width: "9%", alignItems: "center" }}>
                  <MaterialCommunityIcons
                    name={isSelected ? "checkbox-marked-outline" : "checkbox-blank-outline"}
                    style={{
                      color: backgroundcolor,
                      fontSize: responsiveFontSize(3)
                    }}
                  />
                </View>

                <View style={{ width: "91%", }}>
                  <View style={{
                    backgroundColor: primarycolor,
                    width: "50%",
                    paddingVertical: 5,
                    borderRadius: 5
                  }}>
                    <Text style={{
                      color: isSelected ? '#eff2f3' : "#eff2f3",
                      paddingLeft: 9,
                      fontSize: responsiveFontSize(1.9),

                    }}>{item.name}</Text>

                  </View>
                  <Text style={{ color: isSelected ? '#003243' : "#003243", paddingLeft: 9, fontSize: responsiveFontSize(1.9) }}>{item.value}</Text>
                </View>
              </TouchableOpacity>
            )
          })
        }
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#D9D9D9",
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderTopWidth: 0.5,
          borderColor: "grey",
          position: "absolute",
          bottom: 0,
          width: "100%"

        }}>
        <View style={{}}>

          <View style={{ flexDirection: "row", alignItems: "center", }}>
            <FontAwesome6
              style={{
                fontSize: responsiveFontSize(1.6),
                color: "#000",

              }} name="indian-rupee-sign" />
            <Text
              style={{
                fontSize: responsiveFontSize(1.8),
                color: "#000",
                paddingLeft: 2,
                fontWeight: "500"
              }}>
              50
            </Text>
          </View>

          <View style={{}}>
            <Text style={{ fontSize: responsiveFontSize(1.8), color: "#000", fontWeight: "500" }}>
              Maximum Savings
            </Text>
          </View>
        </View>

        {/* last */}

        <TouchableOpacity
        onPress={()=>navigation.navigate("CartPage")}
          style={{
            flexDirection: "row",
            backgroundColor: primarycolor,
            alignItems: "center",
            paddingHorizontal: 19,
            paddingVertical: 5,
            borderRadius: 5
          }}>
          <Text style={{ fontSize: responsiveFontSize(1.8), color: "#fff", fontWeight: "500" }}>
            APPLY
          </Text>

        </TouchableOpacity>
      </View>

    </View>
  )
}

export default CouponsPage;

const styles = StyleSheet.create({});




