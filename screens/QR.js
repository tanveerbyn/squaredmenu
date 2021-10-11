import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, ImageBackground, TouchableOpacity, ScrollView, Linking, Alert } from 'react-native'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import HeaderSVG from '../components/HeaderSVG'
import MenuSection from '../components/MenuSection'
import FastImage from 'react-native-fast-image'
import { generateQR, sendQrOverMail } from '../store/action'
import { connect } from 'react-redux'
import { Button } from 'react-native-elements'
import Clipboard from '@react-native-clipboard/clipboard';
import { strings } from '../locales/i18n'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dimensions } from 'react-native'

const QR = ({navigation, generateQR, sendQrOverMail, token, user_id, route}) => {
    console.log("brandimage",route.params)
    console.log('user_id', user_id)
    console.log('token', token)
    console.log('restaurant_id', route.params.restaurant_id)
    const [myQrLink, setMyQrLink] = useState(null)
    const [loading, setloading] = useState(false)
    const [copiedText, setCopiedText] = useState('');
    const [showtuts, setGuide] = useState(true)
    const [profile, setProfile] = useState(false)
    
    useEffect(async()=> {
        let res = await AsyncStorage.getItem('qropnmenu')
        let result= JSON.parse(res)    
        if(result == false) {
          setGuide(false)
        }
      },[])

      useEffect(async()=> {
        let res = await AsyncStorage.getItem('printpdf')
        let result= JSON.parse(res)
        if(result == false) {
          setProfile(false)
        }
      },[])

    useEffect(() => {
        getQR()
    }, []);

    const getQR = async () => {
       
        var bodyFormData = new FormData();
        console.log('user_id', user_id)
        console.log('token', token)
        console.log('restaurant_id', route.params.restaurant_id)
        bodyFormData.append('user_id', user_id);
        bodyFormData.append('token', token);
        bodyFormData.append('restaurant_id', route.params.restaurant_id);
        const res = await generateQR(bodyFormData)
        console.log('res qr', res.data)
        setMyQrLink(res.data.data)
    }
    const browseQR = async () => {
        var bodyFormData = new FormData();
        bodyFormData.append('user_id', user_id);
        bodyFormData.append('token', token);
        bodyFormData.append('restaurant_id', route.params.restaurant_id);
        const res = await generateQR(bodyFormData)
        if(res.data.status){
            // Linking.openURL(res.data.data)
            Clipboard.setString(res.data.data.public_url);
            alert('Copied to Clipboard!');
        }else{
            
            alert(res.data.message)
        }
    }
    const getQRByMail = async () => {
        setloading(true)
        var bodyFormData = new FormData();
        bodyFormData.append('user_id', user_id);
        bodyFormData.append('token', token);
        bodyFormData.append('restaurant_id', route.params.restaurant_id);
        const res = await sendQrOverMail(bodyFormData)
        setloading(false)
        if(res.data.status){
            console.log('0---', res.data.message)
            
            Alert.alert(
                `${strings('Alert1')}`,
                " ",
                [
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
              );
        }else{
            
            alert(res.data.message)
        }
    }

    const handle_guide =  (res) => {
        setGuide(false)
        setProfile(true)
        AsyncStorage.setItem('qropnmenu', JSON.stringify(false))
     }

     const handle_guide1 =  (res) => {   
        setProfile(false) 
        AsyncStorage.setItem('printpdf', JSON.stringify(false))
     }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {
                    showtuts
                    ?
                    <TouchableOpacity activeOpacity={1} onPress={() => handle_guide()} style={{ backgroundColor: 'rgba(0,0,0,0.8)', position: 'absolute', zIndex: 1, width: '100%', height: '100%', }}>
                    <View style={styles.banner} >


                        <View style={styles.previewBTN} >
                            <Text style={styles.preview}>{strings('QR Code Screen2')}</Text>
                        </View>
                        <View style={{ alignItems: 'flex-end', marginHorizontal: 10 }}>
                            <Image source={require('../assets/images/tutorial_images/Arrow16.png')} style={{ width: 70, height: 70, resizeMode: 'contain', top: 100 }} />
                            <Text style={{ color: 'white', fontSize: 18, fontFamily: "Poppins Regular", top: 100, }}>{'Tap here to view your menu as a customer'}</Text>
                        </View>

                    </View>
                </TouchableOpacity>
                :
                null
                }
               
               {
                   profile
                   ?
                   <TouchableOpacity activeOpacity={1} onPress={() => handle_guide1()} style={{ backgroundColor: 'rgba(0,0,0,0.8)', position: 'absolute', zIndex: 1, width: '100%', height: '100%', }}>

                   <View style={{ flex: 1, marginTop: Dimensions.get('screen').height / 1.7 }}>
                       <View style={{ alignItems: 'center', marginHorizontal: 13, bottom: 50 }}>
                           <Image source={require('../assets/images/tutorial_images/Arrowdown1.png')} style={{ width: 70, height: 70, resizeMode: 'contain', top: 100 }} />
                           <Text style={{ color: 'white', fontSize: 18, fontFamily: "Poppins Regular", bottom: 30 }}>{'Tap here to get your QR codes as PDF on your email'}</Text>
                       </View>
                       {!loading && <TouchableOpacity style={styles.btn2} onPress={()=> handle_guide1()}>
                           <Text style={styles.btnText2}>{strings('QR Code Screen5')}</Text>
                       </TouchableOpacity>}
                   </View>

               </TouchableOpacity>
               :
               null
               }
               

                <HeaderSVG uri={route.params.img}/>
                <View  style={styles.banner} >
                    <TouchableOpacity 
                        style={styles.bell}
                        onPress={()=>navigation.goBack()}
                    >
                        <Image source={require('../assets/images/topbar/back.png')} style={{height:42, width:42}}/>
                    </TouchableOpacity>
                    <View style={styles.logoContainer}><Image source={require('../assets/images/logoinapp/logoflat.png')} style={styles.logo} /></View>
                    <TouchableOpacity style={styles.previewBTN} onPress={() => Linking.openURL(route.params.url)}>
                        <Text style={styles.preview}>{strings('QR Code Screen2')}</Text>
                    </TouchableOpacity>
                    <View style={styles.info}>
                        <View style={styles.nameContainer}>
                            <Text style={styles.name}>{strings('QR Code Screen1')}</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={styles.QRcontainer} onPress={getQRByMail}>
                    <FastImage
                        style={styles.qrBox}
                        source={{uri : myQrLink ? myQrLink.qrcode_url : ''}}
                        
                    />
                </TouchableOpacity>
                <Text style={styles.hint}>{strings('QR Code Screen3')}</Text>
                <TouchableOpacity style={styles.btn1} onPress={browseQR}>
                    <Text style={styles.btnText1}>{strings('QR Code Screen4')}</Text>
                </TouchableOpacity>
                {!loading && <TouchableOpacity style={styles.btn2} onPress={getQRByMail}>
                    <Text style={styles.btnText2}>{strings('QR Code Screen5')}</Text>
                </TouchableOpacity>}
                {loading && <TouchableOpacity style={styles.btn2} onPress={getQRByMail}>
                    <Text style={styles.btnText2}>{strings("Generating")}</Text>
                </TouchableOpacity>}
                <View style={{marginBottom:97}}></View>
            </ScrollView>
        </SafeAreaView>
    )
}
const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        user_id: state.auth.user_id
    }
}
export default connect(mapStateToProps,{generateQR, sendQrOverMail})(QR)

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff'
    },
    banner:{
        position: 'relative',
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(30),
        marginBottom: 25
    },
    logo: {
        width: 167,
        height: 22.5
    },
    bell:{
        position:'absolute',
        top: heightPercentageToDP(5),
        left:widthPercentageToDP(3.5),
        //transform: [{ rotate: '180deg'}]
    },
    info:{
        marginTop:heightPercentageToDP(8),
        paddingHorizontal: 20,
        display:'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    
    nameContainer:{
        flexBasis: widthPercentageToDP(60),
        flexDirection:'row'
    },
    name:{
        flexWrap:'wrap',
        fontFamily: 'Poppins Medium',
        fontStyle: 'normal',
        fontSize: 37,
        color: '#FFFFFF',
        lineHeight:40
    },
    menuName:{
        flexWrap:'wrap',
        fontFamily: 'Poppins Medium',
        fontStyle: 'normal',
        fontSize: 37,
        color: '#FFFFFF',
        lineHeight:40
    },
    card:{
        backgroundColor: '#fff',
        borderRadius: 17,
        width: widthPercentageToDP(84),
        height: 115,
        padding: 10,
        marginHorizontal: widthPercentageToDP(8),
        marginTop: 40,
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
    plus:{
        height: 13,
        width: 13,
    },
    logoContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        marginTop: heightPercentageToDP(1.5),
        marginBottom: heightPercentageToDP(3)
    },
    QRcontainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 15,
    },
    qrBox:{
        width: widthPercentageToDP(70), 
        height: widthPercentageToDP(70),
        borderWidth: 3,
        borderColor: '#726AE9',
        borderRadius: 30,
        elevation: 3, 
       
    },
    hint: {
        fontFamily: 'Poppins Regular',
        fontSize: 13,
        textAlign: 'center',
        color: '#989898',
        marginTop: 9
    },
    btn1:{
        backgroundColor: '#635CC9',
        paddingBottom: 17,
        paddingTop: 19,
        marginHorizontal: 28,
        borderRadius: 58,
        marginTop: 29,
        borderColor: '#635CC9',
        borderWidth: 2
    },
    btnText1:{
        color: '#fff',
        fontSize: 15,
        fontFamily: 'Poppins Medium',
        textAlign: 'center'
    },
    btn2:{
        backgroundColor: '#fff',
        paddingVertical: 18,
        marginHorizontal: 28,
        borderRadius: 58,
        marginTop: 10,
        borderColor: '#635CC9',
        borderWidth: 2
    },
    btnText2:{
        color: '#635CC9',
        fontSize: 15,
        fontFamily: 'Poppins Medium',
        textAlign: 'center'
    },
    previewBTN: {
        backgroundColor: '#fff',
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
        color: '#635CC9'
    },
})
