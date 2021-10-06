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
} from "react-native";
import HeaderSVG from "../components/HeaderSVG";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { strings } from "../locales/i18n";
import { Button } from "react-native-elements";

const table_data = [
  {
    table_name: "Table 1",
    size: 3,
  },
  {
    table_name: "Table 6",
    size: 6,
  },
  {
    table_name: "Table 4",
    size: 2,
  },
  {
    table_name: "Table 9",
    size: 10,
  },
  {
    table_name: "Table 5",
    size: 5,
  },
];

const AddTable = ({ navigation }) => {
  const [show, setShow] = useState(false);
  const [addarea, setareashow] = useState(false);
  const [showItem, setshowItem] = useState(false);

  const render_Item = ({ item }) => {
    return (
      <View
        style={{
          backgroundColor: "white",
          paddingVertical: 7,
          borderRadius: 17,
          marginHorizontal: 20,
          marginVertical: 8,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 10,
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 6,
              height: 6,
              marginLeft: 10,
              borderRadius: 3,
              backgroundColor: "#C4C4C4",
            }}
          ></View>
          <View>
            <Text
              style={{
                fontSize: 15,
                color: "black",
                fontFamily: "Poppins Medium",
                fontStyle: "normal",
                marginLeft: 15,
                fontWeight: "bold",
              }}
            >
              {item.table_name}
            </Text>
            <Text
              style={{
                color: "black",
                fontFamily: "Poppins Medium",
                fontStyle: "normal",
                marginLeft: 15,
              }}
            >
              Size: {item.size}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <TouchableOpacity>
              <Image
                source={require("../assets/images/icons/edit_transparent.png")}
                style={{
                  marginHorizontal: 10,
                  height: 30,
                  width: 30,
                  resizeMode: "contain",
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require("../assets/images/icons/delete.png")}
                style={{ height: 20, width: 20, resizeMode: "contain" }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setshowItem(!showItem)}>
                
              <Image
                source={require("../assets/images/tablearea/Vector.png")}
                style={{
                  marginHorizontal: 10,
                  height: 20,
                  width: 20,
                  resizeMode: "contain",
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const Restqr_Options = () => {
    return (
      <View
        style={{
          position: "absolute",
          top: heightPercentageToDP(5.4),
          right: widthPercentageToDP(5.5),
          backgroundColor: "white",
          paddingVertical: 10,
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
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={require("../assets/images/tablearea/eye.png")}
            style={{ height: 25, width: 25, resizeMode: "contain" }}
          />
          <Text
            style={{
              fontFamily: "Poppins Medium",
              fontStyle: "normal",
              marginLeft: 15,
            }}
          >
            View QR
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 3,
          }}
        >
          <Image
            source={require("../assets/images/tablearea/email.png")}
            style={{ height: 25, width: 25, resizeMode: "contain" }}
          />
          <Text
            style={{
              fontFamily: "Poppins Medium",
              fontStyle: "normal",
              marginLeft: 15,
            }}
          >
            Email QR
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 3,
          }}
        >
          <Image
            source={require("../assets/images/tablearea/download.png")}
            style={{ height: 25, width: 25, resizeMode: "contain" }}
          />
          <Text
            style={{
              fontFamily: "Poppins Medium",
              fontStyle: "normal",
              marginLeft: 15,
            }}
          >
            Download QR
          </Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={require("../assets/images/tablearea/printer.png")}
            style={{ height: 25, width: 25, resizeMode: "contain" }}
          />
          <Text
            style={{
              fontFamily: "Poppins Medium",
              fontStyle: "normal",
              marginLeft: 15,
            }}
          >
            Print QR
          </Text>
        </View>
      </View>
    );
  };

  const Itemqr_Options = () => {
    return (
      <View
        style={{
          position: "absolute",
          top: heightPercentageToDP(12.4),
          right: widthPercentageToDP(10.5),
          backgroundColor: "white",
          paddingVertical: 10,
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
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={require("../assets/images/tablearea/eye.png")}
            style={{ height: 25, width: 25, resizeMode: "contain" }}
          />
          <Text
            style={{
              fontFamily: "Poppins Medium",
              fontStyle: "normal",
              marginLeft: 15,
            }}
          >
            View QR
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 3,
          }}
        >
          <Image
            source={require("../assets/images/tablearea/email.png")}
            style={{ height: 25, width: 25, resizeMode: "contain" }}
          />
          <Text
            style={{
              fontFamily: "Poppins Medium",
              fontStyle: "normal",
              marginLeft: 15,
            }}
          >
            Email QR
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 3,
          }}
        >
          <Image
            source={require("../assets/images/tablearea/download.png")}
            style={{ height: 25, width: 25, resizeMode: "contain" }}
          />
          <Text
            style={{
              fontFamily: "Poppins Medium",
              fontStyle: "normal",
              marginLeft: 15,
            }}
          >
            Download QR
          </Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={require("../assets/images/tablearea/printer.png")}
            style={{ height: 25, width: 25, resizeMode: "contain" }}
          />
          <Text
            style={{
              fontFamily: "Poppins Medium",
              fontStyle: "normal",
              marginLeft: 15,
            }}
          >
           Copy URL
          </Text>
        </View>
      </View>
    );
  };

  const Addtable_Modal = () => {
    return (
      <Modal visible={addarea} transparent={true}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.6)",
            flex: 1,
          }}
        >
          <View
            style={{ backgroundColor: "white", width: "80%", borderRadius: 10 }}
          >
            <Text
              style={{
                fontFamily: "Poppins Medium",
                fontSize: 20,
                textAlign: "center",
                marginTop: 10,
              }}
            >
              Add Table
            </Text>
            <Text
              style={{
                fontFamily: "Poppins Medium",
                fontSize: 15,
                textAlign: "center",
              }}
            >
              Area
            </Text>

            <TextInput
              style={styles.input}
              placeholder={"Inside"}
              textAlign="center"
              placeholderTextColor="#635CC9"
             
            />

            <Text
              style={{
                fontFamily: "Poppins Medium",
                fontSize: 15,
                textAlign: "center",
              }}
            >
              Size
            </Text>

            <TextInput
              style={styles.input}
              placeholder={"Number of Persons (Example 4)"}
              textAlign="center"
              placeholderTextColor="#635CC9"
              keyboardType='number-pad'
              
            />
             <Text
              style={{
                fontFamily: "Poppins Medium",
                fontSize: 15,
                textAlign: "center",
              }}
            >
              Total Tables
            </Text>
            
            <TextInput
              style={styles.input}
              placeholder={"Number of Tables (Example 10)"}
              textAlign="center"
              placeholderTextColor="#635CC9"
              keyboardType='number-pad'
              
            />

            <View style={{ ...styles.allBtn, marginVertical: 20 }}>
              <TouchableOpacity
                style={styles.btn1}
                onPress={() => setareashow(false)}
              >
                <Text style={styles.btnText1}>{strings("Add Item9")}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btn2}
                onPress={() => setareashow(false)}
              >
                <Image source={require("../assets/images/icons/tick.png")} />
                <Text style={styles.btnText2}>{strings("Add Item8")}</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <HeaderSVG />

        <View
          source={require("../assets/images/banners/mask.png")}
          style={styles.banner}
          resizeMode="stretch"
        >
          <TouchableOpacity
            style={styles.bell}
            onPress={() => navigation.goBack()}
          >
            <Image
              source={require("../assets/images/topbar/back.png")}
              style={{ height: 42, width: 42 }}
            />
          </TouchableOpacity>

          <View style={styles.info}>
            <View style={styles.nameContainer}>
              <Text numberOfLines={1} style={styles.name}>
                {"Silema"}
              </Text>
              <Text numberOfLines={1} style={styles.menuName}>
                {"Table Area"}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 22,
            alignItems: "center",
            marginVertical: 5,
          }}
        >
          <Text style={{ fontFamily: "Poppins Medium", fontSize: 20 }}>
            Inside
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 10,
              alignItems: "center",
            }}
          >
            <Image
              source={require("../assets/images/icons/delete.png")}
              style={{
                right: 20,
                height: 20,
                width: 20,
                resizeMode: "contain",
              }}
            />
            <TouchableOpacity onPress={() => setShow(!show)}>
              <Image
                source={require("../assets/images/tablearea/Vector.png")}
                style={{ height: 20, width: 20, resizeMode: "contain" }}
              />
            </TouchableOpacity>
          </View>
          {show ? <Restqr_Options /> : null}
          {showItem ? <Itemqr_Options /> : null}
        </View>

        <FlatList
          data={table_data}
          keyExtractor={(item) => item.size}
          renderItem={render_Item}
          ListFooterComponent={() => (
            <TouchableOpacity
              style={styles.newSection}
              onPress={() => setareashow(true)}
            >
              <Text style={styles.sectionName}>{"Add Table"}</Text>
              <Image
                style={styles.plus}
                source={require("../assets/images/icons/plus.png")}
              />
            </TouchableOpacity>
          )}
        />
      </ScrollView>
      <Addtable_Modal />
    </SafeAreaView>
  );
};

