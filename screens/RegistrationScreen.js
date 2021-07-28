import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  TextInput,
  
} from 'react-native';
import {Button} from 'react-native-elements'
import Bg1 from '../assets/images/banners/bg1.svg'
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Linking } from 'react-native';
import SocialMediaIcon from '../components/SocialMediaIcon';
import { register, signInAPIGoogle, signInAPIApple } from '../store/action';
import { connect } from 'react-redux';
import { ToastAndroid } from 'react-native';
import { getBaseOs,getModel,getDeviceName } from 'react-native-device-info';
import { Platform } from 'react-native';
import { GoogleSignin } from '@react-native-community/google-signin';
import Google from '../assets/images/icons/googleicon.svg'
import Facebook from '../assets/images/icons/facebookicon.svg'
import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk';
import { SafeAreaView } from 'react-native';
import appleAuth, {
  AppleButton,
  AppleAuthError,
  AppleAuthRequestScope,
  AppleAuthRequestOperation,
} from '@invertase/react-native-apple-authentication'
import { ServiceConstant } from './ServiceConstant'
import { strings } from '../locales/i18n';

GoogleSignin.configure({
  webClientId:"955337206220-m86af8e49jddlbqllk3bo3gm2aqegho8.apps.googleusercontent.com",
  
  // offlineAccess: true
})
var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

