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
            console.log(dataUser)
        }
    },
   
})
export const {register} = authSlice.actions
export default authSlice.reducer