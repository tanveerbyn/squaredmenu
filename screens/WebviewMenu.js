import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator
} from "react-native";
import { WebView } from 'react-native-webview';

const WebMenu = ({ navigation}) => {
    const [loading, setloading] = useState(true)
    return (
        <SafeAreaView  style={{backgroundColor:'#fff', flex:1, }}>
             {!loading && <View style={styles.exitBtn}>
                <TouchableOpacity style={styles.exbt} onPress={()=>{navigation.goBack()}}>
                    <Image source={require('../assets/images/tutorial_images/closenew.png')} style={{width:60, height:60,  resizeMode:'contain',}}/>
                    
                </TouchableOpacity>
            </View>}
             <WebView
                source={{ uri: 'https://squaredmenu.com/menu-creation.html'}} 
                onLoadEnd={()=>setloading(false)}
                startInLoadingState={true}
                renderLoading={() => <View style={{flexDirection:'column', justifyContent:'center', height:'100%'}}>
                                        <ActivityIndicator size="large" color="#635cc9" />
                                    </View>}
            />
        </SafeAreaView>
    )
}

export default  WebMenu;

const styles = StyleSheet.create({
  
  
    exitBtn:{
        position: 'absolute',
        top: Platform.OS==='ios'?20:0,
        right: 0,
        zIndex: 1
    },
    exbt:{
        //backgroundColor: '#fff',
       // paddingHorizontal: 18,
        //paddingTop: 8,
        borderRadius: 23,
       
      
    },
    btnText:{
        color: '#635cc9',
        fontFamily: 'Poppins SemiBold',
        fontSize: 16
    }
})