const RegistrationScreen = ({navigation, register, signInAPIGoogle, signInAPIApple}) => {
    const [iceye, setIceye] = React.useState("visibility-off");
    const [showPassword, setShowPassword] = React.useState(true);
    const [iceye1, setIceye1] = React.useState("visibility-off");
    const [showPassword1, setShowPassword1] = React.useState(true);
    const [name, onChangeName] = React.useState("");
    const [number, onChangeNumber] = React.useState("");
    const [email, onChangeEmail] = React.useState("");
    const [password, onChangePassword] = React.useState("");
    const [password1, onChangePassword1] = React.useState("");
    const [error, setError] = React.useState("");
    const [clicked, setclicked] = React.useState(false);
    const [promocode, onChangePromocode] = React.useState("");
    const [userGoogleInfo, setUserGoogleInfo] = React.useState({});
    const [loaded, setLoaded] = React.useState(false);
    const [userFacebookInfo, setUserFacebookInfo] = React.useState({});
  
    const onAppleButtonPress = async () => {
      try {
        const appleAuthRequestResponse = await appleAuth.performRequest({
          requestedOperation: appleAuth.Operation.LOGIN,
          requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        });
        console.log("response =>",appleAuthRequestResponse)
        // get current authentication state for user
        // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
        const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
      
        // use credentialState response to ensure the user is authenticated
        if (credentialState === appleAuth.State.AUTHORIZED) {
          // user is authenticated
  
          let userInfo = {
            email: appleAuthRequestResponse.email,
            name: `${appleAuthRequestResponse.fullName.givenName} ${appleAuthRequestResponse.fullName.familyName}`,
            identityToken: appleAuthRequestResponse.identityToken,
            user: appleAuthRequestResponse.user
          }
          let device_os = Platform.OS;
          let device_model = await getModel();
          let device_name = await getDeviceName();
          var bodyFormData = new FormData();
          bodyFormData.append('sm_id', userInfo.user);
          bodyFormData.append('platform', 'apple');
          bodyFormData.append('name', userInfo.name);
          bodyFormData.append('email', userInfo.email);
          // bodyFormData.append('image', "");
          bodyFormData.append('firebase_token', ServiceConstant.get_fcm_Token());
          bodyFormData.append('device_name', device_name);
          bodyFormData.append('device_modal', device_model);
          bodyFormData.append('device_os', device_os);
  
          const res = await signInAPIApple(bodyFormData)
          if(res.data.status){
            if(Platform.OS === 'android'){
              ToastAndroid.showWithGravity(
              res.data.message,
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM
            )
            }else{
              AlertIOS.alert(res.data.message)
            }
          }else{
            if(Platform.OS === 'android'){
              ToastAndroid.showWithGravity(
              res.data.message,
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM
            )
            }else{
              AlertIOS.alert(res.data.message)
            }
          }
        }
      }catch (error) {
        if (error.code === AppleAuthError.CANCELED) {
          console.log("User Cancelled Login with Apple")
      
        } else {
          console.log("error apple login =>", error)
        }
      }
   }
    const signinWithGoogle = async () => {
      try{
        await GoogleSignin.hasPlayServices()
        const userInfo = await GoogleSignin.signIn()
        setUserGoogleInfo(userInfo)
        console.log("Google Success =>",userInfo)
  
        //Begin Signin to API
        let device_os = Platform.OS;
        let device_model = await getModel();
        let device_name = await getDeviceName();
        var bodyFormData = new FormData();
        bodyFormData.append('sm_id', userInfo.user.id);
        bodyFormData.append('platform', 'google');
        bodyFormData.append('name', userInfo.user.name);
        bodyFormData.append('email', userInfo.user.email);
        bodyFormData.append('image', userInfo.user.photo);
        bodyFormData.append('firebase_token', ServiceConstant.get_fcm_Token());
        bodyFormData.append('device_name', device_name);
        bodyFormData.append('device_modal', device_model);
        bodyFormData.append('device_os', device_os);
        const res = await signInAPIGoogle(bodyFormData, "google")
        if(res.data.status){
          if(Platform.OS === 'android'){
            ToastAndroid.showWithGravity(
            res.data.message,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          )
          }else{
            AlertIOS.alert(res.data.message)
          }
        }else{
          if(Platform.OS === 'android'){
            ToastAndroid.showWithGravity(
            res.data.message,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          )
          }else{
            AlertIOS.alert(res.data.message)
          }
        }
    
      }catch(err){
        console.log("Error Google Signin =>", err)
      }
    }
    const getInfoFromToken = async token => {
      const PROFILE_REQUEST_PARAMS = {
        fields: {
          string: 'id,name,first_name,last_name, email, picture',
        },
      };
      const profileRequest = new GraphRequest(
        '/me',
        {token, parameters: PROFILE_REQUEST_PARAMS},
        async (error, user) => {
          if (error) {
            console.log('login info has error: ' + error);
          } else {
            setUserFacebookInfo(user);
            console.log('result:', user);
            let device_os = Platform.OS;
            let device_model = await getModel();
            let device_name = await getDeviceName();
            var bodyFormData = new FormData();
            bodyFormData.append('sm_id', user.id);
            bodyFormData.append('platform', 'facebook');
            bodyFormData.append('name', user.name);
            bodyFormData.append('email', user.email);
            bodyFormData.append('image', user.picture.data.url);
            bodyFormData.append('firebase_token', ServiceConstant.get_fcm_Token());
            bodyFormData.append('device_name', device_name);
            bodyFormData.append('device_modal', device_model);
            bodyFormData.append('device_os', device_os);
            const res = await signInAPIGoogle(bodyFormData,"facebook")
            if(res.data.status){
              if(Platform.OS === 'android'){
                ToastAndroid.showWithGravity(
                res.data.message,
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
              )
              }else{
                AlertIOS.alert(res.data.message)
              }
            }else{
              if(Platform.OS === 'android'){
                ToastAndroid.showWithGravity(
                res.data.message,
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
              )
              }else{
                AlertIOS.alert(res.data.message)
              }
            }
          
          }
        },
      );
      new GraphRequestManager().addRequest(profileRequest).start();
    };
  
    const loginWithFacebook = () => {
      // Attempt a login using the Facebook login dialog asking for default permissions.
      LoginManager.logInWithPermissions(['public_profile','email']).then(
        login => {
          if (login.isCancelled) {
            console.log('Login cancelled');
          } else {
            AccessToken.getCurrentAccessToken().then(data => {
              const accessToken = data.accessToken.toString();
              getInfoFromToken(accessToken);
            });
          }
        },
        error => {
          console.log('Login fail with error: ' + error);
        },
      );
    };
    const beginRegitration = async () => {
      if(name.trim().length < 1){
        setError("Enter Name")
        return
      }else if(email.trim().length < 1){
        setError("Enter Email")
        return
      }else if(password.trim().length < 1){
        setError("Enter Password")
        return
      }else if(password !== password1){
        setError("Password does not match.")
        return
      }else if(!strongRegex.test(password)){
        setError("Please choose a stronger password, e.g. John@123, Smith$456")
        return
      }else if(number.trim().length < 1){
        setError("Enter Contact Number")
        return
      }
      setclicked(true)
      var bodyFormData = new FormData();
      bodyFormData.append('name', name);
      bodyFormData.append('phone', number);
      bodyFormData.append('email', email);
      bodyFormData.append('password', password);
      if(promocode.trim().length > 0){
        bodyFormData.append('promo_code', promocode);
      }
      const res = await register(bodyFormData)
      setclicked(false)
      // navigation.navigate('ThankYouRegistration')
      if(res.data.status){
        ToastAndroid.showWithGravity(
          res.data.message,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        )
        navigation.navigate('ThankYouRegistration')
      }else{
          ToastAndroid.showWithGravity(
            res.data.message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM
          )
      }
    }
    changePwdType = () => {
      if (showPassword) {
        setIceye('visibility')
        setShowPassword(false)
      } else {
        setIceye('visibility-off')
        setShowPassword(true)
      }
    };
    changePwdType1 = () => {
      if (showPassword1) {
        setIceye1('visibility')
        setShowPassword1(false)
      } else {
        setIceye1('visibility-off')
        setShowPassword1(true)
      }
    };
  return (
    <SafeAreaView style={{flex:1}}>
    <ScrollView>
  {/* <Bg1
  height={hp('40%')}
  width={wp('100%')}
    style={{
      position: 'absolute',
        
    }}
    resizeMode="stretch"
    
    
    /> */}
                     <Image source={require('../assets/images/banners/addABuisness.png')} style={styles.banner}/>

     
       
        <View style={styles.topElements}>
          <TouchableOpacity style={styles.button} onPress={()=>navigation.goBack()}>
            <Image
              source={require('../assets/images/topbar/back.png')}
              style={styles.button_image}
              
            />
          </TouchableOpacity>
          <View style={styles.logoflat}>
            <Image
              source={require('../assets/images/logoinapp/logoflat.png')}
              style={styles.logo}
            />
          </View>
        </View>

        <View style={styles.heading}>
          <Text style={styles.headingText}>{strings('Sign Up Screen8')}</Text>
        </View>
    
    <View style={styles.inputFields}>
      <Text style={{textAlign:'center', color:'red', fontFamily: 'Poppins Bold'}}>{error}</Text>
    <TextInput
        style={styles.input}
        onChangeText={onChangeName}
        value={name}
        placeholder={strings('Sign Up Screen1')}
        textAlign="center"
        placeholderTextColor="#635CC9"
        
      />
    <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        value={email}
        placeholder={strings('Sign Up Screen2')}
        textAlign="center"
        placeholderTextColor="#635CC9"
        autoCapitalize="none"
      />
       <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder={strings('Sign Up Screen3')}
        textAlign="center"
        placeholderTextColor="#635CC9"
        keyboardType="phone-pad"
      />
      {/* <View style={styles.hintBox}>
        <Text style={styles.hint}>Password should have</Text>
        <Text style={styles.hint}>atleast 1 lowercase alphabet,</Text>
        <Text style={styles.hint}>atleast 1 uppercase alphabet,</Text>
        <Text style={styles.hint}>atleast 1 numeric character,</Text>
        <Text style={styles.hint}>one special character,</Text>
        <Text style={styles.hint}>minimum 8 character</Text>
      </View> */}
      <View style={{position:'relative'}}>
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
          value={password}
          placeholder={`${strings('Sign Up Screen4')} e.g. John@123`}
          textAlign="center"
          placeholderTextColor="#635CC9"
          secureTextEntry={showPassword}

        />
        <Icon style={styles.showicon}
            name={iceye}
            size={26}
            color='#635CC9'
            onPress={changePwdType}
        />
      </View>
      <View style={{position:'relative'}}>
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword1}
          value={password1}
          placeholder={strings('Sign Up Screen5')}
          textAlign="center"
          placeholderTextColor="#635CC9"
          secureTextEntry={showPassword1}

        />
        <Icon style={styles.showicon}
            name={iceye1}
            size={26}
            color='#635CC9'
            onPress={changePwdType1}
        />
      </View>
      <TextInput
        style={styles.input}
        onChangeText={onChangePromocode}
        value={promocode}
        placeholder={strings('Sign Up Screen6')}
        textAlign="center"
        placeholderTextColor="#635CC9"
        
      />
     <Button
  
        title={strings('Sign Up Screen7')}
        titleStyle={{ fontSize: 15 }}
        buttonStyle={styles.btn1}
        containerStyle={{marginTop:10}} 
        onPress={()=>beginRegitration()}
        loading={clicked}
      />
        
        <Text style={styles.forgotText}>or register using</Text>
        <View style={styles.socialMedia}>
          <TouchableOpacity onPress={loginWithFacebook}>
            <Image
                style={styles.icon}
              source={require('../assets/images/icons/facebook.png')}
              />
          </TouchableOpacity>
          <TouchableOpacity onPress={signinWithGoogle}>
            <Image
             style={styles.icon}

            source={require('../assets/images/icons/google.png')}
            />
          </TouchableOpacity>
          {Platform.OS === "ios" && <TouchableOpacity onPress={onAppleButtonPress} style={styles.appleBtnContainer}>
            <Image
             style={styles.appleButton}

            source={require('../assets/images/icons/apple.png')}
            />
          </TouchableOpacity>}
        </View>
      {/* <Text onPress={()=>navigation.navigate('RegisterPromoCode')} style={styles.bottomText}>Register using promo code</Text> */}
      <View style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
        <TouchableOpacity onPress={()=>{Linking.openURL("https://www.squaredmenu.com/privacy.html")}}>
          <Text style={styles.registerText}>Policy </Text>
        </TouchableOpacity>
        <Text style={{...styles.registerText, color :'gray'}}>and</Text>
        <TouchableOpacity onPress={()=>{Linking.openURL("https://www.squaredmenu.com/terms.html")}}>
          <Text style={styles.registerText}> T&C</Text>
        </TouchableOpacity>
      </View>
        
    </View>

    </ScrollView>
    </SafeAreaView>
  );
};

