import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import HeaderSVG from '../components/HeaderSVG'
import MenuSection from '../components/MenuSection'
import RBSheet from "react-native-raw-bottom-sheet";
import AddNewItem from '../components/AddNewItem'
import { connect } from 'react-redux'
import { getMenuItems, updateItemOrder } from '../store/action'
import AddNewVarient from '../components/AddNewVarient'
import DraggableFlatList, {
    RenderItemParams,
} from "react-native-draggable-flatlist";
import { strings } from '../locales/i18n'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ToggleSwitch from 'toggle-switch-react-native'

const MenuList = ({ navigation, user_id, token, getMenuItems, route, updateItemOrder }) => {
    const refRBSheet = useRef();
    const refRBSheet2 = useRef();
    const [data1, setdata] = useState(null)
    const [dataItems, setDataItems] = useState([])
    const [currency, setCurrency] = useState('$')
    const [updateFlatlist, setUpdateFlatlist] = useState(1)
    const [showtuts, setGuide] = useState(true)
    const [showtutss, setGuidee] = useState(false)
    const [showtut, setGuid] = useState(true)

    useEffect(async()=> {
        let res = await AsyncStorage.getItem('additemtuts')
        let result= JSON.parse(res)    
        if(result == false) {
          setGuide(false)
        }
      },[])

    useEffect(async () => {
        let res = await AsyncStorage.getItem('preview')
        let result = JSON.parse(res)
        if (result == false) {
            setGuidee(false)
        }
    }, [])  

    useEffect(async () => {
        let res = await AsyncStorage.getItem('variant')
        let result = JSON.parse(res)
        if (result == true) {
            setGuid(false)
        }
    }, []) 
   

    useEffect(async () => {
        var bodyFormData = new FormData();
        bodyFormData.append('user_id', user_id);
        bodyFormData.append('token', token);
        bodyFormData.append('menu_id', route.params.menu_id);
        const res = await getMenuItems(bodyFormData)
        console.log("Item Detail =>", res.data.data)
        setdata(res.data.data)
        setCurrency(res.data.data.menu.currency)
        setDataItems(res.data.data.items)
        

    }, [])
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            var bodyFormData = new FormData();
            bodyFormData.append('user_id', user_id);
            bodyFormData.append('token', token);
            bodyFormData.append('menu_id', route.params.menu_id);
            const res = await getMenuItems(bodyFormData)
            setdata(res.data.data)
            setDataItems(res.data.data.items)
            setCurrency(res.data.data.menu.currency)
        });

        return unsubscribe;
    }, [navigation]);
    const refresh = async () => {
        var bodyFormData = new FormData();
        bodyFormData.append('user_id', user_id);
        bodyFormData.append('token', token);
        bodyFormData.append('menu_id', route.params.menu_id);
        const res = await getMenuItems(bodyFormData)
        setdata(res.data.data)
        setDataItems(res.data.data.items)
        setCurrency(res.data.data.menu.currency)
    }
    useEffect(() => {
        setUpdateFlatlist(updateFlatlist + 1)
        console.log(currency)
    }, [data1, currency])
    const close1andRefresh = () => {

    }
    const renderItem = ({ item, index, drag, isActive }) => {
            console.log("rendering")
            return (
                <View style={{ backgroundColor: isActive ? "#635CC925" : "transparent" }}>
                    <MenuSection key={index} drag={drag} refresh={() => refresh()} currency={currency} menuName={item.name} variants={item.variants} menu_id={route.params.menu_id} data={item} successClose={() => { close1andRefresh() }} addNew={() => refRBSheet2.current.open()} navigation={navigation} />
                </View>
            )
        
        }
    
    const handleSorting = async (data) => {
        const new_order = data.map(item => item.item_id);

        var bodyFormData = new FormData();
        bodyFormData.append('user_id', user_id);
        bodyFormData.append('token', token);
        bodyFormData.append('item_ids', new_order.toString());
        const res = await updateItemOrder(bodyFormData)
    }

    const handle_guide =  (res) => {
        setGuide(false)
        setGuidee(true)
        AsyncStorage.setItem('additemtuts', JSON.stringify(false))
     }
    
     const handle_guide1 =  (res) => {
        setGuidee(false)
        AsyncStorage.setItem('preview', JSON.stringify(false))
     }

     const handle_guide2 =  (res) => {  
        setGuid(false)    
        AsyncStorage.setItem('variant', JSON.stringify(true))
       
     }

     const opensheet = async () => {
        refRBSheet.current.open()
     }
 

    return (
        <SafeAreaView style={{ flex: 1 , }}>
            
            
            <SafeAreaView style={{ flex: 1 }}>
            
            {
                showtuts
                    ?
                    <TouchableOpacity activeOpacity={1} onPress={()=> handle_guide()}  style={{ backgroundColor: 'rgba(0,0,0,0.8)', position: 'absolute', zIndex: 1, width: '100%', height: '100%', }}>
                            <View style={{ justifyContent: 'center',flex:1 }}>
                                <View style={styles.newSection} >
                                    <Text style={styles.sectionName}>{strings('Add Item1')}</Text>
                                    <Image style={styles.plus} source={require('../assets/images/icons/plus.png')} />
                                </View>
                                <View style={{alignItems:'center', bottom:30}}>
                                    <Image source={require('../assets/images/tutorial_images/Arrow16.png')} style={{ width: 70, height: 70, resizeMode: 'contain', }} />
                                    <Text style={{ color: 'white', fontSize: 18, fontFamily: "Poppins Regular", }}>Tap here to add items in your section.</Text>
                                </View>
                            </View>
                    </TouchableOpacity>
                    :
                    null
            }

             {
                showtutss
                    ?
                    <TouchableOpacity activeOpacity={1} onPress={()=> handle_guide1()}   style={{ backgroundColor: 'rgba(0,0,0,0.8)', position: 'absolute', zIndex: 1, width: '100%', height: '100%', }}>
                        <>
                           
                            <View style={styles.previewBTN} >
                                        <Text style={styles.preview}>{strings('Add Item2')}</Text>
                                    </View>
                                    <View style={styles.info}>


                                    </View>
                                    <View style={{ alignItems: 'flex-end', marginHorizontal: 50,  }}>
                                        <Image source={require('../assets/images/tutorial_images/Arrow16.png')} style={{ width: 70, height: 70, resizeMode: 'contain', }} />
                                        <Text style={{ color: 'white', fontSize: 18, fontFamily: "Poppins Regular", }}>Click here to preview and change style of your menu.</Text>
                                    </View>
                               
                        </>
                    </TouchableOpacity>
                    :
                    null
            }

              


                <DraggableFlatList
                    nestedScrollEnabled
                    data={dataItems}
                    renderItem={renderItem}
                    dragItemOverflow={true}
                    keyExtractor={(item, index) => `draggable-item-${index}`}
                    onDragEnd={({ data }) => { setDataItems(data), handleSorting(data) }}
                    extraData={data1} //to update on state change

                    ListHeaderComponent={() => {
                        return <>
                            <HeaderSVG uri={data1 && data1.menu.cat_image} />
                            <View source={require('../assets/images/banners/mask.png')} style={styles.banner} resizeMode="stretch">
                                <TouchableOpacity
                                    style={styles.bell}
                                    onPress={() => navigation.goBack()}
                                >
                                    <Image source={require('../assets/images/topbar/back.png')} style={{ height: 42, width: 42 }} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.previewBTN} onPress={() => navigation.navigate('MenuPreview', { themeURL: route.params.themeURL })}>
                                    <Text style={styles.preview}>{strings('Add Item2')}</Text>
                                </TouchableOpacity>
                                <View style={styles.info}>
                                    <View style={styles.nameContainer}>
                                        <Text numberOfLines={1} style={styles.name}>{data1 && data1.menu.restorant_name}</Text>
                                        <Text numberOfLines={1} style={styles.menuName}>{data1 && data1.menu.cat_name}</Text>
                                    </View>

                                </View>
                            </View>
                        </>
                    }}
                    ListFooterComponent={() => {
                        return (
                            <>
                            
                                <TouchableOpacity style={styles.newSection} onPress={() =>  opensheet()}>
                                    <Text style={styles.sectionName}>{strings('Add Item1')}</Text>
                                    <Image style={styles.plus} source={require('../assets/images/icons/plus.png')} />
                                </TouchableOpacity>
                            </>
                        )
                        
                    }}
                />

            </SafeAreaView>
            
            {
                showtuts || showtutss
                    ?
                    null
                    :
                    <TouchableOpacity style={styles.qrbutton} onPress={() => navigation.navigate('QR', { restaurant_id: route.params.restaurant_id, img: route.params.brandImage, url: route.params.public_url })}>
                        <Image source={require('../assets/images/icons/qr.png')} style={{ height: 80, width: 80 }} />
                    </TouchableOpacity>
            }
           
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={false}
                // height={80}
                animationType='slide'
                customStyles={{
                    container: {
                        ...styles.container,
                        height: 450
                    },
                    wrapper: {
                        backgroundColor: "#00000025"
                    },
                    draggableIcon: {
                        backgroundColor: "#fff"
                    }
                }}
            >
                {
                    showtut
                    ?
                        <TouchableOpacity activeOpacity={1} onPress={()=> handle_guide2()} style={{ paddingHorizontal: 20, backgroundColor: 'rgba(0,0,0,0.8)', position: 'absolute', zIndex: 1, width: '100%', height: '100%', }}>
                            <View style={{ alignItems: 'center', marginTop: 10 }}>
                                <Text style={{ color: 'white', fontSize: 18, fontFamily: "Poppins Regular", }}>Select It, If item has multiple variants. like Small, Medium, Large </Text>
                                <Image source={require('../assets/images/tutorial_images/Arrowdown1.png')} style={{ width: 70, height: 60, resizeMode: 'contain', }} />
                            </View>
                            <View style={{ marginTop: 10, flex: 1, alignItems: 'center' }}>
                                <View style={styles.switchBox}>
                                    <ToggleSwitch

                                        onColor="#635CC9"
                                        offColor="#635CC920"
                                        label={'For different variants '}
                                        labelStyle={{ color: "black", fontFamily: 'Poppins Medium', marginRight: 30 }}
                                        size='medium'

                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                :
                null
                }
               
                <AddNewItem closeFunc={() => refRBSheet.current.close()} currency={data1 && data1.menu.currency} menu_id={route.params.menu_id} navigation={navigation} />
            </RBSheet>
            <RBSheet
                ref={refRBSheet2}
                closeOnDragDown={true}
                closeOnPressMask={false}
                // height={80}
                animationType='slide'
                customStyles={{
                    container: {
                        ...styles.container,
                        height: 370
                    },
                    wrapper: {
                        backgroundColor: "#00000025"
                    },
                    draggableIcon: {
                        backgroundColor: "#fff"
                    }
                }}
            >
                <AddNewVarient closeFunc={() => refRBSheet2.current.close()} />
            </RBSheet>
        </SafeAreaView>
    )
}
const mapStateToProps = state => {
    return {
        user_id: state.auth.user_id,
        token: state.auth.token
    }
}
export default connect(mapStateToProps, { getMenuItems, updateItemOrder })(MenuList)

