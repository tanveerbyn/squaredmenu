import { Image } from 'native-base';
import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native';
import { Text, StyleSheet, View } from 'react-native'
import MapView from 'react-native-maps';

export default class Map extends Component {
    getInitialState() {
        return {
          region: {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
        };
      }
       
      onRegionChange(region) {
        this.setState({ region });
      }
       
      render() {
        return (
          <View>
            
          <MapView
            region={this.state.region}
            onRegionChange={this.onRegionChange}
          />
          </View>
        );
      }
}

const styles = StyleSheet.create({
  back:{
    position: 'absolute',
    backgroundColor: '#fff'
  },
  button_image: {
    height: 42,
    width: 42,
  },
})

