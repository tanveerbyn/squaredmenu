import React, { useEffect, useState, useRef } from 'react'
import { Alert, SafeAreaView, TextInput, TouchableOpacity, Dimensions } from 'react-native'
import { ScrollView } from 'react-native';
import { Image } from 'react-native';
import { StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import ToggleSwitch from 'toggle-switch-react-native';
import TypeComponent from '../components/TypeComponent';
import { getItemDetail, addNewItem } from '../store/action';
import { Button } from 'react-native-elements'
import { Platform } from 'react-native';
import OptionComponent from '../components/OptionComponent';
import ImagePicker from 'react-native-image-crop-picker';
import RBSheet from "react-native-raw-bottom-sheet";
import AddNewVarient from '../components/AddNewVarient';
import EditVarient from '../components/EditVarient';
import TypeComponentEdit from '../components/TypeComponentEdit';
import OptionComponentEdit from '../components/OptionComponentEdit';
import ImageChoice from '../components/ImageChoice';
import NonVarientPrice from '../components/NonVarientPrice';
import { strings } from '../locales/i18n';

const EditDish = ({ navigation, route, getItemDetail, user_id, token, addNewItem }) => {
    const refRBSheet = useRef();
    const refRBSheet1 = useRef();
    const refRBSheet2 = useRef();
    const refRBSheet3 = useRef();
    const [fetched, setFetched] = useState(null)
    const [isOn, setisOn] = useState(false)
    const [options, setOptions] = useState([])
    const [selectedOptions, setSelectedOptions] = useState([])
    const [types, setTypes] = useState([])
    const [selectedTypes, setselectedTypes] = useState([])
    const [clicked, setClicked] = useState(false)
    const [photo, setPhoto] = useState(null)
    const [defaultImage, setdefaultImage] = useState(null)
    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [desc, setDesc] = useState('')
    const [variants, setVariants] = useState([])
    const [currentEditVarient, setcurrentEditVarient] = useState({})
    const [err, seterr] = useState("")
    const [has_variants, setHas_variants] = useState(0)
    var { menu_id } = route.params

    useEffect(async () => {
        var bodyFormData = new FormData();
        bodyFormData.append('user_id', user_id);
        bodyFormData.append('token', token);
        bodyFormData.append('item_id', route.params.item_id);
        const res = await getItemDetail(bodyFormData)
        if (res.data.status) {
            setFetched(true)
            setTypes(res.data.data.item_types)
            setOptions(res.data.data.extra_options)
            setisOn(res.data.data.item.available === 1 ? true : false)
            setdefaultImage(res.data.data.item.image)
            setName(res.data.data.item.name)
            setDesc(res.data.data.item.description)
            setHas_variants(res.data.data.item.has_variants)
            setPrice(res.data.data.item.price)
            const variants = res.data.data.item.variants.map(item => {
                return {
                    name: item.option,
                    price: item.price
                }
            })
            setVariants(variants)
            console.log("Types =>", res.data.data.item_types)
            const selectedTypesTemp = Array()
            for await (var typ of res.data.data.item_types) {
                if (typ.is_checked === 1) {
                    selectedTypesTemp.push(typ.item_type_id)
                }
            }
            setselectedTypes(selectedTypesTemp)

            const selectedOptionsTemp = []
            for await (var opt of res.data.data.extra_options) {
                if (opt.is_checked === 1) {
                    selectedOptionsTemp.push(opt.option_id)
                }
            }
            setSelectedOptions(selectedOptionsTemp)
        }
    }, [])
    const selectThisType = (id) => {
        const temp = [...selectedTypes]
        temp.push(id)
        setselectedTypes(temp)
    }
    const deselectThisType = (id) => {
        const temp = [...selectedTypes]
        temp.forEach((item, idx) => {
            if (item === id) {
                temp.splice(idx, 1)
                return
            }
        })
        setselectedTypes(temp)
    }
    const selectThisOption = (id) => {
        console.log("Selected Options", selectedOptions)
        const temp = [...selectedOptions]
        temp.push(id)
        setSelectedOptions(temp)
    }
    const deselectThisOption = (id) => {
        console.log("DeSelected Options", selectedOptions)
        const temp = [...selectedOptions]
        temp.forEach((item, idx) => {
            if (item === id) {
                temp.splice(idx, 1)
                return
            }
        })
        setSelectedOptions(temp)
    }
    const imagepick = () => {
        ImagePicker.openPicker({
            width: 375,
            height: 225,
            cropping: true,
            includeBase64: true
        }).then(image => {
            // console.log(image)
            refRBSheet.current.close()
            setPhoto(image)
        }).catch(err => {
            console.log(err);
        });
    }
    const camerapick = () => {
        ImagePicker.openCamera({
            width: 375,
            height: 225,
            cropping: true,
            includeBase64: true
        }).then(image => {
            // console.log(image)
            refRBSheet.current.close()
            setPhoto(image)
        }).catch(err => {
            console.log(err);
        });
    }
    const addVariant = (name, price) => {
        const temp = [...variants]
        temp.push({
            name: name,
            price: parseFloat(price)
        })
        setVariants(temp)
        console.log("Add Variant", temp)
    }
    const editVariant = (name, price, pos) => {
        const temp = [...variants]
        temp[pos] = { name: name, price: parseFloat(price) }
        setVariants(temp)
    }
    const deleteVariant = (pos) => {
        var temp = variants
        temp.splice(pos, 1)
        setVariants(temp)
    }
    const handleSubmit = async () => {
        if (name.trim().length < 1) {
            seterr("Enter Valid Item Name")
            return
            // }else if(desc.trim().length < 1){
            //     seterr("Enter Valid Description")
            //     return
        } else if (has_variants === 1 && variants.length < 1) {
            seterr("Enter atleast one varient.")
            return
        } else {
            seterr("")
        }
        //after checking validation
        setClicked(true)
        var bodyFormData = new FormData();
        bodyFormData.append('user_id', user_id);
        bodyFormData.append('token', token);
        bodyFormData.append('menu_id', route.params.menu_id);
        bodyFormData.append('name', name);
        bodyFormData.append('description', desc);
        if (photo)
            bodyFormData.append('image', {
                name: name,
                type: photo.mime,
                uri: Platform.OS === 'android' ? photo.path : photo.path.replace('file://', ''),
            });
        bodyFormData.append('has_variants', has_variants);
        bodyFormData.append('price', has_variants === 0 ? parseFloat(price) : "");
        bodyFormData.append('variants', has_variants !== 0 ? JSON.stringify({ variants: variants }) : "");
        bodyFormData.append('item_type_ids', selectedTypes.toString());
        bodyFormData.append('option_ids', selectedOptions.toString());
        bodyFormData.append('available', isOn ? 1 : 0);
        bodyFormData.append('item_id', route.params.item_id);

        for (let [key, value] of bodyFormData._parts) {
            console.log(`${key}: ${JSON.stringify(value)}`)
        }
        const res = await addNewItem(bodyFormData)
        setClicked(false)
        if (res.data.status) {
            navigation.navigate('MenuList', { menu_id: route.params.menu_id })
            // Alert.alert(  
            //     'Success',  
            //     res.data.message,  
            //     [  
            //         {text: 'OK', onPress: () => navigation.navigate('MenuList', {menu_id:route.params.menu_id})},  
            //     ]  
            // );
        } else {
            if (Platform.OS === 'android') {
                ToastAndroid.showWithGravity(
                    res.data.message,
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM
                )
            } else {
                AlertIOS.alert(res.data.message)
            }
        }
    }
    return (
        <>
            {fetched && <SafeAreaView style={styles.body}>
                <ScrollView>
                    <TouchableOpacity onPress={() => refRBSheet.current.open()}>
                        <Image source={!photo ? (!defaultImage ? require('../assets/images/banners/imageUpload.png') : { uri: defaultImage }) : { uri: `data:${photo.mime};base64,${photo.data}` }} style={styles.imageupload} />
                    </TouchableOpacity>

                    <View style={styles.topElements}>
                        <TouchableOpacity
                            style={styles.bell}
                            onPress={() => navigation.goBack()}
                        >
                            <Image source={require('../assets/images/topbar/back.png')} style={{ height: 42, width: 42 }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.previewBTN} onPress={() => refRBSheet.current.open()}>
                            <Text style={styles.preview}>{strings("Change Image")}</Text>
                        </TouchableOpacity>

                    </View>



                    <View style={styles.part1}>
                        <View style={styles.dishNameContainer}>
                            <TextInput
                                fontSize={30}
                                fontFamily={'Poppins Medium'}
                                onChangeText={setName}
                                value={name}
                                width={widthPercentageToDP(60)}
                                multiline={true}
                                placeholder="Item Name"
                                opacity={0.9}
                                placeholderTextColor="#00000090"
                            />
                        </View>
                        {/* <TouchableOpacity style={styles.trademarks} onPress={()=>{setName('')}}>
                    <Image  style={styles.tm1} source={require('../assets/images/icons/delete.png')} />
                </TouchableOpacity> */}
                        {price !== 0 && <View>
                            <Text style={styles.nonPrice}>{route.params.currency.toUpperCase()} {parseFloat(price).toFixed(2).toString().replace('.', ',')}</Text>
                        </View>}
                    </View>
                    <View style={styles.descBox}>
                        <TextInput
                            style={styles.desc}
                            onChangeText={setDesc}
                            value={desc}
                            placeholder={strings('Item Details Screen1')}
                            // textAlign="center"
                            placeholderTextColor="#00000050"
                            numberOfLines={4}
                            multiline={true}
                        />
                    </View>
                    <View style={{ marginTop: 20 }}></View>
                    {has_variants === 0 && <View style={styles.varientBody}>
                        <Text style={styles.varientName}>{strings('Item Details Screen2')}</Text>
                        <View style={styles.part2}>
                            <Text style={styles.varientCost}>{route.params.currency.toUpperCase()} {parseFloat(price).toFixed(2).toString().replace('.', ',')}</Text>
                            <TouchableOpacity onPress={() => { refRBSheet3.current.open(); }}><Image style={styles.editIcon} source={require('../assets/images/icons/edit.png')} /></TouchableOpacity>
                        </View>
                    </View>
                    }
                    {has_variants === 1 && variants.map((item, idx) => {
                        return <View key={idx} style={styles.varientBody}>
                            <Text style={styles.varientName}>{item.name}</Text>
                            <View style={styles.part2}>
                                <Text style={styles.varientCost}>{route.params.currency.toUpperCase()} {parseFloat(item.price).toFixed(2).toString().replace('.', ',')}</Text>
                                <TouchableOpacity onPress={() => { setcurrentEditVarient({ name: item.name, price: item.price, pos: idx }); refRBSheet2.current.open(); }}><Image style={styles.editIcon} source={require('../assets/images/icons/edit.png')} /></TouchableOpacity>
                            </View>
                        </View>
                    })}

                    {has_variants === 1 && <TouchableOpacity style={styles.newVarientBtn} onPress={() => { refRBSheet1.current.open() }}>
                        <Text style={styles.newVarient}>{strings("Add New Variant")}</Text>
                        <Text style={styles.newVarient}>+</Text>
                    </TouchableOpacity>}
                    {has_variants === 1 && <View style={styles.line}></View>}
                    {types.map((item) => {

                        return <TypeComponentEdit key={item.item_type_id} data={item} selectThisType={(id) => selectThisType(id)} deselectThisType={(id) => deselectThisType(id)} is_checked={item.is_checked} />
                    })}
                    <Text style={{ fontFamily: 'Poppins Medium', fontSize: 18, color: '#000', marginTop: 20, marginLeft: widthPercentageToDP(4) }}>Allergens</Text>
                    <View style={styles.optionContainer}>
                        {options.map((item) => {
                            console.log(item)
                            return <OptionComponentEdit key={item.option_id} image={item.image} option_id={item.option_id} name={item.name} selectThisOption={(id) => selectThisOption(id)} deselectThisOption={(id) => deselectThisOption(id)} is_checked={item.is_checked} />
                        })}
                    </View>
                    <View style={styles.line}></View>

                    <View style={styles.hide}>
                        <Text style={styles.compText}>{strings('Item Details Screen22')}</Text>
                        <ToggleSwitch
                            isOn={isOn}
                            onColor="#635CC9"
                            offColor="#635CC920"
                            // label="Has Varients?"
                            labelStyle={{ color: "black", fontFamily: 'Poppins Medium' }}
                            size='large'
                            onToggle={() => setisOn(!isOn)}
                        />
                    </View>
                    <View style={styles.line2}></View>
                    {err.trim().length > 0 && <Text style={{ textAlign: 'center', fontFamily: 'Poppins Medium', color: 'red' }}>{err}</Text>}

                    <View style={{ marginBottom: 50 }}></View>
                </ScrollView>
                {
                    Platform.OS == 'android'
                        ?
                        <View style={{ position: 'absolute', zindex: 1, bottom: 0 ,marginHorizontal:20}}>
                            <Button
                                onPress={handleSubmit}
                                title={strings('Item Details Screen Edit')}
                                titleStyle={styles.btnText}
                                buttonStyle={styles.btn}
                                loading={clicked}
                            />
                        </View>
                        :
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 5, }}>
                            <Button
                                onPress={handleSubmit}
                                title={strings('Item Details Screen Edit')}
                                titleStyle={styles.btnText}
                                buttonStyle={styles.btn}
                                loading={clicked}
                            />
                        </View>
                }

                <RBSheet
                    ref={refRBSheet1}
                    closeOnDragDown={true}
                    closeOnPressMask={false}
                    // height={80}
                    animationType='slide'
                    customStyles={{
                        container: {
                            ...styles.container,
                            height: 360
                        },
                        wrapper: {
                            backgroundColor: "#00000025"
                        },
                        draggableIcon: {
                            backgroundColor: "#fff"
                        }
                    }}
                >
                    <AddNewVarient closeFunc={() => refRBSheet1.current.close()} addVariant={(name, price) => addVariant(name, price)} />
                </RBSheet>
                <RBSheet
                    ref={refRBSheet2}
                    closeOnDragDown={true}
                    closeOnPressMask={false}
                    // height={80}
                    animationType='slide'
                    customStyles={{
                        container: {
                            ...styles.container,
                            height: 360
                        },
                        wrapper: {
                            backgroundColor: "#00000025"
                        },
                        draggableIcon: {
                            backgroundColor: "#fff"
                        }
                    }}
                >
                    <EditVarient
                        closeFunc={() => refRBSheet2.current.close()}
                        editVariant={(name, price, pos) => editVariant(name, price, pos)}
                        defaultname={currentEditVarient.name}
                        defaultprice={`${currentEditVarient.price}`}
                        pos={currentEditVarient.pos}
                    />
                </RBSheet>
                <RBSheet
                    ref={refRBSheet3}
                    closeOnDragDown={true}
                    closeOnPressMask={false}
                    // height={80}
                    animationType='slide'
                    customStyles={{
                        container: {
                            ...styles.container,
                            height: 360
                        },
                        wrapper: {
                            backgroundColor: "#00000025"
                        },
                        draggableIcon: {
                            backgroundColor: "#fff"
                        }
                    }}
                >
                    <NonVarientPrice closeFunc={() => refRBSheet3.current.close()} O_price={price} editPrice={(price) => setPrice(price)} />
                </RBSheet>
                <RBSheet
                    ref={refRBSheet}
                    closeOnDragDown={true}
                    closeOnPressMask={true}
                    customStyles={{
                        container: {
                            ...styles.container,
                            height: 180,
                            backgroundColor: '#f4f4f4'
                        },
                        wrapper: {
                            backgroundColor: "#00000028"
                        },
                        draggableIcon: {
                            backgroundColor: "#f4f4f4"
                        }
                    }}
                >
                    <ImageChoice imagepick={() => imagepick()} camerapick={() => camerapick()} />
                </RBSheet>
            </SafeAreaView>}
            {!fetched && <SafeAreaView style={{ flex: 1, height: heightPercentageToDP(100) }}>
                <View style={{ backgroundColor: '#fff', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: heightPercentageToDP(100) }}>
                    <Text style={{ fontFamily: 'Poppins Medium', fontSize: 20 }}>Loading...</Text>
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
export default connect(mapStateToProps, { getItemDetail, addNewItem })(EditDish)

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#fff',
    },
    topElements: {

        position: 'absolute',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 15,
        marginTop: 30,
        width: "100%"
    },
    dishImage: {
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(30),
    },
    bell: {


        // transform: [{ rotate: '180deg'}]
    },
    part1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'center',
        paddingHorizontal: 15,
        marginTop: 15
    },
    trademarks: {
        backgroundColor: '#f5f5f5',
        padding: 15,
        borderRadius: 10
    },
    dishNameContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    dishName: {
        flexBasis: '70%',
        fontFamily: 'Poppins SemiBold',
        fontSize: widthPercentageToDP(100) / 8,
        lineHeight: 60 * 0.75,
        paddingTop: 60 - 35 * 0.75,
    },
    previewBTN: {
        backgroundColor: '#fff',
        paddingHorizontal: 18,
        paddingVertical: 7,
        borderRadius: 23,
        marginHorizontal: 30
    },
    preview: {
        fontFamily: 'Poppins Medium',
        fontSize: 16,
        color: '#635CC9'
    },
    tm1: {
        width: widthPercentageToDP(3.5),
        height: widthPercentageToDP(3.5),
    },
    tm2: {
        width: widthPercentageToDP(13),
        height: widthPercentageToDP(13),
    },
    nonPrice: {
        fontSize: 18,
        fontFamily: 'Poppins Medium',
        marginTop: 20
    },
    descBox: {
        paddingVertical: Platform.OS === 'ios' ? 50 : 0,
        borderColor: '#00000010',
        borderTopWidth: 1,
        borderBottomWidth: 1,
    },
    desc: {
        fontSize: 17,
        fontFamily: 'Poppins Regular',
        paddingHorizontal: 15,
        color: '#989898'
    },
    varientBody: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 17
    },
    varientName: {
        fontSize: 18,
        fontFamily: 'Poppins Medium'
    },
    varientCost: {
        fontSize: 18,
        fontFamily: 'Poppins Medium'
    },
    part2: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    newVarientBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#c4c4c430',
        paddingTop: 20,
        paddingBottom: 14,
        paddingHorizontal: 21,
        marginHorizontal: 22,
        borderRadius: 96,
    },
    newVarient: {
        fontFamily: 'Poppins Regular',
        fontSize: 15,
        color: '#635CC9'
    },
    line: {
        borderWidth: 1,
        borderColor: '#00000006',
        width: widthPercentageToDP(100),
        marginVertical: 26
    },
    line2: {
        borderWidth: 1,
        borderColor: '#00000006',
        width: widthPercentageToDP(100),
        marginVertical: 7
    },
    comp: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 23
    },
    compPart1: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    compText: {
        fontFamily: 'Poppins Regular',
        fontSize: 18
    },
    compImg: {
        height: 25,
        width: 25,
        marginRight: 5
    },
    hide: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30
    },
    btn: {
        backgroundColor: '#635CC9',
        borderRadius: 65,
        // paddingHorizontal: widthPercentageToDP()
        width: widthPercentageToDP(90),
        paddingVertical: heightPercentageToDP(1.5)
    },
    btnText: {
        fontFamily: 'Poppins Medium',
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
    },
    optionContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    imageupload: {
        width: widthPercentageToDP(100),
        height: widthPercentageToDP(100) * 418 / 750,
    },
    editIcon: {
        height: 45,
        width: 45
    }
})
