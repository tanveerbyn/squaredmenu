import React from 'react'
import { StyleSheet, Text, View,Image } from 'react-native'
import Google from '../assets/images/icons/googleicon.svg'
import Facebook from '../assets/images/icons/facebookicon.svg'

const SocialMediaIcon = () => {
    return (
        <View style={styles.socialMedia}>
              <Google
              style={styles.icon}

            
            />
            <Facebook
             style={styles.icon}

           
            />
        </View>
    )
}

export default SocialMediaIcon

const styles = StyleSheet.create({

    socialMedia:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'

    },
    icon:{
        marginHorizontal:10
    }
})
