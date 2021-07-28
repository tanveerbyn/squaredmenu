
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen from './screens/OnboardingScreen';

// Screens
import Login from './screens/Login';
import HomeScreen from './screens/HomeScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import AddABusiness from './screens/AddABusiness';
import Menu from './screens/Menu';
import MenuList from './screens/MenuList';
import TrialScreen from './screens/TrialScreen';
import RegisterPromoCode from './screens/RegisterPromoCode'
import ThankYouRegistration from './screens/ThankYouRegistration';
import ThankYouPurchase from './screens/ThankYouPurchase';
import MenuPreview from './screens/MenuPreview';
import UserProfile from './screens/UserProfile';
import EditProfile from './screens/EditProfile';
import EditMenu from './screens/EditMenu';
import Notifications from './screens/Notifications';
import QR from './screens/QR';
import DishDetail from './screens/DishDetail';
import EditDish from './screens/EditDish';
import { connect } from 'react-redux';
import ForgotPassword from './screens/ForgotPassword';
import LocationTest from './components/LocationTest';
import NewMenu from './screens/NewMenu';
import NewDish from './screens/NewDish';
import EditABusiness from './screens/EditABusiness';
import I18n from 'react-native-i18n';

function OnboardingStack(){
    const Onboard = createStackNavigator()
    return(
        <NavigationContainer>
            <Onboard.Navigator headerMode="none">
                <Onboard.Screen name="OnboardingScreen" component={OnboardingScreen} />
            </Onboard.Navigator>
        </NavigationContainer>
    )
}
function AuthStack(){
    const Auth = createStackNavigator()
    return(
        <NavigationContainer>
            <Auth.Navigator headerMode="none">
        
                <Auth.Screen name="Login" component={Login} />
                <Auth.Screen name="RegistrationScreen" component={RegistrationScreen} />
                <Auth.Screen name="RegisterPromoCode" component={RegisterPromoCode} />
                
                <Auth.Screen name="ThankYouRegistration" component={ThankYouRegistration} />
                
                <Auth.Screen name="ForgotPassword" component={ForgotPassword} />
               
            </Auth.Navigator>
        </NavigationContainer>
    )
}
function SubscriptionStack(){
    const Subsc = createStackNavigator()
    return(
        <NavigationContainer>
            <Subsc.Navigator headerMode="none">
                <Subsc.Screen name="TrialScreen" component={TrialScreen} />
                <Subsc.Screen name="ThankYouPurchase" component={ThankYouPurchase} />
            </Subsc.Navigator>
        </NavigationContainer>
    )
}
function MainStack(){
    const Main = createStackNavigator()
    return(
        
        <NavigationContainer>
            <Main.Navigator headerMode="none">
                <Main.Screen name="HomeScreen" component={HomeScreen} />
                <Main.Screen name="AddABusiness" component={AddABusiness} />
                <Main.Screen name="EditABusiness" component={EditABusiness} />
                <Main.Screen name="Menu" component={Menu} />
                <Main.Screen name="MenuList" component={MenuList} />
                <Main.Screen name="MenuPreview" component={MenuPreview} />
                <Main.Screen name="UserProfile" component={UserProfile} />
                <Main.Screen name="EditProfile" component={EditProfile} />
                <Main.Screen name="EditMenu" component={EditMenu} />
                <Main.Screen name="NewMenu" component={NewMenu} />
                <Main.Screen name="QR" component={QR} />
                <Main.Screen name="DishDetail" component={DishDetail} />
                <Main.Screen name="EditDish" component={EditDish} />
                <Main.Screen name="Notification" component={Notifications} />
                {/* <Main.Screen name="LocationTest" component={LocationTest} /> */}
                <Main.Screen name="NewDish" component={NewDish} />
            </Main.Navigator>
        </NavigationContainer>
    )
}

function Navigator({token, new_device, plan_expired, plan_id, lang}) {
    I18n.locale = lang
    console.log("New Device:", new_device, "Token:",token)
    if(new_device){
        return <OnboardingScreen/>
    }else{
        if(!token){
            return <AuthStack/>
        }else{
            if(plan_id === ""){
                return <SubscriptionStack plan_expired={plan_expired} plan_id={plan_id}/>
            }else{
                return <MainStack/>
            }
            
        }
    }
}
const mapStateToProps = state => {
    console.log("In Navigator",state.auth)
    return {
        token: state.auth.token,
        new_device: state.auth.new_device,
        plan_expired: state.auth.plan_expired,
        plan_id: state.auth.plan_id,
        lang: state.auth.language
    }
}
export default connect(mapStateToProps, null)(Navigator)
