import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { connect } from 'react-redux'
import HeaderSVG from '../components/HeaderSVG'
import MenuButtons from '../components/MenuButtons'
import NewMenuButton from '../components/NewMenuButton'
import { getMenu, updateMenuOrder } from '../store/action'
import DraggableFlatList, {
    RenderItemParams,
} from "react-native-draggable-flatlist";
import { strings } from '../locales/i18n'

const Menu = ({ navigation, user_id, token, getMenu, route, updateMenuOrder }) => {
    const [data, setdata] = useState(null)
    const [dataItems, setDataItems] = useState([])
    useEffect(async () => {
        var bodyFormData = new FormData();
        bodyFormData.append('user_id', user_id);
        bodyFormData.append('token', token);
        bodyFormData.append('restaurant_id', route.params.restaurant_id);
        const res = await getMenu(bodyFormData)
        setdata(res.data.data)
        setDataItems(res.data.data.menu)
    }, [])
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            var bodyFormData = new FormData();
            bodyFormData.append('user_id', user_id);
            bodyFormData.append('token', token);
            bodyFormData.append('restaurant_id', route.params.restaurant_id);
            const res = await getMenu(bodyFormData)
            setdata(res.data.data)
            setDataItems(res.data.data.menu)
        });

        return unsubscribe;
    }, [navigation]);
    const handleSorting = async (data) =>{
        const new_order = data.map(item=>item.menu_id);
        // console.log(new_order)
        var bodyFormData = new FormData();
        bodyFormData.append('user_id', user_id);
        bodyFormData.append('token', token);
        bodyFormData.append('menu_ids', new_order.toString());
        const res = await updateMenuOrder(bodyFormData)
    }
    const renderItem = useCallback(
        ({ item, index, drag, isActive }: RenderItemParams<Item>) => {
            return (
                <View style={{ backgroundColor: isActive ? "#635CC925" : "transparent" }}>
                    <MenuButtons key={index} drag={drag} navigation={navigation} title={item.name} uri={item.image} data={item} restaurant_id={route.params.restaurant_id} themeURL={route.params.themeURL} public_url={route.params.public_url} brandImage={route.params.brandImage} />
                </View>
            );
        },
        []
    );
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
                <DraggableFlatList
                    nestedScrollEnabled
                    data={dataItems}
                    renderItem={renderItem}
                    dragItemOverflow={true}
                    keyExtractor={(item, index) => `draggable-item-${index}`}
                    onDragEnd={({ data }) => {setDataItems(data);handleSorting(data);}}

                    ListHeaderComponent={() => {
                        return <>
                            <HeaderSVG uri={route.params.brandImage} />
                            <View source={require('../assets/images/banners/mask.png')} style={styles.banner} resizeMode="stretch">
                                <TouchableOpacity
                                    style={styles.bell}
                                    onPress={() => navigation.goBack()}
                                >
                                    <Image source={require('../assets/images/topbar/back.png')} style={{ height: 42, width: 42 }} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.previewBTN} onPress={() => navigation.navigate('MenuPreview', { themeURL: route.params.themeURL })}>
                                    <Text style={styles.preview}>{strings('Business Home Screen2')}</Text>
                                </TouchableOpacity>
                                <View style={styles.info}>
                                    <View style={styles.nameContainer}>
                                        <Text numberOfLines={2} style={styles.name}>{data && data.restaurant.name}</Text>
                                    </View>
                                </View>
                            </View>
                        </>
                    }}
                    ListFooterComponent={() => {
                        return <>
                            <NewMenuButton action={() => navigation.navigate('NewMenu', { restaurant_id: route.params.restaurant_id })} />
                            <View style={{ marginBottom: 150 }}></View>
                        </>
                    }}
                />
            </SafeAreaView>
            <TouchableOpacity style={styles.qrbutton} onPress={() => navigation.navigate('QR', { restaurant_id: route.params.restaurant_id, img: route.params.brandImage, url: route.params.public_url})}>
                <Image source={require('../assets/images/icons/qr.png')} style={{ height: 80, width: 80 }} />
            </TouchableOpacity>
        </SafeAreaView>
    )
}
const mapStataeToProps = state => {
    return {
        user_id: state.auth.user_id,
        token: state.auth.token
    }
}
export default connect(mapStataeToProps, { getMenu, updateMenuOrder })(Menu)

const styles = StyleSheet.create({
    banner: {
        position: 'relative',
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(30),
        marginBottom: 25
    },
    logoContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: heightPercentageToDP(8.5)
    },
    logo: {},
    bell: {
        position: 'absolute',
        top: heightPercentageToDP(5),
        left: widthPercentageToDP(3.5),
        //transform: [{ rotate: '180deg' }]
    },
    info: {
        marginTop: heightPercentageToDP(14),
        paddingHorizontal: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    nameContainer: {
        flexBasis: widthPercentageToDP(66),
        flexDirection: 'row'
    },
    name: {
        flexWrap: 'wrap',
        fontFamily: 'Poppins Medium',
        fontStyle: 'normal',
        fontSize: 37,
        color: '#FFFFFF',
        lineHeight: 40,
        textTransform: 'capitalize'
    },
    previewBTN: {
        backgroundColor: '#635CC9',
        paddingHorizontal: 18,
        paddingVertical: 7,
        borderRadius: 23,
        position: 'absolute',
        top: heightPercentageToDP(5.4),
        right: widthPercentageToDP(3.5),
    },
    preview: {
        fontFamily: 'Poppins Medium',
        fontSize: 16,
        color: '#fff'
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 17,
        width: widthPercentageToDP(84),
        height: 115,
        padding: 10,
        marginHorizontal: widthPercentageToDP(8),
        marginTop: 40,
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
        alignItems: 'center'
    },
    subBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 97,
        height: '100%',
        backgroundColor: '#635CC910',
        borderRadius: 10,
    },
    new: {
        fontFamily: 'Poppins Medium',
        color: '#635CC9',
        fontSize: 15,
        marginLeft: 15
    },
    qrbutton: {
        position: 'absolute',
        right: 25,
        top: heightPercentageToDP(84),
        //backgroundColor: '#fff',
        padding: 0,
        borderRadius: 0,
        // elevation: 3,
        //ios
        //shadowColor: "#d4d4d4",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.02,
        //shadowRadius: 0.84,
    }

})
