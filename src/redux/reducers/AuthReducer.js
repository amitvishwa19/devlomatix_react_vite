import { createSlice, nanoid } from '@reduxjs/toolkit'



const initialState = {
    authStatus: false,
    user: {
        uid: '',
        name: '',
        email: '',
        emailVerified: false,
        avatar: '',
        dnd: false,
        loggedIn: false,
        webDeviceToken: '',
        mobileDeviceToken: '',
        LoginType: ''
    }
}

export const AuthReducer = createSlice({
    name: 'authservice',
    initialState,
    reducers: {
        setAuthStatus: (state, action) => {
            console.log(action.payload)


        },

        setUser: (state, action) => {
            console.log(action.payload)

        },


    }
})



export const { login, googleLogin, register, logout } = AuthReducer.actions;

export default AuthReducer.reducer;