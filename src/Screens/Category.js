

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, StatusBar, ActivityIndicator } from 'react-native';
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();
  const primaryColor = "#066B8C";
  const [isLoading, setIsLoading] = useState(false);
  const [anotherload, setanotherload] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const loginDetails = await AsyncStorage.getItem('loginDetails');
        const modifiedUser = JSON.parse(loginDetails);
        axios.defaults.headers.common['Authorization'] = `Bearer ${modifiedUser.token}`;
        const response = await axios.get(`/v1/lookup`);
        setCategories(response.data.data.categories);
        setanotherload(false)
        setSelectedCategory(response.data.data.categories[0]); // Set default selected category
      } catch (error) {
        setanotherload(false)
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!selectedCategory) return;
      setIsLoading(true);
      try {
        const response = await axios.get(`/v1/products?category_id=${selectedCategory.id}&per_page=6`);
        setProducts(response.data.data.data);
        setIsLoading(false);
        setanotherload(false)
      } catch (error) {
        setIsLoading(false);
        setanotherload(false)
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.categoryItem, selectedCategory?.id === item.id && styles.selectedCategoryItem]}
      onPress={() => setSelectedCategory(item)}
    >
      <Image source={{ uri: item.image }} style={{ height: 68, width: 68 }} resizeMode="stretch" />
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );


  const renderProductGrid = ({ item }) => (
    <View style={styles.productRow}>
      {item.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.productItem}
          onPress={() => navigation.navigate("ProductDetails", { DetailProduct: item })}
        >
          <Image source={{ uri: item.thumb_image }} style={{ height: 60, width: 60 }} resizeMode="contain" />
          <View style={{ paddingHorizontal: 10 }}>
            <Text style={styles.productText}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );



  const formatData = (data, numColumns) => {
    const formattedData = [];
    for (let i = 0; i < data.length; i += numColumns) {
      formattedData.push(data.slice(i, i + numColumns));
    }
    return formattedData;
  };

  // Filter the products to only show the ones that match the selected category
  const filteredProducts = products.filter(product => product.category.name === selectedCategory.name);

  return (
    <View style={{ flex: 1, backgroundColor: '#003243' }}>
      <StatusBar animated={true} backgroundColor={primaryColor} translucent={false} barStyle={"light-content"} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All Categories</Text>
      </View>
      {
        anotherload?
        <View style={{  flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#003243',}}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>Please wait...</Text>
      </View>:

      <View style={styles.container}>

        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.categoryList}
          contentContainerStyle={[styles.categoryListContent, { paddingBottom: 50 }]} // Added paddingBottom here
          showsVerticalScrollIndicator={true} // Ensure the scroll indicator shows
        />

        <View style={styles.productList}>
          {isLoading ? (
            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#003243',
              paddingBottom: 150,
            }}>
              <ActivityIndicator size="small" color="#fff" />
              <Text style={{ color: '#fff',fontSize: responsiveFontSize(2) }}>Please wait...</Text>
            </View>
          ) : filteredProducts.length === 0 ? (
            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#003243',
              paddingBottom: 150,
            }}>
              <Image
                source={require("../assets/Newfolder/cart.png")}
                style={{ width: 120, height: 120 }}
              />
              <Text style={{
                fontSize: responsiveFontSize(2),
                color: '#fff',
                fontWeight: '500',
              }}>No product available</Text>
            </View>
          ) : (
            <FlatList
              data={formatData(filteredProducts, 2)}
              renderItem={renderProductGrid}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>

      </View>
      }


      {/* <TabBar /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    backgroundColor: "#066B8C",
    paddingHorizontal: 19,
    flexDirection: "row",
    alignItems: "center",
    height: 45,
  },
  backIcon: {
    fontSize: responsiveFontSize(2.2),
    color: "#fff",
  },
  headerTitle: {
    fontSize: responsiveFontSize(2.2),
    color: "#fff",
    paddingLeft: 5,
    fontWeight: "600",
  },
  container: {
    flexDirection: 'row',
    backgroundColor: '#003243',
  },
  categoryList: {
    width: '35%',
  },
  categoryListContent: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderTopLeftRadius: 5,
  },
  productList: {
    width: '65%',
    backgroundColor: '#003243',
  },
  categoryItem: {
    padding: 10,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: '#b4b4b4',
  },
  selectedCategoryItem: {
    backgroundColor: '#003243',
  },
  categoryText: {
    fontSize: responsiveFontSize(1.8),
    color: "#fff",
    fontWeight: "600",
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  productItem: {
    width: '45%',
    alignItems: 'center',
    marginVertical: 10,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  productText: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: "500",
    color:"#fff"
  },
});

export default Category;

















