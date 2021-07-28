import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
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

//import Offline from '../components/Offline'
import { strings } from '../locales/i18n'

const HomeScreen = ({ navigation, logout, user_id, token, image, getRestaurants }) => {
    const [data, setdata] = useState(null)
    const [online, setonline] = useState(true)
   
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
            console.log("Mounted Home")
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

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
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
                    {data ? <>
                        {data && data.map((item, idx) => {
                            return <RestaurantCard key={idx} name='Menu' navigation={navigation} data={item} />
                        })}
                        {data.length < 1 && <AddNewButton name='AddABusiness' title={strings('Home Screen2')} navigation={navigation} />}
                    </> : <View style={styles.loading}><Text style={styles.loadingText}></Text></View>}
                </View>
                <View style={{ marginBottom: 50 }}></View>
                <View style={styles.forwardArrow}></View>
            </ScrollView>
            {!online && <Offline/>}
            {data && data.length > 0 && <TouchableOpacity style={styles.qrbutton}  onPress={()=>navigation.navigate("Menu",{restaurant_id:data[0].restaurant_id, brandImage:data[0].cover, themeURL: data[0].theme_url, public_url: data[0].public_url})}>
                <Image source={require('../assets/images/icons/forward.png')} style={{ height: 60, width: 60 }} />
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
    }

})
