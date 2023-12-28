    import {configureStore} from "@reduxjs/toolkit"
    import authReducer from "./slice/userSlice"

    const store = configureStore({
        reducer: {
            auth: authReducer
        }
    })

    export default store