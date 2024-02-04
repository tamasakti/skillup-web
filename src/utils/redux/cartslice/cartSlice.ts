import { createSlice } from "@reduxjs/toolkit";

interface initialStateProps {
    items: string[]
}


const initialState:initialStateProps = {
    items : []
}

export const cartSlice = createSlice({
  name : "cart",
  initialState,
  reducers : {
    add : (state, action) => {
        const newItem = action.payload;
        console.log("cart",newItem)
        const selectCartIndex = state.items.findIndex((product) => product.id === newItem.id)
        if(selectCartIndex !== -1) {
            state.items[selectCartIndex].quantity += 1;
            state.items[selectCartIndex].totalPrice = state.items[selectCartIndex].quantity * +newItem.data.price
        } else {
            state.items.push({
            ...newItem,
            quantity: 1,
            totalPrice: +newItem.data.price
            })
        }
    },
    substractQuantity : (state, action) => {
        const currItems = action.payload
        const selectCartIndex = state.items.findIndex((product) => product.id === currItems.id)
        const substractItems = currItems.quantity - 1

        if(substractItems < 1) {
            state.items[selectCartIndex].quantity = 0
            state.items.splice(selectCartIndex,1)
        } else {
            state.items[selectCartIndex].quantity -= 1
            state.items[selectCartIndex].totalPrice = state.items[selectCartIndex].totalPrice - parseInt(currItems.data.price)
        }
    },
    updatedTotalPrice : (state, action) => {
        const dataUpdated = action.payload
        const dataConcat = [...state, dataUpdated]
            state.items = dataConcat
    }
  }  
})

export const {add, substractQuantity, updatedTotalPrice} = cartSlice.actions
export default cartSlice.reducer
export const selectCartItems = state => state.cart.items

export const selectCartTotalItems = state => state.cart.items.reduce((total:number, item:number) => total + item.quantity, 0)
export const selectTotalPrices = state => state.cart.items.reduce((total:number, item:string) => total + parseInt(item.data.price), 0)
export const selectSubstractPrices = state => state.cart.items.reduce((total:number, item:string) => total - parseInt(item.data.price), 0)
export const totalPriceUpdated = state => state.cart.items.reduce((total:number, item:number) => total + item.totalPrice, 0)