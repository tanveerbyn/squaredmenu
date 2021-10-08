import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { connect } from "react-redux";
import HeaderSVG from "../components/HeaderSVG";
import MenuButtons from "../components/MenuButtons";
import NewMenuButton from "../components/NewMenuButton";
import { getMenu, updateMenuOrder } from "../store/action";
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";
import { strings } from "../locales/i18n";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Menu = ({
  navigation,
  user_id,
  token,
  getMenu,
  route,
  updateMenuOrder,
}) => {
  const [data, setdata] = useState(null);
  const [dataItems, setDataItems] = useState([]);
  const [showtuts, setGuide] = useState(false);
  const [profile, setProfile] = useState(false);
  const [profile1, setProfile1] = useState(false);
  const [profile2, setProfile2] = useState(true);
  const [profile3, setProfile3] = useState(false);

  useEffect(async () => {
    let res = await AsyncStorage.getItem("menuaddtuts");
    let result = JSON.parse(res);
    if (result == false) {
      setProfile2(false);
    }
  }, []);

  useEffect(async () => {
    let res = await AsyncStorage.getItem("qrtuts");
    let result = JSON.parse(res);
    if (result == false) {
      setGuide(false);
    }
  }, []);

  useEffect(async () => {
    let res = await AsyncStorage.getItem("edit");
    let result = JSON.parse(res);
    if (result == false) {
      setProfile(false);
    }
  }, []);

  useEffect(async () => {
    let res = await AsyncStorage.getItem("drag");
    let result = JSON.parse(res);
    if (result == false) {
      setProfile1(false);
    }
  }, []);

  useEffect(async () => {
    var bodyFormData = new FormData();
    bodyFormData.append("user_id", user_id);
    bodyFormData.append("token", token);
    bodyFormData.append("restaurant_id", route.params.restaurant_id);
    const res = await getMenu(bodyFormData);
    setdata(res.data.data);
    setDataItems(res.data.data.menu);
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      var bodyFormData = new FormData();
      bodyFormData.append("user_id", user_id);
      bodyFormData.append("token", token);
      bodyFormData.append("restaurant_id", route.params.restaurant_id);
      const res = await getMenu(bodyFormData);
      setdata(res.data.data);
      setDataItems(res.data.data.menu);
    });

    return unsubscribe;
  }, [navigation]);
  const handleSorting = async (data) => {
    const new_order = data.map((item) => item.menu_id);
    // console.log(new_order)
    var bodyFormData = new FormData();
    bodyFormData.append("user_id", user_id);
    bodyFormData.append("token", token);
    bodyFormData.append("menu_ids", new_order.toString());
    const res = await updateMenuOrder(bodyFormData);
  };
  const renderItem = useCallback(
    ({ item, index, drag, isActive }: RenderItemParams<Item>) => {
      return (
        <View
          style={{ backgroundColor: isActive ? "#635CC925" : "transparent" }}
        >
          <MenuButtons
            key={index}
            drag={drag}
            navigation={navigation}
            title={item.name}
            uri={item.image}
            data={item}
            restaurant_id={route.params.restaurant_id}
            themeURL={route.params.themeURL}
            public_url={route.params.public_url}
            brandImage={route.params.brandImage}
          />
        </View>
      );
    },
    []
  );

  const handle_guide = (res) => {
    setGuide(false);

    AsyncStorage.setItem("qrtuts", JSON.stringify(false));
  };

  const handle_guide1 = (res) => {
    setProfile(false);
    setProfile1(true);
    AsyncStorage.setItem("edit", JSON.stringify(false));
  };

  const handle_guide2 = (res) => {
    setProfile1(false);
    setGuide(true);
    AsyncStorage.setItem("drag", JSON.stringify(false));
  };

  const handle_guide3 = (res) => {
    setProfile2(false);
    setProfile(true);
    AsyncStorage.setItem("menuaddtuts", JSON.stringify(false));
  };
  const handle_guide4 = (res) => {
    setProfile3(false);
    setGuide(true);
    AsyncStorage.setItem("stylechng", JSON.stringify(false));
  };

  //    const finalShowhide = async () => {
  //     let res = await AsyncStorage.getItem('menuaddtuts')
  //     let result = JSON.parse(res)
  //     console.log('final method call', result)

  //         if(dataItems && dataItems == [] ) {
  //             if(result == null) {
  //                 setProfile2(true)
  //             }
  //             else {
  //                 setProfile2(false)
  //             }

  //         }
  //         else if(dataItems && dataItems.length == 0) {
  //             if(result == null) {
  //                 setProfile2(true)
  //             }
  //             else {
  //                 setProfile2(false)
  //             }
  //         }
  //         else {
  //             setProfile2(false)
  //         }

  //    }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        {showtuts ? (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => handle_guide()}
            style={{
              backgroundColor: "rgba(0,0,0,0.8)",
              position: "absolute",
              zIndex: 1,
              width: "100%",
              height: "100%",
            }}
          >
            <View
              style={{
                width: "100%",
                height: "100%",
                justifyContent: "flex-end",
                alignItems: "flex-end",
                bottom: 120,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  fontFamily: "Poppins Regular",
                  right: 15,
                }}
              >
                Here the QR Code.
              </Text>
              <Image
                source={require("../assets/images/tutorial_images/Arrowdown1.png")}
                style={{
                  width: 70,
                  height: 70,
                  resizeMode: "contain",
                  right: 30,
                }}
              />
            </View>
            <TouchableOpacity
              style={styles.qrbutton}
              onPress={() =>
                navigation.navigate("QR", {
                  restaurant_id: route.params.restaurant_id,
                  img: route.params.brandImage,
                  url: route.params.public_url,
                })
              }
            >
              <Image
                source={require("../assets/images/icons/qr.png")}
                style={{ height: 80, width: 80 }}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        ) : null}

        {profile ? (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => handle_guide1()}
            style={{
              backgroundColor: "rgba(0,0,0,0.8)",
              position: "absolute",
              zIndex: 1,
              width: "100%",
              height: "100%",
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-end",
                right: 50,
                flex: 1,
                marginTop: 30,
              }}
            >
              <TouchableOpacity>
                <Image
                  source={require("../assets/images/icons/edit.png")}
                  style={styles.editIcon}
                />
              </TouchableOpacity>
              <Image
                source={require("../assets/images/tutorial_images/Arrow16.png")}
                style={{
                  width: 70,
                  height: 70,
                  resizeMode: "contain",
                  left: 10,
                }}
              />
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  fontFamily: "Poppins Regular",
                  right: 5,
                }}
              >
                Tap pencil icon to edit a menu
              </Text>
            </View>
          </TouchableOpacity>
        ) : null}

        {profile1 ? (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => handle_guide2()}
            style={{
              backgroundColor: "rgba(0,0,0,0.8)",
              position: "absolute",
              zIndex: 1,
              width: "100%",
              height: "100%",
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-end",
                marginHorizontal: 25,
                flex: 1,
                marginTop: 30,
              }}
            >
              <View
                style={{
                  backgroundColor: "white",
                  marginVertical: 3,
                  bottom: 5,
                  paddingHorizontal: 5,
                  borderRadius: 5,
                  right: 12,
                  paddingVertical: 2,
                }}
              >
                <Image
                  source={require("../assets/images/icons/drag_icon.png")}
                  style={styles.dragImg}
                />
              </View>
              <Image
                source={require("../assets/images/tutorial_images/Arrow16.png")}
                style={{
                  width: 70,
                  height: 70,
                  resizeMode: "contain",
                  left: 10,
                }}
              />
              <View style={{ alignItems: "flex-end", width: "100%" }}>
                <Text
                  style={{
                    color: "white",
                    fontSize: 18,
                    fontFamily: "Poppins Regular",
                  }}
                >
                  Tap and drag to change the position of a menu
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ) : null}

        {profile2 ? (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => handle_guide3()}
            style={{
              backgroundColor: "rgba(0,0,0,0.8)",
              position: "absolute",
              zIndex: 1,
              width: "100%",
              height: "100%",
            }}
          >
            <View
              source={require("../assets/images/banners/mask.png")}
              style={styles.banner}
              resizeMode="stretch"
            >
              <View style={styles.info}></View>
            </View>
            <NewMenuButton
              action={() =>
                navigation.navigate("NewMenu", {
                  restaurant_id: route.params.restaurant_id,
                })
              }
            />
            <View style={{ alignItems: "center", marginHorizontal: 50 }}>
              <Image
                source={require("../assets/images/tutorial_images/Arrow16.png")}
                style={{ width: 70, height: 70, resizeMode: "contain" }}
              />
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  fontFamily: "Poppins Regular",
                }}
              >
                Tap here to add menu.
              </Text>
            </View>
            <View style={{ marginBottom: 150 }}></View>
          </TouchableOpacity>
        ) : null}

        {/* {
                    profile3
                    ?
                        <TouchableOpacity activeOpacity={1} onPress={() => handle_guide4()}  style={{ backgroundColor: 'rgba(0,0,0,0.8)', position: 'absolute', zIndex: 1, width: '100%', height: '100%', }}>
                            <>

                                <View style={styles.previewBTN} >
                                    <Text style={styles.preview}>{strings('Add Item2')}</Text>
                                </View>
                                <View style={styles.info}>


                                </View>
                                <View style={{ alignItems: 'flex-end', marginHorizontal: 50, }}>
                                    <Image source={require('../assets/images/tutorial_images/Arrow16.png')} style={{ width: 70, height: 70, resizeMode: 'contain', }} />
                                    <Text style={{ color: 'white', fontSize: 18, fontFamily: "Poppins Regular", }}>Click here to preview and change style of your menu.</Text>
                                </View>

                            </>
                        </TouchableOpacity>
                      :
                      null 
                } */}

        <DraggableFlatList
          nestedScrollEnabled
          data={dataItems}
          renderItem={renderItem}
          dragItemOverflow={true}
          keyExtractor={(item, index) => `draggable-item-${index}`}
          onDragEnd={({ data }) => {
            setDataItems(data);
            handleSorting(data);
          }}
          ListHeaderComponent={() => {
            return (
              <>
                <HeaderSVG uri={route.params.brandImage} />
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
                  {/* <TouchableOpacity style={styles.previewBTN} onPress={() => navigation.navigate('MenuPreview', { themeURL: route.params.themeURL })}>
                                    <Text style={styles.preview}>{strings('Business Home Screen2')}</Text>
                                </TouchableOpacity> */}
                  <View style={styles.info}>
                    <View style={styles.nameContainer}>
                      <Text numberOfLines={2} style={styles.name}>
                        {data && data.restaurant.name}
                      </Text>
                    </View>
                  </View>
                </View>
              </>
            );
          }}
          ListFooterComponent={() => {
            return (
              <>
                <NewMenuButton
                  action={() =>
                    navigation.navigate("NewMenu", {
                      restaurant_id: route.params.restaurant_id,
                    })
                  }
                />
                <View style={{ marginBottom: 150 }}></View>
              </>
            );
          }}
        />
      </SafeAreaView>
      {profile || profile1 || profile2 || showtuts ? null : (
        <>
          <TouchableOpacity
           onPress={() => navigation.navigate("WebMenu")}
            style={{
              position: "absolute",
              left: 35,
              top: heightPercentageToDP(83),
              width: "67%",
              height: 70,
              backgroundColor: "#fff",
              padding: 0,
              borderRadius: 20,
              elevation: 3,
              //ios
              shadowColor: "#d4d4d4",
              shadowOffset: {
                width: 0,
                height: 0,
              },
              shadowOpacity: 0.02,
              justifyContent: "center",
              paddingHorizontal: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../assets/images/icons/pencil.png")}
                style={{ height: 20, width: 20 }}
              />
              <Text
                style={{
                  fontStyle: "normal",
                  fontFamily: "Poppins Medium",
                  fontStyle: "normal",
                }}
              >
                Let us create menu
              </Text>
              <Image
                source={require("../assets/images/icons/info.png")}
                style={{ height: 20, width: 20 }}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.qrbutton}
            onPress={() =>
              navigation.navigate("QR", {
                restaurant_id: route.params.restaurant_id,
                img: route.params.brandImage,
                url: route.params.public_url,
              })
            }
          >
            <Image
              source={require("../assets/images/icons/qr.png")}
              style={{ height: 70, width: 70 }}
            />
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};
const mapStataeToProps = (state) => {
  return {
    user_id: state.auth.user_id,
    token: state.auth.token,
  };
};
export default connect(mapStataeToProps, { getMenu, updateMenuOrder })(Menu);

const styles = StyleSheet.create({
  banner: {
    position: "relative",
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(30),
    marginBottom: 25,
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
  nameContainer: {
    flexBasis: widthPercentageToDP(66),
    flexDirection: "row",
  },
  name: {
    flexWrap: "wrap",
    fontFamily: "Poppins Medium",
    fontStyle: "normal",
    fontSize: 37,
    color: "#FFFFFF",
    lineHeight: 40,
    textTransform: "capitalize",
  },
  previewBTN: {
    backgroundColor: "#635CC9",
    paddingHorizontal: 18,
    paddingVertical: 7,
    borderRadius: 23,
    position: "absolute",
    top: heightPercentageToDP(5.4),
    right: widthPercentageToDP(3.5),
  },
  preview: {
    fontFamily: "Poppins Medium",
    fontSize: 16,
    color: "#fff",
  },
  card: {
    marginHorizontal: widthPercentageToDP(8),
    marginTop: 40,

    //ios
  },
  subBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 97,
    height: "100%",
  },
  new: {
    fontFamily: "Poppins Medium",
    color: "#635CC9",
    fontSize: 15,
    marginLeft: 15,
  },
  qrbutton: {
    position: "absolute",
    right: 15,
    top: heightPercentageToDP(84),
    //backgroundColor: '#fff',
    padding: 0,
    borderRadius: 0,
    // elevation: 3,
    //ios
    //shadowColor: "#d4d4d4",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.02,
    //shadowRadius: 0.84,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 17,
    width: widthPercentageToDP(84),
    height: 90,
    padding: 10,
    marginHorizontal: widthPercentageToDP(8),
    marginTop: 15,
    elevation: 2,
    //ios
    shadowColor: "#d4d4d4",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
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
    justifyContent: "space-between",
  },
  part1: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    paddingRight: 50,
  },
  subBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
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
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 10,
  },
  editIcon: {
    height: 45,
    width: 45,
  },
  actBtn: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
  },
  dragImg: {
    width: 20,
    height: 20,
  },
});
