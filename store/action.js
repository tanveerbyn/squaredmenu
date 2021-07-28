import { GoogleSignin } from '@react-native-community/google-signin';
import axios from 'axios'

// Development API URL
// const API_URL = "http://squaredmenudevs.ctportfolio.in/api/restaurant";

// Production API URL
const API_URL = "https://admin.squaredmenu.com/api/restaurant";

export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';
export const changeMyLanguage = (language) => async (dispatch, getState) => {
    dispatch({
        type: CHANGE_LANGUAGE,
        payload: language
    })
}

export const SIGNIN= 'SIGNIN';
export const login = (data) => async (dispatch, getState) => {
    try{
        const res = await axios({
            method: 'post',
            url: `${API_URL}/login`,
            data: data,
            headers: {'Content-Type': 'multipart/form-data' }
        })
        
        console.log("Login =>", res.data)
        if(res.data.status){
            dispatch({
                type: SIGNIN,
                payload: {email:res.data.data.email, name:res.data.data.name, token:res.data.data.token, user_id:res.data.data.user_id, new_device: false, plan_expired: res.data.data.plan_expired, plan_id: res.data.data.plan_id, image: res.data.data.image, user_type:"normal"}
            })
        }
        return res
    }catch(err){
        console.log(err)
    }
};
export const SIGNUP= 'SIGNUP';
export const register = (data) => async (dispatch, getState) => {
    try{
        const res = await axios({
            method: 'post',
            url: `${API_URL}/signup`,
            data: data,
            headers: {'Content-Type': 'multipart/form-data' }
        })
        if(res.data.status){
            dispatch({
                type: SIGNUP,
                payload: {email:res.data.data.email, user_id:res.data.data.user_id}
            })
        }
        return res
    }catch(err){
        console.log(err)
    }
};

export const BEGIN_AUTH= 'BEGIN_AUTH';
export const beginAuth = () => async (dispatch, getState) => {
    console.log("Reached Begin Auth")
    dispatch({
        type: BEGIN_AUTH,
    });
};
export const LOGOUT= 'LOGOUT';
export const logout = () => async (dispatch, getState) => {
    // console.log(getState().auth.user_type)
    try{
        if(getState().auth.user_type === "google"){
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
        }
        else if(getState().auth.user_type === "apple"){
            //Nothing Yet to do
        }
    }catch(err){
        console.log(err)
    }
    
    dispatch({
        type: LOGOUT,
    });
};
export const UPDATE_SUBSCRIPTION= 'UPDATE_SUBSCRIPTION';
export const beginUpdate = () => async (dispatch, getState) => {

    dispatch({
        type: UPDATE_SUBSCRIPTION,
    });
};

export const UPDATE_PROFILE_PIC= 'UPDATE_PROFILE_PIC';
export const updatePic = (img) => async (dispatch, getState) => {

    dispatch({
        type: UPDATE_PROFILE_PIC,
        payload: img
    });
};

export const verifyEmail = (data) => async (dispatch, getState) => {
    const res = await axios({
        method: 'post',
        url: `${API_URL}/resend-verification-mail`,
        data: data,
        headers: {'Content-Type': 'multipart/form-data' }
    })
    return res.data.message
    // console.log("Verify Email!", res.data)
};

export const getRestaurants = (data) => async (dispatch, getState) => {
    const res = await axios({
        method: 'post',
        url: `${API_URL}/get-restaurants`,
        data: data,
        headers: {'Content-Type': 'multipart/form-data' }
    })
    return res.data.data
};

export const changePassword = (data) => async (dispatch, getState) => {
    const res = await axios({
        method: 'post',
        url: `${API_URL}/change-password`,
        data: data,
        headers: {'Content-Type': 'multipart/form-data' }
    })
    return res
};

export const getMenu = (data) => async (dispatch, getState) => {
    const res = await axios({
        method: 'post',
        url: `${API_URL}/get-menus`,
        data: data,
        headers: {'Content-Type': 'multipart/form-data' }
    })
    // console.log("GetMenu =>",res.data)
    return res
};

