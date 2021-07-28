import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { widthPercentageToDP } from 'react-native-responsive-screen'

const SubMenu = ({dish_name}) => {
    return (
        <View style={styles.menu}>
            <View style={styles.section1}>
                <Image style={styles.thumb} source={require('../assets/images/icons/thumbnail.png')}/>
                <Text style={styles.dishName}>{dish_name}</Text>
            </View>
            <View>
                <Text style={styles.desc}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididun...</Text>
            </View>
            <View style={styles.varientBox}>
                <Text style={styles.varientName}>Small</Text>
                <Text style={styles.varientCost}>$2.00</Text>
            </View>
            <View style={styles.varientBox}>
                <Text style={styles.varientName}>Medium</Text>
                <Text style={styles.varientCost}>$2.99</Text>
            </View>
        </View>
    )
}

export default SubMenu

const styles = StyleSheet.create({
    menu:{
        marginTop: 15,
        marginBottom: 15
    },
    section1:{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8
    },
    thumb:{
        height: widthPercentageToDP(10),
        width: widthPercentageToDP(10)
    },
    dishName:{
        fontSize: 18,
        fontFamily: 'Poppins Medium',
        marginLeft: 10
    },
    desc:{
        fontSize: 12,
        fontFamily: 'Poppins Regular',
    },
    varientBox:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10
    },
    varientName:{
        fontSize: 14,
        fontFamily: 'Poppins Medium'
    },
    varientCost:{
        fontSize: 18,
        fontFamily: 'Poppins Medium'
    }
})