const styles = StyleSheet.create({
    banner: {
        position: 'relative',
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(30),
        marginBottom: 45
    },
    logoContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: heightPercentageToDP(8.5)
    },
    logo: {},
    bell: {
        position: 'absolute',
        top: heightPercentageToDP(5),
        left: widthPercentageToDP(3.5),
        //transform: [{ rotate: '180deg' }]
    },
    info: {
        marginTop: heightPercentageToDP(14),
        paddingHorizontal: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    nameContainer: {
        flexBasis: widthPercentageToDP(76),
        flexDirection: 'column'
    },
    name: {
        flexWrap: 'wrap',
        fontFamily: 'Poppins Medium',
        fontStyle: 'normal',
        fontSize: 21,
        color: '#FFFFFF',
        lineHeight: 40,
        textTransform: 'capitalize',
        marginBottom: 5
    },
    menuName: {
        flexWrap: 'wrap',
        fontFamily: 'Poppins Medium',
        fontStyle: 'normal',
        fontSize: 37,
        color: '#FFFFFF',
        lineHeight: 40,
        textTransform: 'capitalize'
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 17,
        width: widthPercentageToDP(84),
        height: 115,
        padding: 10,
        marginHorizontal: widthPercentageToDP(8),
        marginTop: 40,
        elevation: 2,
        //ios
        shadowColor: "#d4d4d4",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    previewBTN: {
        backgroundColor: '#635CC9',
        paddingHorizontal: 18,
        paddingVertical: 7,
        borderRadius: 23,
        position: 'absolute',
        top: heightPercentageToDP(5.4),
        right: widthPercentageToDP(3.5),
    },
    preview: {
        fontFamily: 'Poppins Medium',
        fontSize: 16,
        color: '#fff'
    },
    subBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 97,
        height: '100%',
        backgroundColor: '#635CC910',
        borderRadius: 10,

    },
    newSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingTop: 20,
        paddingBottom: 16,
        backgroundColor: '#fff',
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
        fontFamily: 'Poppins Regular',
        color: '#635CC9',
        fontSize: 15
    },
    qrbutton: {
        position: 'absolute',
        right: 25,
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
    switchBox:{
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 10,
        marginRight: 30,
        backgroundColor:'white',
        borderRadius:3
        
    },

})
