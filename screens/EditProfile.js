import React, { useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  TextInput,
  AlertIOS,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button } from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import SocialMediaIcon from '../components/SocialMediaIcon';
import Bg1 from '../assets/images/banners/backgroundimage.svg';
import { connect } from 'react-redux';
import { changePassword, updateProfilePic } from '../store/action';
import { ToastAndroid } from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';
import { Alert } from 'react-native';


const EditProfile = ({ navigation, changePassword, name, user_id, token, updateProfilePic }) => {
  const [old, onChangeOld] = React.useState("");
  const [confirm, onChangeConfirm] = React.useState("")
  const [newpassword, onChangeNewPassword] = React.useState("");
  const [photo, setPhoto] = React.useState(null);
  const [clicked, setclicked] = React.useState(false);
  const [err, seterr] = React.useState("");

  

  const [iceye1, setIceye1] = React.useState("visibility-off");
  const [showPassword1, setShowPassword1] = React.useState(true);

  const [iceye2, setIceye2] = React.useState("visibility-off");
  const [showPassword2, setShowPassword2] = React.useState(true);

  const [iceye3, setIceye3] = React.useState("visibility-off");
  const [showPassword3, setShowPassword3] = React.useState(true);

  const handleSubmit = async () => {
    if(confirm !== newpassword){
      seterr("New Password & Confirm Password should be same.")
      return
    }
    var bodyFormData = new FormData();
    bodyFormData.append('current_pass', old);
    bodyFormData.append('new_pass', newpassword);
    bodyFormData.append('user_id', user_id);
    bodyFormData.append('token', token);
    setclicked(true)
    const res = await changePassword(bodyFormData)
    console.log("Change Password",res.data)
    setclicked(false)
    if(res.data.status){
      if(Platform.OS === 'android'){
        ToastAndroid.showWithGravity(
        res.data.message,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      )
      }else{
        Alert.alert(res.data.message)
      }
      onChangeOld("")
      onChangeConfirm("")
      onChangeNewPassword("")
    }else{
      if(Platform.OS === 'android'){
        ToastAndroid.showWithGravity(
        res.data.message,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      )
      }else{
        
        Alert.alert(res.data.message)
      }
    }
  }
  const imagepick = () => {
    ImagePicker.openPicker({
      width: 200,
      height: 200,
      cropping: true,
      includeBase64: true
    }).then(async image => {
        // console.log(image)
        setPhoto(image)
        var bodyFormData = new FormData();
        bodyFormData.append('user_id', user_id);
        bodyFormData.append('token', token);
        bodyFormData.append('name', name);
        bodyFormData.append('image', {
          name: name,
          type: image.mime,
          uri: Platform.OS === 'android' ? image.path : image.path.replace('file://', ''),
        });
        const res = await updateProfilePic(bodyFormData)
        
          Alert.alert(  
            'Success',  
            res.data.message,  
            [  
                {text: 'OK', onPress: () => navigation.navigate('UserProfile')},  
            ]  
        );
    }).catch(err=>{
        console.log(err);
    });
  }
  changePwdType = (position) => {
    if(position === 1){
      if (showPassword1) {
        setIceye1('visibility')
        setShowPassword1(false)
      } else {
        setIceye1('visibility-off')
        setShowPassword1(true)
      }
    }
    if(position === 2){
      if (showPassword2) {
        setIceye2('visibility')
        setShowPassword2(false)
      } else {
        setIceye2('visibility-off')
        setShowPassword2(true)
      }
    }
    if(position === 3){
      if (showPassword3) {
        setIceye3('visibility')
        setShowPassword3(false)
      } else {
        setIceye3('visibility-off')
        setShowPassword3(true)
      }
    }
    
  };
  return (
    <SafeAreaView style={{flex:1}}>
    <ScrollView>
      <View>
        <ImageBackground source={require('../assets/images/banners/lands.png')} style={{ width: wp(100), height:wp(100)*224/375 }}>
          <View style={styles.topElements}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.goBack()}>
              <Image
                source={require('../assets/images/topbar/back.png')}
                style={styles.button_image}
              />
            </TouchableOpacity>

            {/* <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('RegistrationScreen')}>
              <Image
                source={require('../assets/images/icons/edit2.png')}
                style={styles.button_image}
              />
            </TouchableOpacity> */}
          </View>
        </ImageBackground>
      </View>




      <View style={styles.inputFields}>

        <Text style={styles.nameText}>{name}</Text>
        <Text style={{textAlign:'center', color:'red', fontFamily: 'Poppins Bold'}}>{err}</Text>
        <View style={{position:'relative'}}>
          <TextInput
            style={styles.input}
            fontSize={15}
            onChangeText={onChangeOld}
            value={old}
            fontFamily="Poppins Regular"
            placeholder="Old Password"
            textAlign="center"
            placeholderTextColor="#635CC9"
            secureTextEntry={showPassword1}
          />
          <Icon style={styles.showicon}
              name={iceye1}
              size={26}
              color='#635CC9'
              onPress={()=>changePwdType(1)}
          />
        </View>
        <View style={{position:'relative'}}>
          <TextInput
            style={styles.input}
            fontSize={15}
            fontFamily="Poppins Regular"
            onChangeText={onChangeNewPassword}
            value={newpassword}
            placeholder="New Password"
            textAlign="center"
            placeholderTextColor="#635CC9"
            secureTextEntry={showPassword2}
          />
          <Icon style={styles.showicon}
              name={iceye2}
              size={26}
              color='#635CC9'
              onPress={()=>changePwdType(2)}
          />
        </View>
        <View style={{position:'relative'}}>
          <TextInput
            style={styles.input}
            fontSize={15}
            fontFamily="Poppins Regular"
            onChangeText={onChangeConfirm}
            value={confirm}
            placeholder="Confirm New Password"
            textAlign="center"
            placeholderTextColor="#635CC9"
            secureTextEntry={showPassword3}
          />
          <Icon style={styles.showicon}
              name={iceye3}
              size={26}
              color='#635CC9'
              onPress={()=>changePwdType(3)}
          />
        </View>
        
        
        

        <Button
          onPress={handleSubmit}
          title="Update"
          titleStyle={{ fontSize: 15 }}
          buttonStyle={styles.btn1}
          containerStyle={{ marginTop: 40 }}
          loading={clicked}
        />
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};
const mapSatateToProps = state => {
  return {
    name: state.auth.name,
    user_id: state.auth.user_id,
    token: state.auth.token
  }
}
export default connect(mapSatateToProps, { changePassword, updateProfilePic })(EditProfile);

