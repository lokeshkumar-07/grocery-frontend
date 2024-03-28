import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiUrl } from "../../config";

const initialState = {
    latestOrder: {},
    orders: [],
    userOrders: [],
    message: "",
    isLoading: false
}

export const createOrder = createAsyncThunk('orders/create', async (data, thunkApi) => {
    const persistData = JSON.parse(localStorage.getItem('persist:root'));
    const authData = persistData ? JSON.parse(persistData.auth) : null

    const token = authData ? authData.token : null;
    console.log(data, "Hello Ram ram")

    try{
        const res = await axios({
            url: `${ApiUrl}/orders/place`,
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
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

export const getUserOrders = createAsyncThunk('orders/userorders', async (thunkApi) => {
    const persistData = JSON.parse(localStorage.getItem('persist:root'));
    const authData = persistData ? JSON.parse(persistData.auth) : null

    const token = authData ? authData.token : null;
    console.log("Order Slice for crete")

    try{
        const res = await axios({
            url: `${ApiUrl}/orders/get`,
            headers: {
                "Content-Type" : "application/json",
                "auth-token": token
            }
        })

        return res.data
    }catch(err){
        const message = (err.response && err.response.data && err.response.data.message)|| err.message || err.toString()

        return thunkApi.rejectWithValue(message)
    }
})

export const getAllOrders = createAsyncThunk('orders/adminorders', async (data,thunkApi) => {
    const persistData = JSON.parse(localStorage.getItem('persist:root'));
    const authData = persistData ? JSON.parse(persistData.auth) : null

    const token = authData ? authData.token : null;
    console.log("Order Slice for creteeeeee")

    try{
        const res = await axios({
            url: `${ApiUrl}/orders/all?paymentMode=${data.paymentMode}&status=${data.orderStatus}`,
            headers: {
                "Content-Type" : "application/json",
                "auth-token": token
            }
        })

        return res.data
    }catch(err){
        const message = (err.response && err.response.data && err.response.data.message)|| err.message || err.toString()

        return thunkApi.rejectWithValue(message)
    }
})

export const updateOrder = createAsyncThunk('orders/update', async (data, thunkApi) => {
    const persistData = JSON.parse(localStorage.getItem('persist:root'));
    const authData = persistData ? JSON.parse(persistData.auth) : null

    const token = authData ? authData.token : null;
    console.log("Order Slice Updating...")

    try{
        const res = await axios({
            url: `${ApiUrl}/orders/update/${data.orderId}`,
            method: "PUT",
            headers: {
                "Content-Type" : "application/json",
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


const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        reset : (state) => {
            state.isLoading = false,
            state.message = ""
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createOrder.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(createOrder.rejected, (state,action) => {
            state.isLoading = false,
            state.message = action.payload
        })
        builder.addCase(createOrder.fulfilled, (state,action) => {
            state.isLoading = false,
            state.message = "Order Placed",
            state.latestOrder = action.payload
            state.userOrders.push(action.payload)
        })
        builder.addCase(getUserOrders.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getUserOrders.rejected, (state,action) => {
            state.isLoading = false,
            state.message = action.payload
        })
        builder.addCase(getUserOrders.fulfilled, (state,action) => {
            state.isLoading = false,
            state.userOrders = action.payload
        })
        builder.addCase(getAllOrders.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getAllOrders.rejected, (state,action) => {
            state.isLoading = false,
            state.message = action.payload
        })
        builder.addCase(getAllOrders.fulfilled, (state,action) => {
            state.isLoading = false,
            state.orders = action.payload
        })
        builder.addCase(updateOrder.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(updateOrder.rejected, (state,action) => {
            state.isLoading = false,
            state.message = action.payload
        })
        builder.addCase(updateOrder.fulfilled, (state,action) => {
            state.isLoading = false,
            state.message = "Order Reviewed"
        })
    }
})

export const {reset} = orderSlice.actions
export default orderSlice.reducer