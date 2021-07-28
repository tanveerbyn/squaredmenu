import React, { useRef, useState } from 'react'
import {StyleSheet, Text, View, SafeAreaView, Image, ImageBackground, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import HeaderSVG from '../components/HeaderSVG'
import MenuButtons from '../components/MenuButtons'
import NewMenuButton from '../components/NewMenuButton'
import SubMenu from '../components/SubMenu'
import RBSheet from "react-native-raw-bottom-sheet";
import ThemeChooser from '../components/ThemeChooser'
import { WebView } from 'react-native-webview';
import { Platform } from 'react-native'
import { strings } from '../locales/i18n'

const MenuPreview = ({navigation, route}) => {
    const [loading, setloading] = useState(true)
    const refRBSheet = useRef();
    console.log(route.params.themeURL)
    return (
        <SafeAreaView style={{backgroundColor:'#fff', flex:1, overflow:'hidden'}}>
            {!loading && <View style={styles.exitBtn}>
                <TouchableOpacity style={styles.exbt} onPress={()=>{navigation.goBack()}}>
                    <Text style={styles.btnText}>{strings('Business Home Screen3')}</Text>
                </TouchableOpacity>
            </View>}
            {/* {loading && <View style={{flexDirection:'column', justifyContent:'center', height:'100%'}}>
                <Text style={{fontFamily:'Poppins Medium', fontSize: 20, textAlign:'center'}}>Loading...</Text>
            </View>} */}
           <WebView
                source={{ uri:route.params.themeURL}} 
                onLoadEnd={()=>setloading(false)}
                startInLoadingState={true}
                renderLoading={() => <View style={{flexDirection:'column', justifyContent:'center', height:'100%'}}>
                                        <ActivityIndicator size="large" color="#635cc9" />
                                    </View>}
            />
        </SafeAreaView>
    )
}

export default MenuPreview

const styles = StyleSheet.create({
    banner:{
        position: 'relative',
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(30),
        marginBottom: 25
    },
    logoContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        marginTop: heightPercentageToDP(8.5)
    },
    logo:{
        flexDirection: 'row',
        justifyContent:'center',
        marginTop: 20
    },
    nameContainer:{
        flexBasis: widthPercentageToDP(66),
        flexDirection:'column'
    },
    name:{
        flexWrap:'wrap',
        fontFamily: 'Poppins Medium',
        fontStyle: 'normal',
        fontSize: 21,
        color: '#FFFFFF',
        lineHeight:40
    },
    bell:{
        position:'absolute',
        top: heightPercentageToDP(5),
        left:widthPercentageToDP(3.5),
        transform: [{ rotate: '180deg'}]
    },
    info:{
        marginTop:heightPercentageToDP(14)-40,
        paddingHorizontal: 20,
        display:'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    nameContainer:{
        flexBasis: widthPercentageToDP(70),
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
    mainBody:{
        marginHorizontal: 28
    },
    menuName:{
        color:'#000',
        fontFamily: 'Poppins Medium',
        fontSize: 37
    },
    container:{
        backgroundColor: '#f0effa',
        paddingBottom: 0,
        position: 'absolute',
        width: '100%',
        bottom: 0
    },
    brushImage:{
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: -35,
        // marginBottom: 20
        
    },
    round:{
        borderRadius: 40,
        backgroundColor: '#f0effa',
        padding: 10,
        elevation: 5
    },
    brush:{
        height: 50,
        width: 50,
        resizeMode: 'contain'
    },
    exitBtn:{
        position: 'absolute',
        top: Platform.OS==='ios'?55:45,
        right: 3,
        zIndex: 1
    },
    exbt:{
        backgroundColor: '#fff',
        paddingHorizontal: 18,
        paddingVertical: 7,
        borderRadius: 23,
       
      
    },
    btnText:{
        color: '#635cc9',
        fontFamily: 'Poppins SemiBold',
        fontSize: 16
    }
})
