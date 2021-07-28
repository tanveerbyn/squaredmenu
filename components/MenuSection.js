import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import { connect } from 'react-redux'
import { strings } from '../locales/i18n'
import { deleteItem } from '../store/action'

const MenuSection = ({menuName, data, addNew, navigation, deleteItem, user_id, token, refresh, menu_id, currency, drag}) => {

    const deleteThisItem = async () => {
        var bodyFormData = new FormData();
        bodyFormData.append('user_id', user_id);
        bodyFormData.append('token', token);
        bodyFormData.append('item_id', data.item_id);
        const res = await deleteItem(bodyFormData)
        if(res.data.status){
            refresh()
        }
    }
    const createTwoButtonAlert = () =>
        Alert.alert(
          `${strings('Delete Item1')}`,
        `${strings('Delete Item2')}`,
        [
            {
            text: `${strings('Delete Item3')}`,
            onPress: () => deleteThisItem(),
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
        <View style={styles.mainContainer}>
            <View style={styles.sectionHeader}>
                <TouchableOpacity onPressIn={drag}><Image source={require('../assets/images/icons/drag_icon.png')} style={{width: 18, height: 18}}/></TouchableOpacity>
                <View style={styles.actionBtns}>
                    <TouchableOpacity style={styles.delete} 
                        onPress={()=>navigation.navigate('EditDish', {item_id:data.item_id, menu_id:menu_id, currency:currency})}
                    >
                        <Image source={require('../assets/images/icons/edit_transparent.png')} style={{height: 30, width: 30}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.delete} onPress={createTwoButtonAlert}>
                        <Image source={require('../assets/images/icons/delete.png')} style={{height: 16, width: 14}}/>
                    </TouchableOpacity>
                </View>
            </View>
                <View style={styles.menuItem}>
                    <View style={styles.menuSubItem}>
                        <TouchableOpacity style={styles.dishNameCont} onPress={()=>navigation.navigate('DishDetail', {item_id:data.item_id, menu_id:menu_id, currency:currency})}>
                            <Text numberOfLines={1} style={styles.itemName}>{menuName}</Text>
                        </TouchableOpacity>
                        {data.has_variants === 0 && <Text style={styles.cost}>{data.price_formatted}</Text>}
                    </View>
                    
                    {
                       data.has_variants === 1 && data.variants.map((varItem,idx1) => {
                            return <View key={idx1} style={styles.varientBox}>
                                <View style={styles.part1}>
                                    <Image source={require('../assets/images/icons/bullet.png')}/>
                                    <Text numberOfLines={1} style={styles.varientItemName}>{varItem.option}</Text>
                                </View>
                                <Text style={styles.cost}>{varItem.price_formatted}</Text>
                            </View>
                        })
                    }
                </View>
            {data.has_variants === 1 && <View style={styles.bar}></View>}
            {/* {data.has_variants === 1 && <TouchableOpacity style={styles.newSection} onPress={addNew}>
                <Text style={styles.sectionName}>Add New Varient</Text>
                <Image style={styles.plus} source={require('../assets/images/icons/plus.png')}/>
            </TouchableOpacity>} */}
            {data.has_variants === 0 && <View style={{paddingBottom: 10}}>
            </View>}
        </View>
    )
}
const mapStateToProps = state => {
    return{
        user_id: state.auth.user_id,
        token: state.auth.token
    }
}
export default connect(mapStateToProps,{deleteItem})(MenuSection)

const styles = StyleSheet.create({
    mainContainer:{
        backgroundColor: '#fff',
        borderRadius: 17,
        marginHorizontal: 25,
        marginBottom: 15,
        paddingBottom: 10,
        elevation:2,
//ios
        shadowColor: "#d4d4d4",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
    },
    actionBtns:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    sectionHeader:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingTop: 7,
        paddingBottom: 3
    },
    sectionText:{
        fontFamily: 'Poppins Bold',
        color: '#000',
        fontSize: 15
    },
    delete:{
        padding: 5
    },
    menuItem:{
        borderTopColor: '#00000004',
        borderTopWidth:1,
        paddingTop: 8,
        paddingHorizontal: 15,
    },
    itemName:{
        fontSize: 15,
        fontFamily: 'Poppins Medium',
        textTransform: 'capitalize',
    },
    dishNameCont:{
        flexBasis: '50%'
    },
    varientBox:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    part1:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    varientItemName:{
        fontFamily: 'Poppins Regular',
        marginLeft: 12,
        paddingTop: 4,
        fontSize: 15,
        color: '#000'
    },
    cost:{
        fontFamily: 'Poppins Regular',
        fontSize: 18,
        color: '#000'
    },
    menuSubItem:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    newSection:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        paddingHorizontal: 15,
        paddingTop: 20,
        paddingBottom: 16,
        backgroundColor: '#fff',
        borderRadius: 17
    },
    plus:{
        height: 13,
        width: 13,
    },
    sectionName:{
        fontFamily: 'Poppins Regular',
        color: '#635CC9',
        fontSize: 15
    },
    bar:{
        borderTopColor: '#00000004',
        borderTopWidth:1,
    }
})
