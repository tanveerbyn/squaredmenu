import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { widthPercentageToDP } from 'react-native-responsive-screen'

const MenuButtons = ({uri, title,navigation, data, restaurant_id, themeURL, brandImage, drag, public_url}) => {
    console.log(data)
    return (
        <View style={styles.card}>
            <TouchableOpacity onPress={()=>{navigation.navigate('MenuList', {menu_id:data.menu_id, themeURL:themeURL, public_url:public_url, brandImage: brandImage, restaurant_id:restaurant_id})}} style={styles.part1}>
                <View style={styles.subBox}>
                    <Image source={{uri:uri}} style={styles.plus} />
                </View>
                <Text numberOfLines={1} style={styles.new}>{title}</Text>
            </TouchableOpacity>
            <View style={styles.actBtn}>
                <TouchableOpacity onPressIn={drag}>
                    <Image source={require('../assets/images/icons/drag_icon.png')} style={styles.dragImg}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{navigation.navigate('EditMenu',{data:data,restaurant_id:restaurant_id})}}>
                    <Image source={require('../assets/images/icons/edit.png')} style={styles.editIcon}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default MenuButtons

const styles = StyleSheet.create({
    card:{
        backgroundColor: '#fff',
        borderRadius: 17,
        width: widthPercentageToDP(84),
        height: 90,
        padding: 10,
        marginHorizontal: widthPercentageToDP(8),
        marginTop: 15,
        elevation:2,
//ios
        shadowColor: "#d4d4d4",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        //ios
        shadowColor: "#d4d4d4",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.10,
        shadowRadius: 3.84,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between'
    },
    part1:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center' ,
        width: '80%',
        paddingRight: 50
    },
    subBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: '100%',
        backgroundColor:'#635CC910',
        borderRadius: 10,
    },
    new:{
        fontFamily: 'Poppins Medium',
        color: '#635CC9',
        fontSize: 15,
        marginLeft: 15
    },
    plus:{
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 10
    },
    editIcon:{
        height: 45,
        width: 45
    },
    actBtn:{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
    },
    dragImg:{
        width: 20, 
        height: 20,
    }
})
