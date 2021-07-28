import React, { useEffect, useState, useCallback } from 'react'
import { ScrollView } from 'react-native'
import { StyleSheet, Text, View, SafeAreaView, Image, ImageBackground, TouchableOpacity } from 'react-native'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { connect } from 'react-redux'
import AddNewButton from '../components/AddNewButton'
import RestaurantCard from '../components/RestaurantCard'
import { getNotifications, logout, } from '../store/action'
import { useFocusEffect } from '@react-navigation/native';
import FastImage from 'react-native-fast-image'
import moment from 'moment'
import HeaderSVG from '../components/HeaderSVG'
import axios from 'axios';
import { ServiceConstant } from './ServiceConstant';
import { strings } from '../locales/i18n'


const Notifications = ({ navigation, logout, user_id, token, image, getNotifications, route }) => {

    const [data, setdata] = useState(null)
    const [numLines, setNumLines] = useState(3);

    const toggleTextShown = (indx) => {
        console.log('index', indx)
        let arr = [...data]   
        arr.map((item, index) => {
            if (index == indx) {
                item['isSelected'] = !item['isSelected']
            }
            
        })
        console.log('arr', arr)
        setdata(arr)
    };



    useEffect(async () => {
        var bodyFormData = new FormData();
        bodyFormData.append('user_id', user_id);
        bodyFormData.append('token', token);
        const res = await getNotifications(bodyFormData)
        setdata(res.data.data)
        
        readNotification()
        ServiceConstant.set_notf_count(res.data.unread_count)
    }, [])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            console.log("Mounted Home")
            var bodyFormData = new FormData();
            bodyFormData.append('user_id', user_id);
            bodyFormData.append('token', token);
            const res = await getNotifications(bodyFormData)
            setdata(res.data.data)
            reformatData(res.data.data)
            ServiceConstant.set_notf_count(res.data.unread_count)
        });

        return unsubscribe;
    }, [navigation]);

    const deleteNotification = async (item) => {
        console.log("item===>", item)

        var bodyFormData = new FormData();
        bodyFormData.append('user_id', user_id);
        bodyFormData.append('token', token);
        bodyFormData.append('id', item.id);
        const res = await axios({
            method: 'post',
            url: `https://admin.squaredmenu.com/api/restaurant/delete-notification`, data: bodyFormData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        console.log("Delete Notif response =>", res.data.status)
        if (res.data.status == true) {
            const res = await getNotifications(bodyFormData)
            setdata(res.data.data)
            ServiceConstant.set_notf_count(res.data.unread_count)
        }
    }

    const deleteAllNotifications = async () => {
        var bodyFormData = new FormData();
        bodyFormData.append('user_id', user_id);
        bodyFormData.append('token', token);
        const res = await axios({
            method: 'post',
            url: `https://admin.squaredmenu.com/api/restaurant/delete-all-notifications`, data: bodyFormData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        console.log("DeleteAll Notif response =>", res.data.status)
        if (res.data.status == true) {
            const res = await getNotifications(bodyFormData)
            setdata(res.data.data)
            ServiceConstant.set_notf_count(res.data.unread_count)
        }
    }

    const readNotification = async () => {
        var bodyFormData = new FormData();
        bodyFormData.append('user_id', user_id);
        bodyFormData.append('token', token);
        const res = await axios({
            method: 'post',
            url: `https://admin.squaredmenu.com/api/restaurant/read-notification`, data: bodyFormData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        console.log("Read Notif response =>", res.data)
    }

    const reformatData = (data) => {

        let arr = [...data]
        arr.map((item, index) => {
            item['isSelected'] = false
        })
        setdata(arr)
        console.log('from reformat==>', data)
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View>
                    {route.params.brandImage && <HeaderSVG uri={route.params.brandImage} />}
                    {/* Change the below header */}
                    {!route.params.brandImage && <Image source={require('../assets/images/banners/lands.png')} style={styles.bannerIMG} resizeMode="stretch" />}
                    <View style={styles.banner}>
                        <TouchableOpacity
                            style={styles.bell}
                            onPress={() => navigation.goBack()}
                        >
                            <Image source={require('../assets/images/topbar/back.png')} style={{ height: 42, width: 42 }} />
                        </TouchableOpacity>
                        <View style={styles.info}>
                            <View style={styles.nameContainer}>
                            <Text style={styles.name}>{strings('Notifications1')}</Text>
                            </View>
                            <TouchableOpacity onPress={() => deleteAllNotifications()}>
                                <Image style={styles.profilePic} source={require('../assets/images/icons/notif.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {data && data.map((item, idx) => {
                        return <>
                            <View style={styles.notiCard} key={idx}>
                                <View style={styles.activity}></View>
                                <View style={styles.message}>
                                    <Text numberOfLines={item.isSelected ? undefined : numLines} style={styles.mainText}>{item.data}</Text>
                                    <TouchableOpacity onPress={()=> toggleTextShown(idx)}>
                                        <Text style={{ fontSize: 11, fontWeight: '500', fontFamily: 'Poppins Medium', }}>
                                            {item.isSelected  ? 'Read Less...' : 'Read More...'}
                                        </Text>
                                    </TouchableOpacity>
                                    <Text style={styles.duration}>{moment(item.created_at).fromNow()}</Text>

                                    <TouchableOpacity onPress={() => deleteNotification(item)} style={{ marginTop: 8 }}>
                                        <Image style={{ width: 15, height: 15 }} source={require('../assets/images/icons/delete.png')} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </>
                    })}
                    {data && data.length === 0 && <View style={{ flexDirection: 'column', justifyContent: 'center', height: 300 }}>
                    <Text style={{textAlign: 'center', fontFamily: 'Poppins Medium', color: '#00000050'}}>{strings('Notificaitions2')}</Text>
                    </View>}
                </View>
                <View style={{ marginBottom: 50 }}></View>
            </ScrollView>
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
export default connect(mapStataeToProps, { logout, getNotifications, getNotifications, })(Notifications)

const styles = StyleSheet.create({
    bannerIMG: {
        position: 'absolute',
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(30),
    },
    banner: {
        position: 'relative',
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(30),
        marginBottom: 30,
        flexDirection: 'column',
        justifyContent: 'center',
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
        //transform: [{ rotate: '180deg'}]
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
        lineHeight: 37 * 0.75,
        paddingTop: 40 - 35 * 0.75,
        fontFamily: 'Poppins Medium',
        fontStyle: 'normal',
        fontSize: widthPercentageToDP(8.8),
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
        height: 46,
        width: 46,
        marginBottom: 10
    },
    notiCard: {
        marginHorizontal: 13,
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 6,
        marginBottom: 12
    },
    activity: {
        backgroundColor: '#635CC9',
        height: '100%',
        width: 6,
        borderRadius: 10
    },
    message: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        paddingVertical: 21,
        paddingLeft: 10, paddingHorizontal: 8
    },
    mainText: {
        fontFamily: 'Poppins Regular',
        fontSize: 15
    },
    duration: {
        fontFamily: 'Poppins Regular',
        fontSize: 10,
        color: '#989898'
    },


})
