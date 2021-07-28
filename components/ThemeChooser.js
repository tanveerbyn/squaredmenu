import React from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View,SafeAreaView } from 'react-native'
import FastImage from 'react-native-fast-image'

const DATA = [{
        id: 0,
        url: 'https://www.wallpapertip.com/wmimgs/15-153603_high-resolution-portrait-studio-background.jpg' 
    },
    {
        id: 1,
        url: 'https://www.wallpapertip.com/wmimgs/15-153603_high-resolution-portrait-studio-background.jpg' 
    },
    {
        id: 2,
        url: 'https://www.wallpapertip.com/wmimgs/15-153603_high-resolution-portrait-studio-background.jpg' 
    },
    {
        id: 3,
        url: 'https://www.wallpapertip.com/wmimgs/15-153603_high-resolution-portrait-studio-background.jpg' 
    },
    {
        id: 4,
        url: 'https://www.wallpapertip.com/wmimgs/15-153603_high-resolution-portrait-studio-background.jpg' 
    },
]
const ThemeChooser = ({action}) => {
    const renderItem = ({ item }) => (
        <TouchableOpacity><FastImage
            style={{height: 100, width: 100}}
            source={{
                uri: item.url,
                headers: { Authorization: 'someAuthToken' },
                priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
        /></TouchableOpacity>
      );
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.brushImage} onPress={action}>
                <View style={styles.round}><Image source={require('../assets/images/icons/brush.png')} style={styles.brush}/></View>
            </TouchableOpacity>
            <FlatList
                style={styles.array}
                horizontal={true}
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

export default ThemeChooser

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#f0effa',
        paddingBottom: 40,
    },
    brushImage:{
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: -35,
        marginBottom: 20
        
    },
    round:{
        borderRadius: 40,
        backgroundColor: '#f0effa',
        padding: 10,
    },
    brush:{
        height: 50,
        width: 50,
        resizeMode: 'contain'
    }
})
