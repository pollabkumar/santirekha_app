import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { Provider } from 'react-redux';
import axios from 'axios'
import store from './src/redux/store/Store';
import Stacknav from './src/navv/Stacknav';
import StackNavigator from './src/navigation/Stacknavigation';
// axios.defaults.baseURL = 'https://santi.3decolutions.com/shantirekha/backend/public/api';
const App = () => {
  return (
    <Provider store={store}>
      <StackNavigator/>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})