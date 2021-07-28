import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import Svg, { Circle, ClipPath, Defs, Path, Image as ImageSVG, Rect, Ellipse, Polygon, G, RadialGradient, Stop, Pattern, LinearGradient } from 'react-native-svg'
const HeaderSVG = ({uri}) => {
    return (
        <Svg height={heightPercentageToDP(35)} width={widthPercentageToDP(100)} style={{position:'absolute'}} >
            <Defs>
                <Pattern id="img1" width="100%" patternContentUnits="objectBoundingBox">
                    <ImageSVG height="1" width="1" preserveAspectRatio="none" href={uri} />
                </Pattern>
                <LinearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                    <Stop offset="0%" style="stop-color:rgb(114,106,233,1);stop-opacity:1" />
                    <Stop offset="100%" style="stop-color:rgb(99,92,201,0.29);stop-opacity:1" />
                </LinearGradient>
            </Defs>
            <Defs>
            <LinearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                    <Stop offset="0" stopColor="#726AE9" stopOpacity="0.51"/>
                    <Stop offset="1" stopColor="#635CC9" stopOpacity="0.15" />
                </LinearGradient>
            </Defs>
            <Path fill="url(#img1)" fill-opacity="1" d={`M160 225.908C96 251.756 44.5 185.069 0 215.569V0H${widthPercentageToDP(100)}V186.103C284 244.001 294.855 171.444 160 225.908Z`}/>
            <Path fill="url(#grad1)" fill-opacity="1" d={`M160 225.908C96 251.756 44.5 185.069 0 215.569V0H${widthPercentageToDP(100)}V186.103C284 244.001 294.855 171.444 160 225.908Z`}/>
        </Svg>
    )
}

export default HeaderSVG

const styles = StyleSheet.create({})