const styles = StyleSheet.create({
  heading: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    marginBottom: 40,
    marginLeft: 15,
  },
  btn1: {

    backgroundColor: "#635CC9",
    borderRadius: 50,
    marginHorizontal: 15,
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
  headingText: {
    color: 'white',
    fontFamily: 'Poppins Medium',
    fontSize: 37,
    width: wp('50%'),
    lineHeight: 50 * 0.75,
    paddingTop: 40 - 35 * 0.75,
  },
  button: {},
  topElements: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
    marginVertical: 40,
  },
  logoflat: {
    marginHorizontal: 55,
  },
  button_image: {
    height: 42,
    width: 42,
  },
  inputFields: {
    marginHorizontal: 15,
    marginTop: 20,
  },
  forgotText: {
    fontSize: 15,
    color: '#757575',
    fontFamily: 'Poppins Regular',
    textAlign: 'center',
    marginVertical: 20,
  },

  bottomText: {
    color: '#635CC9',
    textAlign: 'center',
    marginVertical: 40,
    fontSize: 15,
    fontFamily: 'Poppins Medium',
  },
  imageView: {
    alignItems: 'center',
    marginTop: heightPercentageToDP(10),
  },
  nameText: {
    fontSize: 48,
    color: '#000000',
    fontFamily: 'Poppins Medium',
    lineHeight: 60 * 0.75,
    paddingTop: 40 - 35 * 0.75,
    textTransform: 'capitalize',
    marginBottom: 20
  },
  smallText: {
    fontSize: 15,
    color: '#000000',
    fontFamily: 'Poppins Regular',
    marginVertical: 10
  },
  smallHeadingText: {
    fontSize: 15,
    color: '#000000',
    fontFamily: 'Poppins Bold',
  },
  smallSubHeadingText: {
    fontSize: 15,
    color: '#B3B3B3',
    fontFamily: 'Poppins Regular',
  },
  featuresView: {
    marginVertical: 10
  },
  membershipView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  renewView: {
    backgroundColor: "#e4e4e4",
    padding: 10,


  },
  renewText: {
    textAlign: 'right',
    fontFamily: 'Poppins Medium',
    fontSize: 11,
    color: '#000000',
    opacity: .5
  },
  renewDateText: {
    textAlign: 'right',
    fontFamily: 'Poppins Bold',

    fontSize: 11,
    color: '#000000',
    opacity: .5
  },
  share: {
    flexDirection: 'row',
    justifyContent: 'space-between'

  },
  smallShareText: {
    fontSize: 15,
    color: '#B3B3B3',
    fontFamily: 'Poppins Regular',
    flexWrap: 'wrap',
    width: wp(70)
  },
  smallBottomText: {
    fontSize: 15,
    color: '#B3B3B3',
    fontFamily: 'Poppins Regular',
    marginVertical: 20
  },
  input: {
    height: 50,
    marginVertical: 5,
    marginHorizontal: 15,
    borderWidth: 1,
    borderRadius: 25,
    fontSize: 15,
    backgroundColor: "#E7E6F3",
    borderColor: "#E7E6F3",
  },
  showicon: {
    position: 'absolute',
    top: 16,
    right: 35
  },
});
