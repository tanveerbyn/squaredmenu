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
import { deleteMenu, editMenu } from '../store/action';
import ImagePicker from 'react-native-image-crop-picker';
import FastImage from 'react-native-fast-image';
import { Platform } from 'react-native';

import RBSheet from "react-native-raw-bottom-sheet";
import ImageChoice from '../components/ImageChoice';
import { SafeAreaView } from 'react-native';
import { strings } from '../locales/i18n';

const EditMenu = ({navigation, route, user_id, token, editMenu, deleteMenu}) => {
  const refRBSheet = useRef();
  const [menu, onChangeMenu] = React.useState(route.params.data.name);
  const [note, onChangeNote] = React.useState(route.params.data.description);
  const [isOn, setisOn] = useState(route.params.data.active===0?false:true);
  const [photo, onChangephoto] = React.useState(null);
  const [clicked, setclicked] = useState(false)
  const [err, setErr] = React.useState(null);
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
    // else if(note.trim().length < 1){
    //   setErr("Please enter Note/Description")
    //   return
    // }
    setclicked(true)
      var bodyFormData = new FormData();
      bodyFormData.append('user_id', user_id);
      bodyFormData.append('token', token);
      bodyFormData.append('name', menu);
      bodyFormData.append('description', note);
      bodyFormData.append('restaurant_id', route.params.restaurant_id);
      if(photo){
        bodyFormData.append('image', {
          name: menu,
          type: photo.mime,
          uri: Platform.OS === 'android' ? photo.path : photo.path.replace('file://', ''),
        });
      }
      bodyFormData.append('active', isOn?1:0);
      bodyFormData.append('menu_id', route.params.data.menu_id);
      const res = await editMenu(bodyFormData)
      setclicked(false)
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
  const deleteThisMenu = async () => {
    

    var bodyFormData = new FormData();
    bodyFormData.append('user_id', user_id);
    bodyFormData.append('token', token);
    bodyFormData.append('menu_id', route.params.data.menu_id);

    const res = await deleteMenu(bodyFormData)

    navigation.goBack()
  }
  const createTwoButtonAlert = () =>
        Alert.alert(
          `${strings('Delete Item1')}`,
        `${strings('Delete Item2')}`,
        [
            {
            text: `${strings('Delete Item3')}`,
            onPress: () => deleteThisMenu(),
            style: "destructive"
            },
            { 
                text: `${strings('Delete Item4')}`, 
                onPress: () => console.log("No Pressed"),
                style: "cancel"
             }
        ]
    );
  return (
    <SafeAreaView>
    <ScrollView>
      <TouchableOpacity onPress={() => refRBSheet.current.open()}>
      {!photo?<FastImage
                style={styles.altImage}
                source={{
                    uri: route.params.data.image,
                    priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
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
        <TouchableOpacity style={styles.previewBTN} onPress={() => refRBSheet.current.open()}>
                                    <Text style={styles.preview}>{strings("Change Image")}</Text>
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
{err && <Text style={{textAlign:'center', color:'red', fontFamily: 'Poppins Bold'}}>{err}</Text>}
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
          <TouchableOpacity onPress={()=>createTwoButtonAlert()} style={{position:'absolute', right: 5, backgroundColor:'#fff', padding: 10, borderRadius: 8, elevation: 5}}><Image source={require('../assets/images/icons/delete.png')} style={{width: 18.5, height: 20}}/></TouchableOpacity>
        </View>
        {/* <TextInput
          fontSize={15}
          fontFamily={'Poppins Regular'}
          onChangeText={onChangeNote}
          value={note}
          placeholder="Notes"
          opacity={0.3}
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
            onPress={() => handleSubmit()}
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
const mapStataeToProps = state => {
  return{
    user_id: state.auth.user_id,
    token: state.auth.token
  }
}
export default connect(mapStataeToProps,{editMenu, deleteMenu})(EditMenu);

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
    marginTop: 30,
    width:"100%"
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
  previewBTN: {
    backgroundColor: '#fff',
    paddingHorizontal: 18,
    paddingVertical: 7,
    borderRadius: 23,
    marginHorizontal:30
},
preview: {
    fontFamily: 'Poppins Medium',
    fontSize: 16,
    color: '#635CC9'
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
    position: 'relative',
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
    marginTop: hp(25),
  },
  altImage:{
    
    // backgroundColor:'red',
    width: wp(100),
    height: wp(100)*209/375
  }
});
