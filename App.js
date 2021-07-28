/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React ,{useEffect} from 'react';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore, persistReducer } from 'redux-persist'
import thunk from 'redux-thunk';


import authReducer from './store/reducers/authReducer'

import AsyncStorage from '@react-native-async-storage/async-storage';
import type {Node} from 'react';
import SplashScreen from 'react-native-splash-screen';

import 'react-native-gesture-handler';
import{Call_Notification} from './screens/Notification'





import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


// Screens
import Navigator from './Navigator';




const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const rootReducer = combineReducers({
    auth: authReducer,
  })
  
  const persistConfig = {
    key: 'squaredmenu',
    storage:AsyncStorage,
  }
  const persistedReducer = persistReducer(persistConfig, rootReducer)
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)))
  let persistor = persistStore(store)
  console.log("persiistor", store.getState())
  useEffect(() => {
    SplashScreen.hide()
    Call_Notification()
    
  }, [])
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    
    <Provider store={store}>
      <PersistGate loading={true} persistor={persistor}>
        <Navigator/>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '100',
    fontFamily:'Poppins Light Italic'
  },
});

export default App;