export default AddTable;

const styles = StyleSheet.create({
  banner: {
    position: "relative",
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(30),
    marginBottom: 45,
  },
  logoContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: heightPercentageToDP(8.5),
  },

  bell: {
    position: "absolute",
    top: heightPercentageToDP(5),
    left: widthPercentageToDP(3.5),
    //transform: [{ rotate: '180deg' }]
  },
  info: {
    marginTop: heightPercentageToDP(14),
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  previewBTN: {
    backgroundColor: "white",
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    //paddingHorizontal: 18,
    //paddingVertical: 7,
    borderRadius: 10,
    position: "absolute",
    top: heightPercentageToDP(5.4),
    right: widthPercentageToDP(3.5),
  },
  preview: {
    fontFamily: "Poppins Medium",
    fontSize: 16,
    color: "#fff",
  },
  name: {
    flexWrap: "wrap",
    fontFamily: "Poppins Medium",
    fontStyle: "normal",
    fontSize: 21,
    color: "#FFFFFF",
    lineHeight: 40,
    textTransform: "capitalize",
    marginBottom: 5,
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
  subBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 97,
    height: "100%",
    backgroundColor: "#635CC910",
    borderRadius: 10,
  },
  new: {
    fontFamily: "Poppins Medium",
    color: "#635CC9",
    fontSize: 15,
    marginLeft: 15,
  },
  plus: {
    height: 25,
    width: 25,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 17,
    // width: widthPercentageToDP(84),
    height: 70,
    padding: 10,
    marginHorizontal: widthPercentageToDP(6),
    marginTop: 10,
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
  input: {
    height: 50,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 25,
    fontSize: 12,
    backgroundColor: "#726AE910",
    borderColor: "#726AE910",
    color: "#635CC9",
    fontFamily: "Poppins Medium",
    marginHorizontal: 20,
    marginTop: 5,
  },
  allBtn: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  btn1: {
    // backgroundColor:'red',
    paddingVertical: 14,
    paddingLeft: 25,
    paddingRight: 25,
  },
  btnText1: {
    color: "#635CC9",
    fontSize: 15,
    fontFamily: "Poppins Medium",
  },
  btn2: {
    backgroundColor: "#635CC9",
    paddingVertical: 14,
    paddingLeft: 40,
    paddingRight: 50,
    borderRadius: 56,
    flexDirection: "row",
    alignItems: "center",
  },
  btnText2: {
    color: "#fff",
    fontSize: 15,
    fontFamily: "Poppins Medium",
    paddingLeft: 7,
  },
  newSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 16,
    marginTop: 10,
    backgroundColor: "#fff",
    marginHorizontal: 25,
    borderRadius: 17,
    marginBottom: 50,
    elevation: 2,
    //ios
    shadowColor: "#d4d4d4",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  plus: {
    height: 13,
    width: 13,
  },
  sectionName: {
    fontFamily: "Poppins Regular",
    color: "#635CC9",
    fontSize: 15,
  },
});
