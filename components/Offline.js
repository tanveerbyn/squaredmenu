import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import Icon from 'react-native-vector-icons/MaterialIcons'

const Offline = () => {
    return (
        <View style={styles.wrapper}>
            <View style={styles.container}>
                <Icon name="wifi-off" size={50} color="red"/>
                <Text style={styles.txt}>You are offline!</Text>
            </View>
        </View>
    )
}

export default Offline

const styles = StyleSheet.create({
    wrapper:{
        position:'absolute',
        height:heightPercentageToDP(100),
        width: widthPercentageToDP(100),
        backgroundColor: '#00000020',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    container:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        height: 200,
        width: 250,
        backgroundColor: '#fff',
        borderRadius: 8
    },
    txt:{
        fontFamily: 'Poppins SemiBold',
        fontSize: 22,
        color:'#635CC9'
    }
})