export const forgotPassword = (data) => async (dispatch, getState) => {
    const res = await axios({
        method: 'post',
        url: `${API_URL}/forgot-password`,
        data: data,
        headers: {'Content-Type': 'multipart/form-data' }
    })
    console.log("Forgot =>",res.data)
    return res
};

export const toggleMenuStatus = (data) => async (dispatch, getState) => {
    const res = await axios({
        method: 'post',
        url: `${API_URL}/update-menu-status`,
        data: data,
        headers: {'Content-Type': 'multipart/form-data' }
    })
    console.log("Toggle =>",res.data)
    return res
};

export const addMenu = (data) => async (dispatch, getState) => {
    const res = await axios({
        method: 'post',
        url: `${API_URL}/add-edit-menu`,
        data: data,
        headers: {'Content-Type': 'multipart/form-data' }
    })
    console.log("Add Menu =>",res.data)
    return res
};

export const editMenu = (data) => async (dispatch, getState) => {
    const res = await axios({
        method: 'post',
        url: `${API_URL}/add-edit-menu`,
        data: data,
        headers: {'Content-Type': 'multipart/form-data' }
    })
    console.log("Edit Menu =>",res.data)
    return res
};


export const addNewRestaurant = (data) => async (dispatch, getState) => {
    const res = await axios({
        method: 'post',
        url: `${API_URL}/add-edit-restaurant`,
        data: data,
        headers: {'Content-Type': 'multipart/form-data' }
    })
    console.log("Add Restaurant =>",res.data)
    return res
};

export const signInAPIGoogle = (data, platform) => async (dispatch, getState) => {
    const res = await axios({
        method: 'post',
        url: `${API_URL}/social-media-login`,
        data: data,
        headers: {'Content-Type': 'multipart/form-data' }
    })
    console.log("Login Google =>",res.data)
    if(res.data.status){
        dispatch({
            type: SIGNIN,
            payload: {email:res.data.data.email, name:res.data.data.name, token:res.data.data.token, user_id:res.data.data.user_id, new_device: false, plan_expired: res.data.data.plan_expired, plan_id: res.data.data.plan_id, image: res.data.data.image, user_type:platform}
        })
    }
    return res
};
export const signInAPIApple = (data) => async (dispatch, getState) => {
    const res = await axios({
        method: 'post',
        url: `${API_URL}/social-media-login`,
        data: data,
        headers: {'Content-Type': 'multipart/form-data' }
    })
    console.log("Login Apple =>",res.data)
    if(res.data.status){
        dispatch({
            type: SIGNIN,
            payload: {email:res.data.data.email, name:res.data.data.name, token:res.data.data.token, user_id:res.data.data.user_id, new_device: false, plan_expired: res.data.data.plan_expired, plan_id: res.data.data.plan_id, image: res.data.data.image, user_type:"apple"}
        })
    }
    return res
};

