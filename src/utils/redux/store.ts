    import {configureStore} from "@reduxjs/toolkit"
    import authReducer from "./slice/userSlice"
    import CoupounsSlice from "./slice/CoupounsSlice"

    const store = configureStore({
        reducer: {
            auth: authReducer,
            coupoun: CoupounsSlice
        }
    })

    export default store