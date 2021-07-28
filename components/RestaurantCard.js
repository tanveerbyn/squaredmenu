import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { widthPercentageToDP } from 'react-native-responsive-screen'

const RestaurantCard = ({navigation, name, data}) => {
    return (
        <TouchableOpacity style={styles.card} onPress={()=>navigation.navigate(name,{restaurant_id:data.restaurant_id, brandImage:data.cover, themeURL: data.theme_url, public_url: data.public_url})}>
            <View style={styles.subBox}>
                <FastImage
                    style={styles.thumbnail}
                    source={{
                        uri: data.cover,
                        priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                />
            </View>
            <View style={styles.info}>
                <View style={styles.parentText}><Text numberOfLines={2} style={styles.name}>{data.name}</Text></View>
                <View style={styles.parentText}><Text numberOfLines={2} style={styles.address}>{data.address}</Text></View>
            </View>
            <View style={styles.edit}><TouchableOpacity onPress={()=>navigation.navigate('EditABusiness', {data:data})}><Image style={styles.editIcon} source={require('../assets/images/icons/edit.png')}/></TouchableOpacity></View>
        </TouchableOpacity>
    )
}

export default RestaurantCard

const styles = StyleSheet.create({
    card:{
        backgroundColor: '#fff',
        borderRadius: 17,
        width: widthPercentageToDP(84),
        height: 115,
        padding: widthPercentageToDP(2.5),
        marginHorizontal: widthPercentageToDP(8),
        marginTop: 20,
        shadowColor: '#00000009',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation:2,
//ios
        shadowColor: "#d4d4d4",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    edit:{
        position:'absolute',
        right: 0,
        top: 0
    },
    subBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: widthPercentageToDP(25),
        height: '100%',
        backgroundColor:'#635CC910',
        borderRadius: 10,
    },
    thumbnail:{
        width: '100%',
        height: '100%',
        borderRadius: 12
    },
    info:{
        flexDirection: 'column',
        justifyContent:'space-between',
        paddingHorizontal: widthPercentageToDP(3),
        width: widthPercentageToDP(55),
    },
    parentText:{
        display:'flex',
        flexDirection:'row',
        width: widthPercentageToDP(55)-43
    },
    name:{
        flexWrap: 'wrap',
        color: '#635CC9',
        fontFamily: 'Poppins Medium',
        fontSize: 23,
        lineHeight: 30 * 0.75,
        paddingTop: 40 - 35 * 0.75,
    },
    address:{
        flexWrap: 'wrap',
        fontFamily: 'Poppins Medium',
        fontSize: 15,
        color: '#cfcfcf',
        lineHeight: 17
    },
    editIcon:{
        height: 45,
        width: 45
    }
})
