import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    loading: false,
    userInfo: {},
    userToken: null,
    error: null,
    success: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        register : (state, action) => {
            const dataUser = action.payload
           
            
        },
        login : (state, action) => {
            const dataLoginUser = action.payload
            state.userInfo = action.payload
        }
    },
   
})  
export const {register, login} = authSlice.actions
export default authSlice.reducer

export const selectDataLogin = state => state.auth.userInfo
