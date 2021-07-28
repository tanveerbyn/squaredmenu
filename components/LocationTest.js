import React, { Component } from 'react';
import { Text, View, ActivityIndicator, Button,StyleSheet,Dimensions, TouchableOpacity } from 'react-native';
import MapView from "react-native-maps";
import Geolocation from '@react-native-community/geolocation';
import { Image } from 'react-native';
import { strings } from '../locales/i18n';


// Disable yellow box warning messages
console.disableYellowBox = true;

export default class LocationTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      region: {
        latitude: 10,
        longitude: 10,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001
      },
      isMapReady: false,
      marginTop: 1,
      userLocation: "",
      regionChangeProgress: false
    };
  }

  componentWillMount() {
    Geolocation.getCurrentPosition(
      (position) => {
        const region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001
        };
        this.setState({
          region: region,
          loading: false,
          error: null,
        });
      },
      (error) => {
        alert(JSON.stringify(error));
        this.setState({
          error: error.message,
          loading: false
        })
      },
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 5000 },
    );
  }

  onMapReady = () => {
    this.setState({ isMapReady: true, marginTop: 0 });
  }

  // Fetch location details as a JOSN from google map API
  fetchAddress = () => {
    fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + this.state.region.latitude + "," + this.state.region.longitude + "&key=" + "AIzaSyBsqmLSVPGVmlSVcVmrLY_ynqvMLRUyeZU")
      .then((response) => response.json())
      .then((responseJson) => {
        const userLocation = responseJson.results[0].formatted_address;
        this.setState({
          userLocation: userLocation,
          regionChangeProgress: false
        });
      });
  }

  // Update state on region change
  onRegionChange = region => {
    this.setState({
      region,
      regionChangeProgress: true
    }, () => this.fetchAddress());
  }

  // Action to be taken after select location button click
  onLocationSelect = () => {
    console.log(this.state);
    // alert(this.state.userLocation);
    this.props.setLatLong(this.state.region.latitude,this.state.region.longitude, this.state.userLocation)
  }
  render() {
    if (this.state.loading) {
      return (
        <View style={styles.spinnerView}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.back}>
              <TouchableOpacity onPress={this.props.closeMap}>
                <Image
                  source={require('../assets/images/topbar/back.png')}
                  style={styles.button_image}
                  
                />
              </TouchableOpacity>
            </View>
          <View style={{ flex: 2 }}>
            {!!this.state.region.latitude && !!this.state.region.longitude &&
              <MapView
                style={{ ...styles.map, marginTop: this.state.marginTop }}
                initialRegion={this.state.region}
                showsUserLocation={true}
                onMapReady={this.onMapReady}
                onRegionChangeComplete={this.onRegionChange}
              >
                <MapView.Marker
                  coordinate={{ "latitude": this.state.region.latitude, "longitude": this.state.region.longitude }}
                  title={"Your Location"}
                  draggable
                />
              </MapView>
            }

          </View>
          <View style={styles.deatilSection}>
            <Text style={{ fontSize: 16, fontWeight: "bold", fontFamily: "Poppins Medium", marginBottom: 20 }}>{strings("Move the map for location") }</Text>
            <Text style={{ fontSize: 10, color: "#999" }}>{strings("LOCATION")}</Text>
            <Text numberOfLines={2} style={{ fontSize: 14, paddingVertical: 10, borderBottomColor: "silver", borderBottomWidth: 0.5 }}>
              {!this.state.regionChangeProgress ? this.state.userLocation : "Identifying Location..."}</Text>
            <View style={styles.btnContainer}>
              <Button
                title={strings("PICK THIS LOCATION")}
                disabled={this.state.regionChangeProgress}
                onPress={this.onLocationSelect}
                color='#635CC9'
              >
              </Button>
            </View>
          </View>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    display: "flex",
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width
  },
  back:{
    position: 'absolute',
    top: 15,
    left:15,
    backgroundColor: '#635CC9',
    borderRadius: 10,
    zIndex: 1000
  },
  button_image: {
    height: 42,
    width: 42,
  },
  map: {
    flex: 1
  },
  mapMarkerContainer: {
    left: '47%',
    position: 'absolute',
    top: '42%'
  },
  mapMarker: {
    fontSize: 40,
    color: "red"
  },
  deatilSection: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    display: "flex",
    justifyContent: "flex-start"
  },
  spinnerView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  btnContainer: {
    width: Dimensions.get("window").width - 20,
    position: "absolute",
    bottom: 100,
    left: 10
  }
});