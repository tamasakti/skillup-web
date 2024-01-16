import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    coupounLists : [],
    choosenCourse: "",
}

const coupounsSlice = createSlice({
    name: "coupoun",
    initialState,
    reducers : {
        coupouns : (state, action) => {
            const dataCoupouns = action.payload
           state.coupounLists = dataCoupouns
           
          
        },
        

    }
})

export const {coupouns} = coupounsSlice.actions

export default coupounsSlice.reducer

export const validateData = (state) => state.coupoun.coupouns
