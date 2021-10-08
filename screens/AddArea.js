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
  KeyboardAvoidingView,
} from "react-native";
import HeaderSVG from "../components/HeaderSVG";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { strings } from "../locales/i18n";
import NetInfo from "@react-native-community/netinfo";
import Offline from "../components/Offline";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from "react-redux";

const Addarea_Modal = ({
  onTextChange,
  onAdd,
  onCancel,
  visible,
  value,
  from,
  error,
}) => {
  return (
    <Modal visible={visible} transparent={true}>
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
            {from == "edit" ? "Edit Area" : "Add Area"}
          </Text>

          <TextInput
            style={styles.input}
            placeholder={"Area Name"}
            textAlign="center"
            placeholderTextColor="#635CC9"
            onChangeText={onTextChange}
            value={value}
          />

          <Text
            style={{
              fontFamily: "Poppins Medium",
              fontSize: 12,
              textAlign: "center",
              marginTop: 10,
              color: "red",
            }}
          >
            {error}
          </Text>
          <View style={{ ...styles.allBtn, marginVertical: 20 }}>
            <TouchableOpacity style={styles.btn1} onPress={onCancel}>
              <Text style={styles.btnText1}>{strings("Add Item9")}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn2} onPress={onAdd}>
              <Image source={require("../assets/images/icons/tick.png")} />
              <Text style={styles.btnText2}>{strings("Add Item8")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const AddtableArea = ({ navigation, token, user_id, route }) => {
  const [show, setShow] = useState(false);
  const [addarea, setareashow] = useState(false);
  const [online, setonline] = useState(true);
  const [area, setareaName] = useState("");
  const [areadata, setareaData] = useState([]);
  const [error, setError] = useState("");
  const [from, setFrom] = useState("");
  const [area_id, setAreaId] = useState("");

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      get_Area();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    // Subscribe
    const unsubscribe = NetInfo.addEventListener((state) => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
      setonline(state.isConnected);
    });
    return () => {
      // Unsubscribe
      unsubscribe();
    };
  }, []);

  const Restqr_Options = () => {
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
            Print QR
          </Text>
        </View>
      </View>
    );
  };

  const render_Item = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("AddTable")}
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
            justifyContent: "space-between",
            marginHorizontal: 10,
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                color: "#635CC9",
                fontFamily: "Poppins Medium",
                fontStyle: "normal",
                marginLeft: 5,
              }}
            >
              {item.name}
            </Text>
            {/* <View
              style={{
                width: 30,
                height: 30,
                marginLeft: 10,
                borderRadius: 15,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#635CC9",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontFamily: "Poppins Medium",
                  fontStyle: "normal",
                }}
              >
                {item.count}
              </Text>
            </View> */}
          </View>
          <TouchableOpacity onPress={() => onEditPress(item)}>
            <Image
              source={require("../assets/images/icons/edit.png")}
              style={{ height: 42, width: 42 }}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const get_Area = async () => {
    var bodyFormData = new FormData();
    bodyFormData.append("user_id", user_id);
    bodyFormData.append("token", token);
    bodyFormData.append(
      "restaurant_id",
      route.params.addarea_data.restaurant_id
    );
    const res = await axios({
      method: "post",
      url: `https://admin.squaredmenu.com/api/restaurant/get-areas`,
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    // console.log('Get Area response - ', res.data.data.areas)
    setareaData(res.data.data.areas);
  };

  const add_Area = async () => {
    var bodyFormData = new FormData();
    bodyFormData.append("user_id", user_id);
    bodyFormData.append("token", token);
    bodyFormData.append("name", area);
    bodyFormData.append(
      "restaurant_id",
      route.params.addarea_data.restaurant_id
    );
    const res = await axios({
      method: "post",
      url: `https://admin.squaredmenu.com/api/restaurant/add-edit-area`,
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log("Add Area response - ", res.data);
  };

  const on_Add = () => {
    if (area == "") {
      setError("Enter your area name.");
      return;
    } else {
      setError("");
      if (from == "add") {
        add_Area();
        setareashow(false);
        get_Area();
        return;
      } 
      else {
        edit_Area();
        setareashow(false);
        get_Area();
        return;
      }
    }
  };

  const onEditPress = (value) => {
    setFrom("edit");
    setareashow(true);
    console.log("value ->", value);
    setareaName(value.name);
    setAreaId(value.id);
  };

  const edit_Area = async () => {
    var bodyFormData = new FormData();
    bodyFormData.append("user_id", user_id);
    bodyFormData.append("token", token);
    bodyFormData.append("name", area);
    bodyFormData.append(
      "restaurant_id",
      route.params.addarea_data.restaurant_id
    );
    bodyFormData.append("id", area_id);
    const res = await axios({
      method: "post",
      url: `https://admin.squaredmenu.com/api/restaurant/add-edit-area`,
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log("Edit Area response - ", res.data);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <HeaderSVG uri={route.params.addarea_data.cover} />
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

          <TouchableOpacity
            onPress={() => setShow(!show)}
            style={styles.previewBTN}
          >
            <Image
              source={require("../assets/images/tablearea/qrcode.png")}
              style={{ height: 25, width: 25, resizeMode: "contain" }}
            />
          </TouchableOpacity>

          <View
            style={{
              position: "absolute",
              top: heightPercentageToDP(5.4),
              right: widthPercentageToDP(20.5),
            }}
          >
            <Text numberOfLines={1} style={styles.name}>
              {"Restaurant QR"}
            </Text>
          </View>
          <View style={styles.info}>
            <View style={styles.nameContainer}>
              <Text numberOfLines={1} style={styles.name}>
                {route.params.addarea_data.name}
              </Text>
              <Text numberOfLines={1} style={styles.menuName}>
                {"Tables & QR Codes"}
              </Text>
            </View>
          </View>
        </View>

        <FlatList
          data={areadata}
          keyExtractor={(item) => item.id}
          renderItem={render_Item}
          ListFooterComponent={() => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => {
                setFrom("add");
                setareashow(true);
              }}
            >
              <View style={styles.subBox}>
                <Image
                  source={require("../assets/images/icons/plus.png")}
                  style={styles.plus}
                />
              </View>
              <Text style={styles.new}>{"Add Area"}</Text>
            </TouchableOpacity>
          )}
        />

        {show ? <Restqr_Options /> : null}

        <Addarea_Modal
          visible={addarea}
          value={area}
          onTextChange={setareaName}
          onAdd={() => on_Add()}
          onCancel={() => setareashow(false)}
          error={error}
          from={from}
        />

        {!online && <Offline />}
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStataeToProps = (state) => {
  return {
    user_id: state.auth.user_id,
    token: state.auth.token,
    image: state.auth.image,
  };
};

export default connect(mapStataeToProps, null)(AddtableArea);

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
  logo: {},
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
    marginTop: 20,
    marginBottom: 20,
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
    fontSize: 15,
    backgroundColor: "#726AE910",
    borderColor: "#726AE910",
    color: "#635CC9",
    fontFamily: "Poppins Medium",
    marginHorizontal: 20,
    marginTop: 20,
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
});
