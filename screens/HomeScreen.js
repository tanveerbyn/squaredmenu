import React, { useEffect, useState } from 'react'
import { Platform, ScrollView } from 'react-native'
import { StyleSheet, Text, View, SafeAreaView, Image, ImageBackground, TouchableOpacity } from 'react-native'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { connect } from 'react-redux'
import AddNewButton from '../components/AddNewButton'
import RestaurantCard from '../components/RestaurantCard'
import { getRestaurants, logout, getNotifications } from '../store/action'
import { useFocusEffect } from '@react-navigation/native';
import FastImage from 'react-native-fast-image'
import NetInfo from "@react-native-community/netinfo";
import Offline from '../components/Offline';
import axios from 'axios';
import {ServiceConstant} from './ServiceConstant';
import AsyncStorage from '@react-native-async-storage/async-storage';

//import Offline from '../components/Offline'
import { strings } from '../locales/i18n'

const HomeScreen = ({ navigation, logout, user_id, token, image, getRestaurants }) => {
    const [data, setdata] = useState(null)
    const [online, setonline] = useState(true)
    const [showtuts, setGuide] = useState(true)
    const [profile, setProfile] = useState(false)
    const [profile1, setProfile1] = useState(false)
   

    useEffect(async()=> {
        let res = await AsyncStorage.getItem('addbustuts')
        let result= JSON.parse(res)    
        if(result == false) {
          setGuide(false)
        }
      },[])

      useEffect(async()=> {
        let res = await AsyncStorage.getItem('profiletuts')
        let result= JSON.parse(res)
        if(result == false) {
          setProfile(false)
        }
      },[]) 

      useEffect(async()=> {
        let res = await AsyncStorage.getItem('belltuts')
        let result= JSON.parse(res)
        if(result == false) {
          setProfile1(false)
        }
      },[]) 

    useEffect(() => {
         // Subscribe
        const unsubscribe = NetInfo.addEventListener(state => {
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
            setonline(state.isConnected)
        });
        return () => {
            // Unsubscribe
            unsubscribe();
        }
    }, [])
    
    useEffect(async () => {
        
        var bodyFormData = new FormData();
        bodyFormData.append('user_id', user_id);
        bodyFormData.append('token', token);
        const res = await getRestaurants(bodyFormData)
        setdata(res)
        console.log(res[0].logo)
        getNotification()
      
    }, [])
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            
            var bodyFormData = new FormData();
            bodyFormData.append('user_id', user_id);
            bodyFormData.append('token', token);
            const res = await getRestaurants(bodyFormData)
            setdata(res)
            getNotification()
        });

        return unsubscribe;
    }, [navigation]);

    const getNotification = async () => {
        var bodyFormData = new FormData();
        bodyFormData.append('user_id', user_id);
        bodyFormData.append('token', token);
        const res = await axios({
            method: 'post',
            url: `https://admin.squaredmenu.com/api/restaurant/get-notifications`, data: bodyFormData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        console.log("Home Notif response =>", res.data)
        ServiceConstant.set_notf_count(res.data.unread_count)
    }

    const handle_guide =  (res) => {
        setGuide(false)
        setProfile(true)
        AsyncStorage.setItem('addbustuts', JSON.stringify(false))
     }

     const handle_guide1 =  (res) => {   
        setProfile(false)
        setProfile1(true)  
        AsyncStorage.setItem('profiletuts', JSON.stringify(false))
     }

     const handle_guide2 =  (res) => {   
        setProfile1(false)
        AsyncStorage.setItem('belltuts', JSON.stringify(false))
     }

     const handleAddButton = ()=> {
        setGuide(false)
        AsyncStorage.setItem('addbustuts', JSON.stringify(false))
        navigation.navigate('AddABusiness')
     }
    
    return (
        <SafeAreaView style={{ flex: 1 }}>
               

            <ScrollView contentContainerStyle={{flexGrow:1}}> 
            
            {
                showtuts
                    ?
                  
                     <TouchableOpacity activeOpacity={1} onPress={()=> handle_guide()} style={{ backgroundColor: 'rgba(0,0,0,0.8)', position: 'absolute', zIndex: 1, width: '100%', height: '100%', }}>
                           
                            <View style={{ justifyContent: 'center', alignItems: 'center', position: 'absolute', zIndex: 1, width: '100%', height: '100%',  paddingHorizontal:10}}>
                                {
                                    Platform.OS == 'ios'
                                        ?
                                       
                                        data
                                        ?
                                        <>
                                            {
                                                data && data.map((item, idx) => {
                                                    return <RestaurantCard key={idx} name='Menu' navigation={navigation} data={item} />
                                                })
                                            }
                                            {
                                                data.length < 1 && <TouchableOpacity  style={styles.card} onPress={()=>handleAddButton()}>
                                                <View style={styles.subBox}>
                                                    <Image source={require('../assets/images/icons/plus.png')} style={styles.plus} />
                                                </View>
                                                <Text style={styles.new}>{'Add New Business'}</Text>
                                            </TouchableOpacity>
                                            }
                                        </>
                                        :
                                        <View style={styles.loading}><Text style={styles.loadingText}></Text></View>

                                        :
                                        null


                                }

                                {
                                    Platform.OS == 'android'
                                        ?
                                        
                                        <>
                                            <Image source={require('../assets/images/tutorial_images/Arrow16.png')} style={{ width: 70, height: 70, resizeMode: 'contain', top: 100 }} />
                                            <Text style={{ color: 'white', fontSize: 18, fontFamily: "Poppins Regular", top: 100, }}>{data && data.length < 1 ? 'Tap here to add your local business' : 'Tap here to view your local business'}</Text>
                                        </>
                                        :
                                        <>
                                            <Image source={require('../assets/images/tutorial_images/Arrow16.png')} style={{ width: 70, height: 70, resizeMode: 'contain', top: 20 }} />
                                            <Text style={{ color: 'white', fontSize: 18, fontFamily: "Poppins Regular", top: 20, }}>{data && data.length < 1 ? 'Tap here to add your local business' : 'Tap here to view your local business'}</Text>
                                        </>
                                }
                               

                            </View>
                  
                    </TouchableOpacity>
                   
                    :
                    null
            }

                {
                    profile
                        ?
                       
                            <TouchableOpacity activeOpacity={1} onPress={() => handle_guide1()} style={{ backgroundColor: 'rgba(0,0,0,0.8)', position: 'absolute', zIndex: 1, width: '100%', height: '100%', }}>
                                <ImageBackground source={require('../assets/images/banners/lands.png')} style={styles.banner} resizeMode="stretch">
                                    {
                                        data && data.length > 0 && <TouchableOpacity style={styles.bell} >
                                            <View>
                                                <Image style={{ height: 53, width: 53 }} source={require('../assets/images/icons/bell.png')} />
                                                {
                                                    ServiceConstant.get_notf_count() != '0'
                                                        ?
                                                        <View style={{ position: 'absolute', height: 20, width: 20, backgroundColor: '#FF3A44', top: -4, right: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 50 }}>
                                                            <Text style={{ color: '#fff', fontFamily: 'Poppins Medium', fontSize: 13, textAlign: 'center', marginBottom: 1 }}>{ServiceConstant.get_notf_count()}</Text>
                                                        </View>
                                                        :
                                                        null
                                                }

                                            </View>
                                        </TouchableOpacity>
                                    }
                                    {
                                        data && data.length === 0 && <View style={styles.bell} >
                                            <Image style={{ height: 53, width: 53 }} source={require('../assets/images/icons/bell.png')} />
                                        </View>
                                    }
                                    <View style={styles.logoContainer}>
                                        <Image source={require('../assets/images/logoinapp/logoflat.png')} style={styles.logo} />
                                    </View>

                                    <View style={styles.info}>
                                        <View style={styles.nameContainer}>
                                            <Text style={styles.name}>{strings('Home Screen1')}</Text>
                                        </View>

                                        <View >
                                            {image.trim().length < 1 && <Image style={styles.profilePic} source={require('../assets/images/profile/profile.png')} />}
                                            {image.trim().length > 0 && <FastImage
                                                style={styles.profilePic}
                                                source={{
                                                    uri: image,
                                                    priority: FastImage.priority.normal,
                                                }}
                                                resizeMode={FastImage.resizeMode.cover}
                                            />}

                                        </View>
                                    </View>
                                    <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', right: 20, top: 10 }}>
                                        <Image source={require('../assets/images/tutorial_images/Arrow16.png')} style={{ width: 70, height: 70, resizeMode: 'contain', }} />
                                        <Text style={{ color: 'white', fontSize: 18, fontFamily: "Poppins Regular", }}>Tap here to go to your profile</Text>
                                    </View>
                                </ImageBackground>


                            </TouchableOpacity>
                       
                        :
                        null
                } 

                {
                    profile1
                        ?

                        <TouchableOpacity activeOpacity={1} onPress={() => handle_guide2()}  style={{ backgroundColor: 'rgba(0,0,0,0.8)', position: 'absolute', zIndex: 1, width: '100%', height: '100%', }}>
                          

                            {
                                data && data.length > 0 && <TouchableOpacity style={styles.bell} onPress={() => navigation.navigate('Notification', { brandImage: data[0].logo })}>
                                    <View>
                                        <Image style={{ height: 53, width: 53 }} source={require('../assets/images/icons/bell.png')} />
                                        {
                                            ServiceConstant.get_notf_count() != '0'
                                                ?
                                                <View style={{ position: 'absolute', height: 20, width: 20, backgroundColor: '#FF3A44', top: -4, right: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 50 }}>
                                                    <Text style={{ color: '#fff', fontFamily: 'Poppins Medium', fontSize: 13, textAlign: 'center', marginBottom: 1 }}>{ServiceConstant.get_notf_count()}</Text>
                                                </View>
                                                :
                                                null
                                        }

                                    </View>
                                </TouchableOpacity>
                            }
                            {
                                data && data.length === 0 && <View style={styles.bell} >
                                    <Image style={{ height: 53, width: 53 }} source={require('../assets/images/icons/bell.png')} />
                                </View>
                            }
                                <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', right: 10, top: 90 }}>
                                    <Image source={require('../assets/images/tutorial_images/Arrow16.png')} style={{ width: 70, height: 70, resizeMode: 'contain', }} />
                                    <Text style={{ color: 'white', fontSize: 18, fontFamily: "Poppins Regular", }}>Tap here to see your notifications.</Text>
                                </View>
                            


                        </TouchableOpacity>

                        :
                        null
                } 

                <View>
                    <ImageBackground source={require('../assets/images/banners/lands.png')} style={styles.banner} resizeMode="stretch">
                        {data && data.length > 0 && <TouchableOpacity style={styles.bell} onPress={()=>navigation.navigate('Notification',{brandImage:data[0].logo})}>
                            <View>
                                <Image style={{height:53, width: 53}} source={require('../assets/images/icons/bell.png')} />
                                {
                                    ServiceConstant.get_notf_count() != '0'
                                        ?
                                        <View style={{ position: 'absolute', height: 20, width: 20, backgroundColor: '#FF3A44', top: -4, right: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 50 }}>
                                            <Text style={{ color: '#fff', fontFamily: 'Poppins Medium', fontSize: 13, textAlign: 'center', marginBottom: 1 }}>{ServiceConstant.get_notf_count()}</Text>
                                        </View>
                                        :
                                        null
                                }

                            </View>
                            </TouchableOpacity>}
                        {data && data.length === 0 && <TouchableOpacity style={styles.bell} onPress={()=>navigation.navigate('Notification',{brandImage:null})}><Image style={{height:53, width: 53}} source={require('../assets/images/icons/bell.png')} /></TouchableOpacity>}
                        <View style={styles.logoContainer}>
                            <Image source={require('../assets/images/logoinapp/logoflat.png')} style={styles.logo} />
                        </View>
                        <View style={styles.info}>
                            <View style={styles.nameContainer}>
                                <Text style={styles.name}>{strings('Home Screen1')}</Text>
                            </View>
                            <TouchableOpacity onPress={() => navigation.navigate('UserProfile')}>
                                {image.trim().length < 1 && <Image style={styles.profilePic} source={require('../assets/images/profile/profile.png')} />}
                                {image.trim().length > 0 && <FastImage
                                    style={styles.profilePic}
                                    source={{
                                        uri: image,
                                        priority: FastImage.priority.normal,
                                    }}
                                    resizeMode={FastImage.resizeMode.cover}
                                />}

                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                   
                    {
                        profile || profile1
                        ?
                        null
                        :
                        data
                            ?
                            <>
                                {
                                    data && data.map((item, idx) => {
                                        return <RestaurantCard key={idx} name='Menu' navigation={navigation} data={item} />
                                    })
                                }
                                {
                                    data.length < 1 && <AddNewButton name='AddABusiness' title={strings('Home Screen2')} navigation={navigation} />
                                }
                            </>
                            :
                            <View style={styles.loading}><Text style={styles.loadingText}></Text></View>
                    }
                </View>
                <View style={{ marginBottom: 50 }}></View>
                <View style={styles.forwardArrow}></View>
            </ScrollView>
            {!online && <Offline/>}
           
            {data && data.length > 0 && <TouchableOpacity style={styles.qrbutton}  onPress={()=>navigation.navigate("Menu",{restaurant_id:data[0].restaurant_id, brandImage:data[0].cover, themeURL: data[0].theme_url, public_url: data[0].public_url})}>
                {
                    showtuts || profile || profile1
                    ?
                    null
                    :
                    <Image source={require('../assets/images/icons/forward.png')} style={{ height: 60, width: 60 }} />
                }
                
            </TouchableOpacity>}
        </SafeAreaView>
        
        
    )
}
const mapStataeToProps = state => {
    return {
        user_id: state.auth.user_id,
        token: state.auth.token,
        image: state.auth.image
    }
}
export default connect(mapStataeToProps, { logout, getRestaurants, getRestaurants, getNotifications })(HomeScreen)

const styles = StyleSheet.create({
    banner: {
        position: 'relative',
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(30),
        marginBottom: 30
    },
    logoContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: heightPercentageToDP(6.5)
    },
    logo: {
        width: 167,
        height: 22.5
    },
    bell: {
        position: 'absolute',
        top: heightPercentageToDP(5),
        right: widthPercentageToDP(3.5)
    },
    info: {
        marginTop: 20,
        paddingHorizontal: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    nameContainer: {
        flexBasis: widthPercentageToDP(60),
    },
    name: {
        lineHeight: 45,
        fontFamily: 'Poppins Medium',
        fontStyle: 'normal',
        fontSize: 37,
        color: '#FFFFFF'
    },
    loading: {
        marginTop: 50

    },
    loadingText: {
        textAlign: 'center',
        fontFamily: 'Poppins Medium',
        fontSize: 20
    },
    profilePic: {
        height: 70,
        width: 70,
        borderRadius: 70,
        borderWidth: 2,
        borderColor: '#fff',
        backgroundColor:'#fff'
    },
    qrbutton: {
        position: 'absolute',
        right: 25,
        top: heightPercentageToDP(84),
    

        borderRadius: 100,
        elevation: 5,
        //ios
        shadowColor: "#d4d4d4",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.05,
        shadowRadius: 3.84,
    },
    card:{
        backgroundColor: '#fff',
        borderRadius: 17,
        width: widthPercentageToDP(84),
        height: 115,
        padding: 10,
        marginHorizontal: widthPercentageToDP(8),
        marginTop: 20,
        elevation:2,
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
    subBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 97,
        height: '100%',
        backgroundColor:'#635CC910',
        borderRadius: 10,
    },
    new:{
        fontFamily: 'Poppins Medium',
        color: '#635CC9',
        fontSize: 15,
        marginLeft: 15
    },
    plus:{
        height: 25,
        width: 25
    }

})
