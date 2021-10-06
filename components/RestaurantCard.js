import React,{useState} from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import { widthPercentageToDP, heightPercentageToDP } from "react-native-responsive-screen";

const RestaurantCard = ({ navigation, name, data, disable }) => {
    const [show, setShow] = useState(false);
    
    const manage_Table = ()=> {
      setShow(false)
      navigation.navigate("AddArea")
    }
    const edit_Rest = ()=> {
      setShow(false)
      navigation.navigate("EditABusiness", { data: data })
    }

    const Restqr_Options = () => {
        return (
          <View
            style={{
              position: "absolute",
              top: heightPercentageToDP(5.4),
              right: widthPercentageToDP(5.5),
              height:100,
              backgroundColor: "white",
              paddingHorizontal: 15,
              borderRadius: 8,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,
    
              elevation: 3,
            }}
          >
            <TouchableOpacity    onPress={() => manage_Table()} style={{ flexDirection: "row", alignItems: "center",marginVertical:5 }}>
              <Image
                source={require("../assets/images/icons/seat1.png")}
                style={{ height: 25, width: 25, resizeMode: "contain" }}
              />
              <Text
                style={{
                  fontFamily: "Poppins Medium",
                  fontStyle: "normal",
                  marginLeft: 15,
                }}
              >
               Manage Tables
              </Text>
            </TouchableOpacity>
    
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 5,
               
              }}
            >
              <Image
                source={require("../assets/images/tablearea/content-copy.png")}
                style={{ height: 23, width: 23, resizeMode: "contain" }}
              />
              <Text
                style={{
                  fontFamily: "Poppins Medium",
                  fontStyle: "normal",
                  marginLeft: 17,
                }}
              >
                Copy URL
              </Text>
            </TouchableOpacity>

          
            <TouchableOpacity
            onPress={() => edit_Rest()}
              style={{
                flexDirection: "row",
                alignItems: "center",
               
              }}
            >   
              <Image
                source={require("../assets/images/icons/edit_transparent.png")}
                style={{ height: 28, width: 28, resizeMode: "contain" }}
              />
              <TouchableOpacity    onPress={() => edit_Rest()}>
              <Text
                style={{
                  fontFamily: "Poppins Medium",
                  fontStyle: "normal",
                  marginLeft: 12,
                }}
              >
            Edit Restaurant
              </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        );
      };

  return (
    <TouchableOpacity
      disabled={disable}
      style={styles.card}
      onPress={() =>
        navigation.navigate(name, {
          restaurant_id: data.restaurant_id,
          brandImage: data.cover,
          themeURL: data.theme_url,
          public_url: data.public_url,
        })
      }
    >
      <View style={styles.subBox}>
        <FastImage
          style={styles.thumbnail}
          source={{
            uri: data.cover,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
      <View style={styles.info}>
        <View style={styles.parentText}>
          <Text numberOfLines={2} style={styles.name}>
            {data.name}
          </Text>
        </View>
        <View style={styles.parentText}>
          <Text numberOfLines={2} style={styles.address}>
            {data.address}
          </Text>
        </View>
      </View>
      <View style={styles.edit}>
        <TouchableOpacity onPress={()=> setShow(!show)}>
          <Image
            style={{ width: 20, height: 20, resizeMode: "contain", margin: 12 }}
            source={require("../assets/images/tablearea/Vector.png")}
          />
        </TouchableOpacity>
       
      </View>
      {show ? <Restqr_Options /> : null}
    </TouchableOpacity>
  );
};

export default RestaurantCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 17,
    width: widthPercentageToDP(84),
    height: 115,
    padding: widthPercentageToDP(2.5),
    marginHorizontal: widthPercentageToDP(8),
    marginTop: 20,
    shadowColor: "#00000009",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    //ios
    shadowColor: "#d4d4d4",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  edit: {
    position: "absolute",
    right: 0,
    top: 0,
  },
  subBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: widthPercentageToDP(25),
    height: "100%",
    backgroundColor: "#635CC910",
    borderRadius: 10,
  },
  thumbnail: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  info: {
    flexDirection: "column",
    justifyContent: "space-between",
    paddingHorizontal: widthPercentageToDP(3),
    width: widthPercentageToDP(55),
  },
  parentText: {
    display: "flex",
    flexDirection: "row",
    width: widthPercentageToDP(55) - 43,
  },
  name: {
    flexWrap: "wrap",
    color: "#635CC9",
    fontFamily: "Poppins Medium",
    fontSize: 23,
    lineHeight: 30 * 0.75,
    paddingTop: 40 - 35 * 0.75,
  },
  address: {
    flexWrap: "wrap",
    fontFamily: "Poppins Medium",
    fontSize: 15,
    color: "#cfcfcf",
    lineHeight: 17,
  },
  editIcon: {
    height: 45,
    width: 45,
  },
});


   {/* <TouchableOpacity
          onPress={() => navigation.navigate("EditABusiness", { data: data })}
        >
          <Image
            style={styles.editIcon}
            source={require("../assets/images/icons/edit.png")}
          />
        </TouchableOpacity> */}