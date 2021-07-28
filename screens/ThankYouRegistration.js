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
  SafeAreaView,
} from 'react-native';
import {Button} from 'react-native-elements';
import Bg3 from '../assets/images/banners/bg3.svg';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SocialMediaIcon from '../components/SocialMediaIcon';
import { verifyEmail } from '../store/action';
import { connect } from 'react-redux';

const ThankYouRegistration = ({navigation, verifyEmail, user_id}) => {
  const resendVerification = async () => {
    var bodyFormData = new FormData();
    bodyFormData.append('user_id', user_id);
    const res = await verifyEmail(bodyFormData)
    alert(res)
  }
  return (
    <SafeAreaView style={{flex:1}} >
    <ScrollView>
    <ImageBackground 
    source={require('../assets/images/background/background.png')}
    style={{width:wp(100),height:hp(115),marginBottom:100,marginTop:-hp('10'),paddingTop:hp('5')}}
    >

      <View style={styles.logoflat}>
          <Image source={require('../assets/images/icons/thankyou.png')} />
        </View>

      <View style={styles.heading}>
        <Text style={styles.headingText}>Thank You </Text>
        <Text style={styles.contentHeadingText}>
        You have successfully registered with SquaredMenu
        </Text>
        <Text style={styles.successMessage}>
        Verify your account with a link sent to your registered email address.
        </Text>

      </View>
     

      <View style={styles.inputFields}>
        <View style={{paddingTop:hp('10')}}>
        <Button
          title="Login Now"
          titleStyle={{fontSize: 15}}
          buttonStyle={styles.btn1}
          containerStyle={{marginTop:hp('10')}}
          onPress={() => navigation.navigate('Login')}

        />
        </View>
        <TouchableOpacity style={styles.bottomView}>
          <Text
            onPress={resendVerification}
            style={styles.bottomText}>
           Resend Verification Link
          </Text>
        
        </TouchableOpacity>
      </View>
     </ImageBackground>
     </ScrollView>
    </SafeAreaView>
  );
};
const mapStateToProps = state => {
  return {
    user_id: state.auth.user_id
  }
}
export default connect(mapStateToProps,{verifyEmail})(ThankYouRegistration);

const styles = StyleSheet.create({
  heading: {
  
    marginBottom: 40,
    

  },
  headingText: {
    color: 'white',
    fontFamily: 'Poppins SemiBold',
    fontSize: 37,
    width: wp('100%'),
    lineHeight: 50 * 0.75,
    paddingTop: 40 - 35 * 0.75,
    textAlign:'center'
  },

  topElements: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
    marginTop: 40,
  },
  logoflat: {
    alignItems:"center",
    marginTop:80,
    marginBottom:20
  },
  button_image: {
    height: 42,
    width: 42,
  },
 

  forgotText: {
    fontSize: 15,
    color: '#757575',
    fontFamily: 'Poppins Regular',
    textAlign: 'center',
    marginVertical: 20,
  },
  
  
  btn1: {
    backgroundColor: '#635CC9',
    borderRadius: 50,
    marginHorizontal: 40,
  
  
    height: 60,
    shadowColor: '#726AE9',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.7,
    shadowRadius: 5.84,

    elevation: 5,
  },
  bottomText: {
    color: '#635CC9',
    fontSize: 15,
    fontFamily: 'Poppins Medium',
  },
  registerText: {
    fontSize: 15,
    color: '#757575',
    fontFamily: 'Poppins Regular',
    textAlign: 'center',
    marginVertical: 10,
  },
  skipText: {
    color: '#817BD4',
    fontSize: 15,
    fontFamily: 'Poppins Medium',
  },
  bottomView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 20,
   
  },
  content:{
marginHorizontal:15,
display:'flex',
alignItems:'center',
marginTop:10
  },
  contentText:{
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins Medium',
    marginHorizontal:5
  },
  imageTextView:{
    display:'flex',
    flexDirection:'row',
    marginVertical:5,
    
  },
  contentHeadingText:{
    color: '#C6C4EB',
    fontSize: 18,
    fontFamily: 'Poppins Medium',
    textAlign:'center',
    marginHorizontal:30,
    marginVertical:10
  },
  successMessage:{
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins Regular',
    textAlign:'center',
    marginHorizontal:30,
  marginTop:60
  }
});