export const addNewItem = (data) => async (dispatch, getState) => {
    try{const res = await axios({
        method: 'post',
        url: `${API_URL}/add-edit-item`,
        data: data,
        headers: {'Content-Type': 'multipart/form-data' }
    })
    console.log("Add New Item =>",res)
    return res}catch(err){
        console.log("Add New Item Response=>", err)
    }
};
export const addItemVarient = (data) => async (dispatch, getState) => {
    const res = await axios({
        method: 'post',
        url: `${API_URL}/add-variant`,
        data: data,
        headers: {'Content-Type': 'multipart/form-data' }
    })
    console.log("Add Item Varient =>",res.data)
    return res
};
export const getMenuItems = (data) => async (dispatch, getState) => {
    const res = await axios({
        method: 'post',
        url: `${API_URL}/get-items`,
        data: data,
        headers: {'Content-Type': 'multipart/form-data' }
    })
    console.log("Get Menu Items =>",res.data.data.items)
    return res
};
export const getItemDetail = (data) => async (dispatch, getState) => {
    const res = await axios({
        method: 'post',
        url: `${API_URL}/get-item-detail`,
        data: data,
        headers: {'Content-Type': 'multipart/form-data' }
    })
    console.log("Items Detail=>",res.data)
    return res
};
export const getItemTypes = (data) => async (dispatch, getState) => {
    const res = await axios({
        method: 'post',
        url: `${API_URL}/get-item-data`,
        data: data,
        headers: {'Content-Type': 'multipart/form-data' }
    })
    // console.log("Items data=>",res.data)
    return res
};
export const deleteItem = (data) => async (dispatch, getState) => {
    const res = await axios({
        method: 'post',
        url: `${API_URL}/delete-item`,
        data: data,
        headers: {'Content-Type': 'multipart/form-data' }
    })
    console.log("Delete Item =>",res.data)
    return res
};
export const profileInfo = (data) => async (dispatch, getState) => {
    const res = await axios({
        method: 'post',
        url: `${API_URL}/get-profile`,
        data: data,
        headers: {'Content-Type': 'multipart/form-data' }
    })
    console.log("Profile Detail =>",res.data)
    return res
};
export const updateSubscription = (data) => async (dispatch, getState) => {
    const res = await axios({
        method: 'post',
        url: `${API_URL}/update-subscription`,
        data: data,
        headers: {'Content-Type': 'multipart/form-data' }
    })
    console.log("Update Subscription =>",res.data)
    return res
};
export const updateProfilePic = (data) => async (dispatch, getState) => {
    const res = await axios({
        method: 'post',
        url: `${API_URL}/update-profile`,
        data: data,
        headers: {'Content-Type': 'multipart/form-data' }
    })
    console.log("Update Profile =>",res.data)
    return res
};

export const sendQrOverMail = (data) => async (dispatch, getState) => {
    const res = await axios({
        method: 'post',
        url: `${API_URL}/download-qrcode`,data: data,
        headers: {'Content-Type': 'multipart/form-data' }
    })
    console.log("QR Send Over Mail =>",res.data)
    return res
}
export const generateQR = (data) => async (dispatch, getState) => {
    const res = await axios({
        method: 'post',
        url: `${API_URL}/generate-qrcode`,data: data,
        headers: {'Content-Type': 'multipart/form-data' }
    })
    console.log("QR Send Over Mail =>",res.data)
    return res
}
export const getNotifications = (data) => async (dispatch, getState) => {
    const res = await axios({
        method: 'post',
        url: `${API_URL}/get-notifications`,data: data,
        headers: {'Content-Type': 'multipart/form-data' }
    })
    console.log("Notifications =>",res.data)
    return res
}
export const getCurrency = (data) => async (dispatch, getState) => {
    const res = await axios({
        method: 'post',
        url: `${API_URL}/get-currency`,data: data,
        headers: {'Content-Type': 'multipart/form-data' }
    })
    // console.log("Currency =>",res.data)
    return res
}

export const updateMenuOrder = (data) => async (dispatch, getState) => {
    const res = await axios({
        method: 'post',
        url: `${API_URL}/update-menu-order`,data: data,
        headers: {'Content-Type': 'multipart/form-data' }
    })  
    console.log("Menu Order =>",res.data)
    return res
}

export const updateItemOrder = (data) => async (dispatch, getState) => {
    const res = await axios({
        method: 'post',
        url: `${API_URL}/update-item-order`,data: data,
        headers: {'Content-Type': 'multipart/form-data' }
    })
    console.log("Item Order =>",res.data)
    return res
}
export const deleteMenu = (data) => async (dispatch, getState) => {
    const res = await axios({
        method: 'post',
        url: `${API_URL}/delete-menu`,
        data: data,
        headers: {'Content-Type': 'multipart/form-data' }
    })
    console.log("Delete Menu =>",res.data)
    return res
};
