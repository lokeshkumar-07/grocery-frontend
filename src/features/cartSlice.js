import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiUrl } from "../../config";
import { logout } from "./authSlice";

const initialState = {
    cart: {},
    cartItems: [],
    message: "",
    isLoading: false
}



export const createCart = createAsyncThunk('cart/create', async (data,thunkApi) => {

    try{
        const res = await axios({
            url: `${ApiUrl}/carts/create`,
            method: "POST",
            headers: {
                "auth-token": data.token
            },
        })

        return res.data
    }catch(err){
        const message = (err.response && err.response.data && err.response.data.message)|| err.message || err.toString()

        return thunkApi.rejectWithValue(message)
    }
})

export const getCart = createAsyncThunk('cart/get', async (thunkApi) => {
    const persistData = JSON.parse(localStorage.getItem('persist:root'));
    const authData = persistData ? JSON.parse(persistData.auth) : null

    const token = authData ? authData.token : null;
    try{
        const res = await axios({
            url: `${ApiUrl}/carts/get`,
            headers: {
                "auth-token": token
            },
        })

        return res.data
    }catch(err){
        const message = (err.response && err.response.data && err.response.data.message)|| err.message || err.toString()

        return thunkApi.rejectWithValue(message)
    }
})


export const createCartItem = createAsyncThunk('cartItem/create', async (data,thunkApi) => {
    const persistData = JSON.parse(localStorage.getItem('persist:root'));
    const authData = persistData ? JSON.parse(persistData.auth) : null

    const token = authData ? authData.token : null;

    try{
        const res = await axios({
            url: `${ApiUrl}/cartitems/create`,
            method: "POST",
            headers: {
                "auth-token": token
            },
            data: data
        })

        return res.data
    }catch(err){
        const message = (err.response && err.response.data && err.response.data.message)|| err.message || err.toString()

        return thunkApi.rejectWithValue(message)
    }
})

export const incrementCartItem = createAsyncThunk('cartItem/increment', async (data,thunkApi) => {
    const persistData = JSON.parse(localStorage.getItem('persist:root'));
    const authData = persistData ? JSON.parse(persistData.auth) : null

    const token = authData ? authData.token : null;

    try{
        const res = await axios({
            url: `${ApiUrl}/cartitems/increment`,
            method: "POST",
            headers: {
                "auth-token": token
            },
            data: data
        })

        return res.data
    }catch(err){
        const message = (err.response && err.response.data && err.response.data.message)|| err.message || err.toString()
        if (err.response && err.response.status === 403) {
            // Token expired, dispatch logout action
            thunkApi.dispatch(logout()); // Assuming this is how you dispatch the logout action
            
        }

        return thunkApi.rejectWithValue(message)
    }
})

export const decrementCartItem = createAsyncThunk('cartItem/decrement', async (data,thunkApi) => {
    const persistData = JSON.parse(localStorage.getItem('persist:root'));
    const authData = persistData ? JSON.parse(persistData.auth) : null

    const token = authData ? authData.token : null;

    try{
        const res = await axios({
            url: `${ApiUrl}/cartitems/decrement`,
            method: "POST",
            headers: {
                "auth-token": token
            },
            data: data
        })

        return res.data
    }catch(err){
        const message = (err.response && err.response.data && err.response.data.message)|| err.message || err.toString()

        return thunkApi.rejectWithValue(message)
    }
})

export const getCartItems = createAsyncThunk('cartItems/get', async (data, thunkApi) => {
    const persistData = JSON.parse(localStorage.getItem('persist:root'));
    const authData = persistData ? JSON.parse(persistData.auth) : null

    const token = authData ? authData.token : null;
    
    try{
        console.log(data.cartId, "hello world jee")
        const res = await axios({
            url: `${ApiUrl}/cartitems/get/${data.cartId}`,
            headers: {
                "auth-token": token
            }
        })
        return res.data
    }catch(err){
        const message = (err.response && err.response.data && err.response.data.message)|| err.message || err.toString()
        console.log(message)
        return thunkApi.rejectWithValue(message)
    }
})


export const removeCartItem = createAsyncThunk('cartItems/remove', async (data, thunkApi) => {
    const persistData = JSON.parse(localStorage.getItem('persist:root'));
    const authData = persistData ? JSON.parse(persistData.auth) : null

    const token = authData ? authData.token : null;
    
    try{
        const res = await axios({
            url: `${ApiUrl}/cartitems/remove`,
            method: "DELETE",
            headers: {
                "auth-token": token
            },
            data: data
        })

        return res.data
    }catch(err){
        const message = (err.response && err.response.data && err.response.data.message)|| err.message || err.toString()
        console.log(message)
        return thunkApi.rejectWithValue(message)
    }
})


const cartSlice = createSlice({
    name: 'carts',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false,
            state.message = ""
        }
    },
    extraReducers: (builder) =>  {
        builder.addCase(createCart.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(createCart.rejected, (state, action) => {
            state.isLoading = false,
            state.message = action.payload            
        })
        builder.addCase(createCart.fulfilled, (state, action) => {
            state.isLoading = false,
            state.cart = action.payload
        })
        builder.addCase(getCart.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getCart.rejected, (state, action) => {
            state.isLoading = false,
            state.message = action.payload            
        })
        builder.addCase(getCart.fulfilled, (state, action) => {
            state.isLoading = false,
            state.cart = action.payload
        })
        builder.addCase(getCartItems.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getCartItems.rejected, (state, action) => {
            state.isLoading = false,
            state.message = action.payload            
        })
        builder.addCase(getCartItems.fulfilled, (state, action) => {
            state.isLoading = false,
            state.cartItems = action.payload
        })
        builder.addCase(createCartItem.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(createCartItem.rejected, (state, action) => {
            state.isLoading = false,
            state.message = action.payload            
        })
        builder.addCase(createCartItem.fulfilled, (state, action) => {
            state.isLoading = false,
            state.cartItems.push(action.payload)
        })
        builder.addCase(incrementCartItem.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(incrementCartItem.rejected, (state, action) => {
            state.isLoading = false,
            state.message = action.payload            
        })
        builder.addCase(incrementCartItem.fulfilled, (state, action) => {
            state.isLoading = false,
            state.message = action.payload
        })
        builder.addCase(decrementCartItem.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(decrementCartItem.rejected, (state, action) => {
            state.isLoading = false,
            state.message = action.payload            
        })
        builder.addCase(decrementCartItem.fulfilled, (state, action) => {
            state.isLoading = false,
            state.message = action.payload
        })
        builder.addCase(removeCartItem.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(removeCartItem.rejected, (state, action) => {
            state.isLoading = false,
            state.message = action.payload            
        })
        builder.addCase(removeCartItem.fulfilled, (state, action) => {
            state.isLoading = false,
            state.message = action.payload
        })
    }
})

export const {reset} = cartSlice.actions
export default cartSlice.reducer