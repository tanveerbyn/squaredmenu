import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,

} from 'react-native';
import { Button } from 'react-native-elements'
import Bg1 from '../assets/images/banners/bg1.svg'

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import {forgotPassword} from '../store/action'
import { strings } from '../locales/i18n';

const ForgotPassword = ({ navigation,forgotPassword }) => {

  const [email, onChangeEmail] = React.useState("");
  const [err, seterr] = useState("")
  const initiateForgot = async () => {
    if(email.trim().length<1){
      seterr("Please enter a valid Email / Phone")
      return
    }
    var bodyFormData = new FormData();
    bodyFormData.append('email', email);
    const res = await forgotPassword(bodyFormData)
    alert(res.data.message)
    if(res.data.status){
      navigation.navigate('Login')
    }
  }
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
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
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
        <Text style={styles.headingText}>{strings('Login Screen5')}</Text>
      </View>
      <View style={styles.inputFields}>
        <Text style={styles.emailText}>Enter your registered email address and we will reset your password</Text>
        <Text style={{textAlign:'center', color:'red', fontFamily: 'Poppins Bold'}}>{err}</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeEmail}
          value={email}
          placeholder={strings('Forgot Password Screen1')}
          textAlign="center"
          placeholderTextColor="#635CC9"
          keyboardType="email-address"
          autoCapitalize="none"
        />


        <Button

          title={strings('Forgot Password Screen2')}
          titleStyle={{ fontSize: 15 }}
          buttonStyle={styles.btn1}
          containerStyle={{ marginTop: 10 }}
          onPress={() => initiateForgot()}

        />





      </View>

    </ScrollView>
    </SafeAreaView>
  );
};

export default connect(null,{forgotPassword})(ForgotPassword);

const styles = StyleSheet.create({
  banner: {
    position: 'absolute',
    width: wp(100),
    height: hp(35),
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
    fontSize: 30,
    width: wp('100%'),
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
  inputFields: {
    marginVertical: 15,
    marginTop: hp('8%')
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
    marginVertical: 20
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
    marginVertical: 40,
    fontSize: 15,
    fontFamily: "Poppins Medium"
  },
  registerText: {
    fontSize: 15,
    color: "#757575",
    fontFamily: "Poppins Regular",
    textAlign: 'center',
    marginVertical: 10
  },
  emailText: {
    height: 50,
    marginVertical: 5,
    marginHorizontal: 40,
    color: "#757575",
    borderRadius: 25,
    fontSize: 15,
    textAlign: 'center'


  }
});
