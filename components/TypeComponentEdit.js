import React, { useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import ToggleSwitch from 'toggle-switch-react-native'

const TypeComponentEdit = ({data, selectThisType, deselectThisType, is_checked}) => {
    const [isOn, setIsOn] = useState(is_checked === 1? true: false)
    const handleToggle = (id) => {
        
        if(isOn){
            //remove
            deselectThisType(id)
        }else{
            //add
            selectThisType(id)
        }
        setIsOn(!isOn)
    }
    return (
        <View key={data.data_type_id}>
            <View style={styles.comp}>
                <View style={styles.compPart1}>
                    <Image style={styles.compImg} source={{uri: data.image}}/>
                    <Text style={styles.compText}>{data.name}</Text>
                </View>
                <ToggleSwitch
                    isOn={isOn}
                    onColor="#635CC9"
                    offColor="#635CC920"
                    // label="Has Varients?"
                    labelStyle={{ color: "black", fontFamily: 'Poppins Medium'}}
                    size='large'
                    onToggle={()=>handleToggle(data.item_type_id)}
                />
            </View>
            <View style={styles.line2}></View>
        </View>
    )
}

export default TypeComponentEdit

const styles = StyleSheet.create({
    line2:{
        borderWidth: 1,
        borderColor: '#00000006',
        width:widthPercentageToDP(100),
        marginVertical: 7
    },
    comp:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 23
    },
    compPart1:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    compText:{
        fontFamily: 'Poppins Regular',
        fontSize: 18
    },
    compImg:{
        height: 25,
        width: 25,
        marginRight: 5
    },
})
