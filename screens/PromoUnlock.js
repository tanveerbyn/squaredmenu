import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Modal,
  TextInput,
  ImageBackground,
} from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";

const Promounlock = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <ImageBackground
          source={require("../assets/images/icons/promounlock.png")}
          style={styles.banner}
        >
          <View style={{ ...styles.bell, flexDirection: "row" }}>
            <View style={{ width: "15%" }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                  source={require("../assets/images/topbar/back.png")}
                  style={{ height: 42, width: 42 }}
                />
              </TouchableOpacity>
            </View>
            <View style={{ width: "80%", alignItems: "center" }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                  source={require("../assets/images/logoinapp/logoflat.png")}
                  style={{
                    height: 42,
                    width: 140,
                    resizeMode: "contain",
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ ...styles.bell }}>
            <Text numberOfLines={1} style={styles.name}>
              {"Unlock Unlimited Access"}
            </Text>
            <FlatList
              data={[1, 2, 3]}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return (
                  <View style={{ marginTop: 20, marginRight: 15 }}>
                    <Image
                      source={require("../assets/images/icons/goldencard.png")}
                      style={{
                        height: 250,
                        width: 250,
                        resizeMode: "contain",
                      }}
                    />
                  </View>
                );
              }}
            />
          </View>
        </ImageBackground>

        <View style={{ alignItems: "center" }}>
          <View
            style={{
              height: 70,
              width: "80%",
              borderRadius: 17,
              alignItems: "center",
              borderColor: "#635CC9",
              borderWidth: 1,
              paddingHorizontal: 10,
              flexDirection: "row",
              shadowColor: "#000",
              backgroundColor: "white",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.2,
              shadowRadius: 1.41,

              elevation: 2,
            }}
          >
            <Image
              source={require("../assets/images/icons/circle.png")}
              style={{ width: 30, height: 30, resizeMode: "contain" }}
            />
            <View style={{ marginHorizontal: 10 }}>
              <Text
                style={{
                  fontFamily: "Poppins Medium",
                  fontWeight: "bold",
                  fontSize: 17,
                  fontStyle: "normal",
                }}
              >
                $99.99/month
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins Medium",
                  color: "#757575",
                  fontStyle: "normal",
                }}
              >
                promo description here
              </Text>
            </View>
          </View>
        </View>

        <View style={{ alignItems: "center", marginVertical: 10 }}>
          <View
            style={{
              height: 70,
              width: "80%",
              borderRadius: 17,
              alignItems: "center",
              borderColor: "#c5c7c5",
              borderWidth: 1,
              paddingHorizontal: 10,
              flexDirection: "row",
              shadowColor: "#000",
              backgroundColor: "white",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.2,
              shadowRadius: 1.41,

              elevation: 2,
            }}
          >
            <Image
              source={require("../assets/images/icons/empty_circle.png")}
              style={{ width: 30, height: 30, resizeMode: "contain" }}
            />
            <View style={{ marginHorizontal: 10 }}>
              <Text
                style={{
                  fontFamily: "Poppins Medium",
                  fontWeight: "bold",
                  fontSize: 17,
                  fontStyle: "normal",
                }}
              >
                $99.99/month
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins Medium",
                  color: "#757575",
                  fontStyle: "normal",
                }}
              >
                promo description here
              </Text>
            </View>
          </View>
        </View>

        <Text style={{color:"#635CC9", textAlign:'center', marginTop:5, marginBottom:10, fontFamily: "Poppins Medium",fontStyle: "normal", }}>Policy & Terms</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Promounlock;

const styles = StyleSheet.create({
  banner: {
    position: "relative",
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(75),
    marginBottom: 10,
  },
  logoContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: heightPercentageToDP(8.5),
  },
  logo: {},
  bell: {
    position: "absolute",
    top: heightPercentageToDP(5),
    left: widthPercentageToDP(3.5),
    width: "100%",
    //transform: [{ rotate: '180deg' }]
  },
  info: {
    marginTop: heightPercentageToDP(14),
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    flexWrap: "wrap",
    fontFamily: "Poppins Medium",
    fontStyle: "normal",
    fontSize: 23,
    color: "#FFFFFF",

    textTransform: "capitalize",
    top: 60,
  },
  menuName: {
    flexWrap: "wrap",
    fontFamily: "Poppins Medium",
    fontStyle: "normal",
    fontSize: 37,
    color: "#FFFFFF",
    lineHeight: 40,
    textTransform: "capitalize",
  },
});
