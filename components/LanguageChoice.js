import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { strings } from '../locales/i18n'
import { changeMyLanguage } from '../store/action'

const LanguageChoice = ({closeFunc, lang, changeMyLanguage}) => {
    return (
        <View style={{flex:1}}>
            <Text style={styles.heading}>{strings('Choose a Language')}</Text>
            <TouchableOpacity style={[styles.eachLanguage, {backgroundColor: lang==='en'?'#635CC9':'#fff'}]} onPress={()=>changeMyLanguage('en')}>
                <View style={styles.first}>
                    <Image style={styles.flag} source={require('../assets/images/flags/united-kingdom.png')}/>
                    <Text style={[styles.langTxt, {color: lang==='en'?'#fff':'#635CC9'}]}>English</Text>
                </View>
                <Image style={styles.tick} source={require('../assets/images/flags/tick.png')}/>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.eachLanguage, {backgroundColor: lang==='it'?'#635CC9':'#fff'}]} onPress={()=>changeMyLanguage('it')}>
                <View style={styles.first}>
                    <Image style={styles.flag} source={require('../assets/images/flags/italy.png')}/>
                    <Text style={[styles.langTxt, {color: lang==='it'?'#fff':'#635CC9'}]}>Italian</Text>
                </View>
                <Image style={styles.tick} source={require('../assets/images/flags/tick.png')}/>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.eachLanguage, {backgroundColor: lang==='es'?'#635CC9':'#fff'}]} onPress={()=>changeMyLanguage('es')}>
                <View style={styles.first}>
                    <Image style={styles.flag} source={require('../assets/images/flags/spain.png')}/>
                    <Text style={[styles.langTxt, {color: lang==='es'?'#fff':'#635CC9'}]}>Spanish</Text>
                </View>
                <Image style={styles.tick} source={require('../assets/images/flags/tick.png')}/>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.eachLanguage, {backgroundColor: lang==='fr'?'#635CC9':'#fff'}]} onPress={()=>changeMyLanguage('fr')}>
                <View style={styles.first}>
                    <Image style={styles.flag} source={require('../assets/images/flags/france.png')}/>
                    <Text style={[styles.langTxt, {color: lang==='fr'?'#fff':'#635CC9'}]}>French</Text>
                </View>
                <Image style={styles.tick} source={require('../assets/images/flags/tick.png')}/>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.eachLanguage, {backgroundColor: lang==='de'?'#635CC9':'#fff'}]} onPress={()=>changeMyLanguage('de')}>
                <View style={styles.first}>
                    <Image style={styles.flag} source={require('../assets/images/flags/germany.png')}/>
                    <Text style={[styles.langTxt, {color: lang==='de'?'#fff':'#635CC9'}]}>German</Text>
                </View>
                <Image style={styles.tick} source={require('../assets/images/flags/tick.png')}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.close} onPress={closeFunc}>
                <Image style={{height: 32, width: 32}} source={require('../assets/images/flags/cross.png')} />
            </TouchableOpacity>
        </View>
    )
}
const mapStateToProps = state => {
    return {
        lang: state.auth.language
    }
}
export default connect(mapStateToProps, {changeMyLanguage})(LanguageChoice)

const styles = StyleSheet.create({
    heading:{
        textAlign: 'center',
        marginBottom: 28,

        fontFamily: 'Poppins Medium',
        fontSize: 21,
        color: '#000'
    },
    eachLanguage:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 25
    },
    first:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    flag:{
        height: 42,
        width: 42,
        marginRight: 19
    },
    langTxt: {
        fontFamily: 'Poppins Medium',
        fontSize: 21,
    },
    tick:{
        height: 17,
        width: 17
    },
    close:{
        position: 'absolute',
        right: 10,
        top: 0
    }
})
