    import {configureStore} from "@reduxjs/toolkit"
    import authReducer from "./slice/userSlice"
    import CoupounsSlice from "./slice/CoupounsSlice"
    import cartSlice from "./cartslice/cartSlice"

    const store = configureStore({
        reducer: {
            auth: authReducer,
            coupoun: CoupounsSlice,
            cart: cartSlice
        }
    })

    export default store