import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { widthPercentageToDP } from 'react-native-responsive-screen'


const OptionComponentEdit = ({name, option_id, selectThisOption, deselectThisOption, is_checked, image, black_image}) => {
    const [active, setactive] = useState(is_checked === 1? true: false)
    const toggleActivity = () => {
        
        if(active){
            //remove
            deselectThisOption(option_id)
        }else{
            //add
            selectThisOption(option_id)
        }
        setactive(!active)
    }
    return (
        <TouchableOpacity style={active?styles.active:styles.inactive} onPress={toggleActivity}>
            {/* <Image style={styles.jar} source={active?require('../assets/images/icons/jar_white.png'):require('../assets/images/icons/jar.png')} /> */}
            <Image style={styles.jar} source={{uri: active ? image : black_image}} />
            <Text style={active?styles.activeText:styles.inactiveText}>{name}</Text>
            {active && <Image style={styles.tick} source={require('../assets/images/icons/option_tick.png')} />}
        </TouchableOpacity>
    )
}

export default OptionComponentEdit

const styles = StyleSheet.create({
    active:{
        flexDirection: 'row',
        backgroundColor:'#635CC9',
        justifyContent: 'space-between',
        alignItems:'center',
        paddingHorizontal: 12,
        paddingVertical: 16,
        width: widthPercentageToDP(45),
        marginHorizontal: widthPercentageToDP(2.4),
        borderRadius: 7,
        marginBottom: 8
    },
    inactive:{
        flexDirection: 'row',
        backgroundColor:'#7f7f7f40',
        // justifyContent: 'space-between',
        alignItems:'center',
        paddingHorizontal: 12,
        paddingVertical: 16,
        width: widthPercentageToDP(45),
        marginLeft: widthPercentageToDP(2.4),
        marginRight: widthPercentageToDP(2.4),
        borderRadius: 7,
        marginBottom: 8,
    },
    activeText: {
        fontSize: 13,
        fontFamily: 'Poppins Medium',
        color: '#fff'
    },
    inactiveText: {
        fontSize: 13,
        fontFamily: 'Poppins Medium',
        color: '#000',
        marginLeft: 10
    },
    jar:{
        height: 24,
        width: 24    },
    tick:{
        height: 13.7,
        width: 18
    }
})
