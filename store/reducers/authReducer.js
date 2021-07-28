const initialState = {
    email:"", 
    name:"", 
    token:null, 
    user_id:"", 
    plan_expired: null,
    plan_id: null,
    image: "",
    new_device: true,
    user_type: "normal",
    language: 'en',
}
export default (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_LANGUAGE':
            return {
                ...state,
                language: action.payload
            }
        case 'SIGNIN':
            return {
                ...state,
                email:action.payload.email, 
                name:action.payload.name, 
                token: action.payload.token, 
                user_id:action.payload.user_id,
                plan_expired: action.payload.plan_expired,
                plan_id: action.payload.plan_id,
                image: action.payload.image,
                new_device: false,
                user_type: action.payload.user_type
            }
        case 'SIGNUP':
            return {
                ...state,
                email:action.payload.email, 
                user_id:action.payload.user_id,
                new_device: false
            }
        case 'LOGOUT':
            return{
                ...state,
                email:"", 
                name:"", 
                token: null, 
                user_id:"",
                plan_expired: null,
                plan_id: null,
                image: "",
                new_device: false
            }
        case 'BEGIN_AUTH':
            console.log("Begin Auth State =>", state)
            return{
                ...state,
                new_device: false
            }
        case 'UPDATE_SUBSCRIPTION':
            return{
                ...state,
                plan_id: 1
            }
        case 'UPDATE_PROFILE_PIC':
            return{
                ...state,
                image: action.payload
            }
        default:
            return state
    }
}