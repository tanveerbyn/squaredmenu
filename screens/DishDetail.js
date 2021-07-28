import React, { useEffect, useState } from 'react'
import { SafeAreaView, TouchableOpacity } from 'react-native'
import { Image } from 'react-native';
import { ScrollView } from 'react-native';
import { StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import { getItemDetail } from '../store/action';

const DishDetail = ({navigation, route, user_id, token, getItemDetail}) => {

    const [data, setdata] = useState(null)
    const [allergensAvailable, setAllergensAvailable] = useState(false)

    useEffect(async () => {
        var bodyFormData = new FormData();
        bodyFormData.append('user_id', user_id);
        bodyFormData.append('token', token);
        bodyFormData.append('item_id', route.params.item_id);
        const res = await getItemDetail(bodyFormData)
        setdata(res.data.data)
        total_allegrens = 0
        res.data.data.extra_options.map(opt => {
            if(opt.is_checked !== 0){
                total_allegrens += 1
        }})
        if(total_allegrens > 0){
            setAllergensAvailable(true)
        }
    }, [])
    return (
        <>
        {data && <SafeAreaView style={styles.body}>
            <ScrollView>
            <FastImage
                style={styles.dishImage}
                source={{
                    uri: data.item.image,
                    priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
            />
            
            <TouchableOpacity 
                style={styles.bell}
                onPress={()=>navigation.goBack()}
            >
                <Image source={require('../assets/images/topbar/back.png')} style={{height:42, width:42}}/>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.edit}
                onPress={()=>{navigation.navigate('EditDish',{item_id: route.params.item_id, menu_id: route.params.menu_id, currency:route.params.currency})}}
                >
                <Image source={require('../assets/images/icons/edit.png')} style={styles.editIcon}/>
            </TouchableOpacity>
            <View style={styles.part1}>
                <View style={styles.dishNameContainer}><Text style={styles.dishName}>{data.item.name}</Text></View>
                {/* <View style={styles.trademarks}>
                    <Image  style={styles.tm1} source={require('../assets/images/icons/gluten.png')} />
                    <Image  style={styles.tm2} source={require('../assets/images/icons/vegan.png')} />
                </View> */}
            </View>
            {data.item.description !== "" && <View style={styles.descBox}>
                <Text style={styles.desc}>{data.item.description}</Text>
            </View>}
            {data.item.has_variants === 1 && data.item.variants.map(vari => {
                return <View key={vari.variant_id} style={styles.varientBody}>
                            <Text style={styles.varientName}>{vari.option}</Text>
                            <Text style={styles.varientCost}>{vari.price_formatted}</Text>
                        </View>
            })}
            <View style={{borderTopWidth: 1, borderColor: '#00000010', paddingTop:20}}></View>
            <View style={{paddingLeft: 20, marginBottom:20}}>
                {data.item_types.map(type =>{
                    if(type.is_checked !== 0){
                        return  <View key={type.item_type_id} style={styles.compPart1}>
                                    <FastImage
                                            style={styles.compImg}
                                            source={{
                                                uri: type.image,
                                                priority: FastImage.priority.normal,
                                            }}
                                            resizeMode={FastImage.resizeMode.cover}
                                        />
                                    <Text style={styles.compText}>{type.name}</Text>
                                </View>
                    }
                })}
            </View>
            {allergensAvailable && <Text  style={{fontFamily: 'Poppins Medium', fontSize: 18, color: '#000', marginTop: 20,marginBottom:20, marginLeft: widthPercentageToDP(4)}}>Allergens</Text>}
            <View style={{display:'flex', flexDirection:'row', flexWrap:'wrap'}}>
                {data.extra_options.map(opt => {
                    console.log(opt.is_checked)
                    if(opt.is_checked !== 0){
                        
                        return <View style={styles.active} key={opt.option_id}>
                                    <Image style={styles.jar} source={{uri: opt.image}} />
                                    <Text style={styles.activeText}>{opt.name}</Text>
                                    <Image style={styles.tick} source={require('../assets/images/icons/option_tick.png')} />
                                </View>
                    }
                })}
            </View>
            </ScrollView>
        </SafeAreaView>}
        {!data && <SafeAreaView style={{flex: 1, height:heightPercentageToDP(100)}}>
                <View style={{backgroundColor:'#fff',flexDirection:'column',justifyContent:'center', alignItems: 'center', height:heightPercentageToDP(100)}}>
                    <Text style={{fontFamily:'Poppins Medium', fontSize: 20}}>Loading...</Text>
                </View>
            </SafeAreaView>}
        </>
    )
}
const mapStateToProps = state => {
    return {
        user_id: state.auth.user_id,
        token: state.auth.token
    }
}
export default connect(mapStateToProps, {getItemDetail})(DishDetail)

const styles = StyleSheet.create({
    body:{
        flex: 1,
        backgroundColor: '#fff'
    },
    dishImage:{
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(30),
    },
    bell:{
        position:'absolute',
        top: heightPercentageToDP(5),
        left:widthPercentageToDP(3.5),
        
    },
    edit:{
        position:'absolute',
        top: heightPercentageToDP(3),
        right:widthPercentageToDP(3.5),
        transform: [{ rotate: '180deg'}],
    },
    part1:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginTop: 15
    },
    trademarks:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    dishNameContainer:{
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    dishName:{
        flexBasis: '70%',
        fontFamily: 'Poppins SemiBold',
        fontSize: widthPercentageToDP(100)/9,
        lineHeight: 60 * 0.75,
        paddingTop: 60 - 35 * 0.75,
        textTransform: 'capitalize'
    },
    tm1:{
        width: widthPercentageToDP(9),
        height: widthPercentageToDP(9),
    },
    tm2:{
        width: widthPercentageToDP(13),
        height: widthPercentageToDP(13),
    },
    descBox:{
        paddingVertical: 13,
        borderColor:'#00000010',
        borderTopWidth: 1,
        borderBottomWidth: 1,
    },
    desc:{
        fontSize: 17,
        fontFamily: 'Poppins Regular',
        paddingHorizontal: 15,
        color: '#989898'
    },
    varientBody:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 17,
        paddingHorizontal: 17
    },
    varientName:{
        fontSize: 18,
        fontFamily: 'Poppins Medium',
        textTransform: 'capitalize'
    },
    varientCost:{
        fontSize: 18,
        fontFamily: 'Poppins Medium'
    },
    comp:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 23
    },
    compPart1:{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
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
    activeText: {
        fontSize: 18,
        fontFamily: 'Poppins Medium',
        color: '#fff'
    },
    jar:{
        height: 24,
        width: 24
    },
    tick:{
        height: 13.7,
        width: 18
    },
    editIcon:{
        height: 58,
        width: 58
    }
})
