import React, {useContext, useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {Button} from 'react-native-elements';
import ToggleSwitch from 'toggle-switch-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import SocialMediaIcon from '../components/SocialMediaIcon';
import Bg1 from '../assets/images/banners/backgroundimage.svg';
import { connect } from 'react-redux';
import { addMenu } from '../store/action';
import ImagePicker from 'react-native-image-crop-picker';
import RBSheet from "react-native-raw-bottom-sheet";
import ImageChoice from '../components/ImageChoice';
import { SafeAreaView } from 'react-native';
import { strings } from '../locales/i18n';

const NewMenu = ({navigation, route, user_id, token, addMenu}) => {
  const refRBSheet = useRef();
  const [menu, onChangeMenu] = React.useState("");
  const [note, onChangeNote] = React.useState("");
  const [isOn, setisOn] = useState(true);
  const [photo, onChangephoto] = React.useState(null);
  const [err, setErr] = React.useState("");
  const [clicked, setclicked] = React.useState(false);
  const imagepick = () => {
    ImagePicker.openPicker({
      width: 375,
      height: 225,
      cropping: true,
      includeBase64: true
    }).then(image => {
      // console.log(image)
      refRBSheet.current.close()
      onChangephoto(image)
    }).catch(err=>{
      console.log(err);
    });
  }
  const camerapick = () => {
    ImagePicker.openCamera({
      width: 375,
      height: 225,
      cropping: true,
      includeBase64: true
    }).then(image => {
      // console.log(image)
      refRBSheet.current.close()
      onChangephoto(image)
    }).catch(err=>{
      console.log(err);
    });
  }
const handleSubmit = async () => {
    if(menu.trim().length < 1){
        setErr("Enter Valid Menu Name")
        return
    }
    // else if(!photo){
    //     setErr("Please select an Image")
    //     return
    // }
    // else if(note.trim().length < 1){
    //   setErr("Please enter Note/Description")
    //   return
    // }
    setclicked(true)
    var bodyFormData = new FormData();
    bodyFormData.append('user_id', user_id);
    bodyFormData.append('token', token);
    bodyFormData.append('name', menu);
    bodyFormData.append('restaurant_id', route.params.restaurant_id);
    if(photo){bodyFormData.append('image', {
        name: menu,
        type: photo.mime,
        uri: Platform.OS === 'android' ? photo.path : photo.path.replace('file://', ''),
      });}
    bodyFormData.append('active', isOn?1:0);
    bodyFormData.append('description', menu);
    const res = await addMenu(bodyFormData)
    if(res.data.status){
        // Alert.alert(  
        //     'Success',  
        //     res.data.message,  
        //     [  
        //         {text: 'OK', onPress: () => navigation.goBack()},  
        //     ]  
        //   );
          setclicked(false)
          navigation.goBack()
    }else{
        setclicked(false)
        alert(res.data.message)
    }
}
  return (
    <SafeAreaView>
    <ScrollView>
        <TouchableOpacity onPress={() => refRBSheet.current.open()} >
        {!photo?<Image
        source={require('../assets/images/banners/imageUpload.png')}
         
          style={{height:wp(100)*418/750, width: wp(100)}}
          // marginTop={-4}
          resizeMode="contain"
        />:<Image source={{uri:`data:${photo.mime};base64,${photo.data}`}} style={styles.altImage} resizeMode="cover" />}
      

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
      </TouchableOpacity>
      <View style={styles.inputFields}>
        <Text style={{textAlign:'center', color:'red', fontFamily: 'Poppins Bold'}}>{err}</Text>
        <View style={styles.editMenu}>
          <TextInput
            fontSize={wp(11)}
            fontFamily={'Poppins Medium'}
            onChangeText={onChangeMenu}
            value={menu}
            width={wp(100)}
            multiline={true}
            placeholder={strings('Add Menu Section1')}
            opacity={0.45}
            placeholderTextColor="#000000"
          />
          {/* <Image source={require('../assets/images/icons/delete.png')} /> */}
        </View>
        {/* <TextInput
          fontSize={15}
          fontFamily={'Poppins Regular'}
          onChangeText={onChangeNote}
          value={note}
          placeholder="Notes"
          opacity={0.3}
          multiline={true}
          placeholderTextColor="#000000"
        /> */}
        <View style={styles.bottomSection}>
          <View style={styles.switch}>
            <Text style={styles.activeText}>{strings('Add Menu Section2')}</Text>
            <ToggleSwitch
              isOn={isOn}
              onColor="#635CC9"
              offColor="#635CC920"
              labelStyle={{color: 'black', fontFamily: 'Poppins Medium'}}
              size="medium"
              onToggle={() => setisOn(!isOn)}
            />
          </View>
          <Button
            onPress={handleSubmit}
            title={strings('Add Menu Section3')}
            titleStyle={{fontSize: 15}}
            buttonStyle={styles.btn1}
            containerStyle={{marginTop: 20}}
            loading={clicked}
          />
        </View>
      </View>
    </ScrollView>
    <RBSheet
    ref={refRBSheet}
    closeOnDragDown={true}
    closeOnPressMask={true}
    customStyles={{
      container: {
        ...styles.container,
        height: 180,
        backgroundColor: '#f4f4f4'
      },
      wrapper: {
        backgroundColor: "#00000028"
      },
      draggableIcon: {
        backgroundColor: "#f4f4f4"
      }
    }}
  >
    <ImageChoice imagepick={()=>imagepick()} camerapick={()=>camerapick()}/>
</RBSheet>
</SafeAreaView>
  );
};
const mapStateToProps = state => {
    return{
      user_id: state.auth.user_id,
      token: state.auth.token
    }
  }
export default connect(mapStateToProps,{addMenu})(NewMenu);

const styles = StyleSheet.create({
  heading: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    marginBottom: 40,
    marginLeft: 15,
  },
  btn1: {
    backgroundColor: '#635CC9',
    borderRadius: 50,
    marginHorizontal: 15,
    height: 50,
    shadowColor: 'rgba(239, 54, 81, 0.35)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5.84,
    marginBottom: 20,
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
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
    marginTop: 25,
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
    // marginTop: hp('15%'),
  },
  input: {
    height: 50,
    marginVertical: 5,
    marginHorizontal: 40,
    borderWidth: 1,
    borderRadius: 25,
    fontSize: 15,
    backgroundColor: '#E7E6F3',
    borderColor: '#E7E6F3',
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
  },
  smallText: {
    fontSize: 15,
    color: '#000000',
    fontFamily: 'Poppins Regular',
    marginVertical: 10,
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
    marginVertical: 10,
  },
  membershipView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  renewView: {
    backgroundColor: '#e4e4e4',
    padding: 10,
  },
  renewText: {
    textAlign: 'right',
    fontFamily: 'Poppins Medium',
    fontSize: 11,
    color: '#000000',
    opacity: 0.5,
  },
  renewDateText: {
    textAlign: 'right',
    fontFamily: 'Poppins Bold',

    fontSize: 11,
    color: '#000000',
    opacity: 0.5,
  },
  share: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallShareText: {
    fontSize: 15,
    color: '#B3B3B3',
    fontFamily: 'Poppins Regular',
    flexWrap: 'wrap',
    width: wp(70),
  },
  smallBottomText: {
    fontSize: 15,
    color: '#B3B3B3',
    fontFamily: 'Poppins Regular',
    marginVertical: 20,
  },
  editMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activeText: {
    fontSize: 18,
    fontFamily: 'Poppins Regular',
    color: '#000000',
  },
  bottomSection: {
    marginTop: 120,
  },
  altImage:{
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0, 
    // backgroundColor:'red',
    width: wp(100),
    height: wp(100)*209/375
  }
  
});