import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
  AlertIOS,

} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button } from 'react-native-elements'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SocialMediaIcon from '../components/SocialMediaIcon';
import Bg1 from '../assets/images/banners/bg1.svg'
import { login, signInAPIGoogle, signInAPIApple } from '../store/action';
import { connect } from 'react-redux';
import { getBaseOs, getModel, getDeviceName } from 'react-native-device-info';
import { Platform } from 'react-native';
import { GoogleSignin } from '@react-native-community/google-signin';
import Google from '../assets/images/icons/googleicon.svg'
import Facebook from '../assets/images/icons/facebookicon.svg'
import RBSheet from "react-native-raw-bottom-sheet";
import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk';
import NetInfo from "@react-native-community/netinfo";
import Offline from '../components/Offline'
import { SafeAreaView } from 'react-native';
import appleAuth, {
  AppleButton,
  AppleAuthError,
  AppleAuthRequestScope,
  AppleAuthRequestOperation,
} from '@invertase/react-native-apple-authentication';
import { ServiceConstant } from './ServiceConstant'
import { strings } from '../locales/i18n';
import LanguageChoice from '../components/LanguageChoice';
import I18n from 'react-native-i18n';

GoogleSignin.configure({
  webClientId: "955337206220-m86af8e49jddlbqllk3bo3gm2aqegho8.apps.googleusercontent.com",

  // offlineAccess: true
})
const Login = ({ navigation, login, signInAPIGoogle, signInAPIApple, lang }) => {
  I18n.locale = lang
  const languageRBSheet = useRef()
  const [iceye, setIceye] = React.useState("visibility-off");
  const [showPassword, setShowPassword] = React.useState(true);
  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [clicked, setclicked] = React.useState(false);

  const [userGoogleInfo, setUserGoogleInfo] = React.useState({});
  const [loaded, setLoaded] = React.useState(false);
  const [userFacebookInfo, setUserFacebookInfo] = React.useState({});
  const [online, setonline] = useState(true)

  useEffect(() => {
    console.log('from login -', ServiceConstant.get_fcm_Token())
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
  const onAppleButtonPress = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
      console.log("response =>", appleAuthRequestResponse)
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
        if (res.data.status) {
          if (Platform.OS === 'android') {
            ToastAndroid.showWithGravity(
              res.data.message,
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM
            )
          } else {
            AlertIOS.alert(res.data.message)
          }
        } else {
          if (Platform.OS === 'android') {
            ToastAndroid.showWithGravity(
              res.data.message,
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM
            )
          } else {
            AlertIOS.alert(res.data.message)
          }
        }
      }
    } catch (error) {
      if (error.code === AppleAuthError.CANCELED) {
        console.log("User Cancelled Login with Apple")

      } else {
        console.log("error apple login =>", error)
      }
    }
  }
  const signinWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn()
      setUserGoogleInfo(userInfo)
      console.log("Google Success =>", userInfo)

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
      if (res.data.status) {
        if (Platform.OS === 'android') {
          ToastAndroid.showWithGravity(
            res.data.message,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          )
        } else {
          AlertIOS.alert(res.data.message)
        }
      } else {
        if (Platform.OS === 'android') {
          ToastAndroid.showWithGravity(
            res.data.message,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          )
        } else {
          AlertIOS.alert(res.data.message)
        }
      }

    } catch (err) {
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
      { token, parameters: PROFILE_REQUEST_PARAMS },
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
          const res = await signInAPIGoogle(bodyFormData, "facebook")
          if (res.data.status) {
            if (Platform.OS === 'android') {
              ToastAndroid.showWithGravity(
                res.data.message,
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
              )
            } else {
              AlertIOS.alert(res.data.message)
            }
          } else {
            if (Platform.OS === 'android') {
              ToastAndroid.showWithGravity(
                res.data.message,
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
              )
            } else {
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
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
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
  const startLogin = async () => {
    if (email.trim().length < 1) {
      setError("Enter Email")
      return
    } else if (password.trim().length < 1) {
      setError("Enter Password")
      return
    }
    setclicked(true)
    let device_os = Platform.OS;
    let device_model = await getModel();
    let device_name = await getDeviceName();
    var bodyFormData = new FormData();
    bodyFormData.append('email', email);
    bodyFormData.append('password', password);
    bodyFormData.append('firebase_token', ServiceConstant.get_fcm_Token());
    bodyFormData.append('device_name', device_name);
    bodyFormData.append('device_modal', device_model);
    bodyFormData.append('device_os', device_os);
    const res = await login(bodyFormData)
    setclicked(false)
    if (res.data.status) {
      if (Platform.OS === 'android') {
        ToastAndroid.showWithGravity(
          res.data.message,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        )
      } else {
        AlertIOS.alert(res.data.message)
      }
    } else {
      if (Platform.OS === 'android') {
        ToastAndroid.showWithGravity(
          res.data.message,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        )
      } else {
        AlertIOS.alert(res.data.message)
      }
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


  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    AlertIOS.alert(text);

  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        {/* <Bg1
        height={hp('40%')}
        width={wp('100%')}
        style={{
          position: 'absolute',

        }}
        resizeMode="stretch"


      /> */}
        <Image source={require('../assets/images/banners/addABuisness.png')} style={styles.banner} />

        <View style={styles.topElements}>
          {/* <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RegistrationScreen')}>
          <Image
            source={require('../assets/images/topbar/back.png')}
            style={styles.button_image}
          />
        </TouchableOpacity> */}
          <View style={styles.logoflat}>
            <Image
              source={require('../assets/images/logoinapp/logoflat.png')}
              style={styles.logo}
              resizeMode='contain'
            />
          </View>
        </View>

        <View style={styles.heading}>
          <Text style={styles.headingText}>{strings('Login Screen4')}</Text>
        </View>

        <View style={styles.inputFields}>
          <Text style={{ textAlign: 'center', color: 'red', fontFamily: 'Poppins Bold' }}>{error}</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeEmail}
            value={email}
            placeholder={strings('Login Screen1')}
            textAlign="center"
            placeholderTextColor="#635CC9"
            autoCapitalize="none"

          />
          <View style={{ position: 'relative' }}>
            <TextInput
              style={styles.input}
              onChangeText={onChangePassword}
              value={password}
              placeholder={strings('Login Screen2')}
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

          <Button
            onPress={startLogin}
            title={strings('Login Screen3')}
            titleStyle={{ fontSize: 15 }}
            buttonStyle={styles.btn1}
            containerStyle={{ marginTop: 10 }}
            loading={clicked}
          />
          <Text style={styles.forgotText} onPress={() => navigation.navigate('ForgotPassword')}>{strings('Login Screen5')}</Text>
          <Text style={styles.forgotText}>{strings('Login Screen6')}</Text>

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
          <Text style={styles.bottomText} onPress={() => navigation.navigate('RegistrationScreen')} >{strings('Login Screen7')}</Text>

        </View>

        {!online && <Offline />}

        <TouchableOpacity style={styles.langPicker} onPress={()=>languageRBSheet.current.open()}>
          <Image source={require('../assets/images/flags/globe.png')} style={{height:39, width: 39}}/>
        </TouchableOpacity>
      </ScrollView>
      <RBSheet
        ref={languageRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          container: {
            ...styles.container,
            height: 500,
            backgroundColor: '#fff'
          },
          wrapper: {
            backgroundColor: "#00000028"
          },
          draggableIcon: {
            backgroundColor: "#f4f4f4"
          }
        }}
      >
        <LanguageChoice closeFunc={()=>languageRBSheet.current.close()}/>
    </RBSheet>
    </SafeAreaView>
  );
};
const mapStateToProps = state => {
  return{
    lang: state.auth.language
  }
}
export default connect(mapStateToProps, { login, signInAPIGoogle, signInAPIApple })(Login);

const styles = StyleSheet.create({
  banner: {
    position: 'absolute',
    width: wp(100),
    height: hp(35),
    // marginBottom: 30,
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
    fontSize: wp('10'),

    lineHeight: 50 * 0.75,
    paddingTop: 40 - 35 * 0.75,
  },
  button: {},
  topElements: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 40,
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
  inputFields: {
    marginVertical: 15,
    marginTop: Platform.OS === 'ios' ? hp(10) : 90
  },
  input: {
    height: 50,
    marginVertical: 5,
    marginHorizontal: 40,
    borderWidth: 1,
    borderRadius: 25,
    fontSize: 15,
    backgroundColor: "#E7E6F3",
    borderColor: "#E7E6F3",



  },
  forgotText: {
    fontSize: 15,
    color: "#757575",
    fontFamily: "Poppins Regular",
    textAlign: 'center',
    marginTop: 20

  },
  btn1: {

    backgroundColor: "#635CC9",
    borderRadius: 50,
    marginHorizontal: 40,
    height: 50,
    shadowColor: "rgba(239, 54, 81, 0.35)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.50,
    shadowRadius: 5.84,

    elevation: 5,

  },
  bottomText: {
    color: "#635CC9",
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 15,
    fontFamily: "Poppins Medium"
  },
  socialMedia: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10

  },
  showicon: {
    position: 'absolute',
    top: 16,
    right: 60
  },
  icon: {
    marginHorizontal: 10,
    height: 46,
    width: 46
  },
  appleBtnContainer: {
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
  },
  langPicker:{
    position: 'absolute',
    top: 32,
    right: 19
  }
});
