import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, Switch, TouchableOpacity, Image } from 'react-native'
import ToggleSwitch from 'toggle-switch-react-native'
import { strings } from '../locales/i18n'
const AddNewVarient = ({closeFunc, addVariant}) => {
    const [name, setname] = useState("")
    const [price, setprice] = useState("")
    const [err, seterr] = useState("")
    const handleSubmit = () => {
        if(name.trim().length < 1){
            seterr("Enter Valid Variant Name")
            return
        }else if(price.trim().length < 1 ){
            seterr("Enter Valid price")
            return
        }
        addVariant(name,price)
        closeFunc()
    }
    const checkPrice = (value) => {
        if(value === ""){
            setprice(value)
        }
        let newValue = value.replace(',','.')
       
        if(!isNaN(newValue) && Number(newValue) > 0){
         
            setprice(newValue);
        }
    }
    return (
        <View style={styles.box}>
            <View>
                <Text style={styles.title}>{strings("Add Variant")}</Text>
                <Text style={{textAlign: 'center', fontFamily: 'Poppins Medium', color: 'red'}}>{err}</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setname}
                    value={name}
                    placeholder={strings('ex small medium large')}
                    textAlign="center"
                    placeholderTextColor="#635CC9"
                    
                />
                
                <TextInput
                    style={styles.input}
                    onChangeText={(value)=>checkPrice(value)}
                    value={price}
                    placeholder="Price"
                    textAlign="center"
                    placeholderTextColor="#635CC9"
                    keyboardType="decimal-pad"
                />
            </View>
            <View style={styles.allBtn}>
                <TouchableOpacity style={styles.btn1} onPress={closeFunc}>
                    <Text style={styles.btnText1}>{strings("Cancel")}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn2} onPress={handleSubmit}>
                    <Image source={require('../assets/images/icons/tick.png')} />
                    <Text style={styles.btnText2}>{strings("Add")}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AddNewVarient

const styles = StyleSheet.create({
    box:{
        height: '90%',
        padding: 27,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'

    },
    title:{
        fontFamily: 'Poppins Medium',
        textAlign: 'center',
        fontSize: 24
    },
    allBtn:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    btn1:{

    },
    btnText1:{
        color: '#635CC9',
        fontSize: 15,
        fontFamily: 'Poppins Medium'
    },
    btn2:{
        backgroundColor: '#635CC9',
        paddingVertical: 14,
        paddingLeft: 40,
        paddingRight: 50,
        borderRadius: 56,
        flexDirection: 'row',
        alignItems: 'center'
    },
    btnText2:{
        color: '#fff',
        fontSize: 15,
        fontFamily: 'Poppins Medium',
        paddingLeft: 7
    },
    input: {
        height: 50,
        marginVertical:5,
        borderWidth: 1,
        borderRadius:25,
        fontSize:15,
        backgroundColor:"#726AE910",
        borderColor:"#726AE910",
        color: '#635CC9',
        fontFamily: 'Poppins Medium'
        
    
      },
      switchBox:{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 10
      }
})