export default connect(null, {register, signInAPIGoogle, signInAPIApple})(RegistrationScreen);

const styles = StyleSheet.create({
  banner: {
    position: 'absolute',
    width: wp(100),
    height: hp(36),
    marginBottom: 30,
  },
  heading: {
 
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    marginBottom: 40,
    marginLeft: 15,
  },
  headingText: {
    color: 'white',
    fontFamily: 'Poppins Medium',
    fontSize: wp('9'),
    
    lineHeight: 50 * 0.75,
    paddingTop: 40 - 35 * 0.75,
  },
  button: {},
  topElements: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 15,
    marginVertical: 40,
  },
  logoflat: {
    marginHorizontal: 55,
  },
  logo: {
    width: 167,
    height: 22.5
},
  button_image: {
    height: 42,
    width: 42,
  },
  inputFields:{
marginVertical:12,
marginTop:Platform.OS === 'ios'?60:30

  },
  input: {
    height: 50,
    marginVertical:5,
    marginHorizontal:40,
    borderWidth: 1,
    borderRadius:25,
    fontSize:15,
    backgroundColor:"#E7E6F3",
    borderColor:"#E7E6F3",
   
    

  },
  forgotText:{
      fontSize:15,
      color:"#757575",
      fontFamily:"Poppins Regular",
      textAlign:'center',
      marginVertical:20
  },
  btn1:{
            
    backgroundColor: "#635CC9",
    borderRadius: 50,
    marginHorizontal:40,
    height:50,
    shadowColor: "rgba(239, 54, 81, 0.35)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.50,
    shadowRadius: 5.84,

    elevation: 5,
    
  },
  bottomText:{
    color:"#635CC9",
    textAlign:'center',
    marginTop:5,
    fontSize:15,
    fontFamily:"Poppins Medium"
  },
  registerText:{
    fontSize:17,
    color:"#635CC9",
    fontFamily:"Poppins Regular",
    textAlign:'center',
   // fontWeight:'bold',
    marginTop:15 
  },
  socialMedia:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'

},
showicon: {
  position: 'absolute',
  top: 16,
  right: 60
},
icon:{
    marginHorizontal:10,
    height:46,
    width:46
},
hintBox:{
  marginHorizontal:40,
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems:'center'
},
hint:{
  fontFamily: 'Poppins Light',
  fontSize: 12,
  lineHeight: 13
},
appleBtnContainer:{
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#c4c4c460',
  borderRadius: 50,
  padding: 9.75,
  marginLeft: 10

},
appleButton: {
  height: 26,
  width: 26,
}
});
