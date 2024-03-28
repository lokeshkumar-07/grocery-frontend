import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiUrl } from "../../config";


const initialState = {
    products: [],
    product: {},
    message: "",
    total: 0,
    isLoading: false
}

export const createProduct = createAsyncThunk('products/new', async (data, thunkApi) => {


    const persistData = JSON.parse(localStorage.getItem('persist:root'));
    const authData = persistData ? JSON.parse(persistData.auth) : null

    const token = authData ? authData.token : null;

    console.log("Create Product Slice")

    try{
        const res = await axios({
            url: `${ApiUrl}/products/new`,
            method: "POST",
            headers: {
                "Content-Type" : "multipart/form-data",
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


export const updateProduct = createAsyncThunk('products/update', async (data, thunkApi) => {

    const persistData = JSON.parse(localStorage.getItem('persist:root'));
    const authData = persistData ? JSON.parse(persistData.auth) : null

    const token = authData ? authData.token : null;
    console.log("Update Product Slice")

    try{
        const res = await axios({
            url: `${ApiUrl}/products/update/${data.productId}`,
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

export const getProduct = createAsyncThunk('products/getone', async (data, thunkApi) => {
    console.log(data.productId)
    try{
        const res = await axios({
            url: `${ApiUrl}/products/get/${data.productId}`,
            method: "GET"
        })

        return res.data
    }catch(err){
        const message = (err.response && err.response.data && err.response.data.message)|| err.message || err.toString()

        return thunkApi.rejectWithValue(message)
    }
})

export const getAllProduct = createAsyncThunk('products/getall', async (data, thunkApi) => {

    console.log('FETching products Sllice....')
    
    try{
        const res = await axios({
            url: `${ApiUrl}/products/get?search=${data.search}&page=${data.page}&limit=${data.limit}&sort=${data.sort.sort},${data.sort.order}&category=${data.category}&minPrice=${data.minPrice}&maxPrice=${data.maxPrice}`,
        })

        return res.data
    }catch(err){
        const message = (err.response && err.response.data && err.response.data.message)|| err.message || err.toString()

        return thunkApi.rejectWithValue(message)
    }
})


const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        reset : (state) => {
            state.message = "",
            state.isLoading = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createProduct.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(createProduct.rejected, (state, action) => {
            state.isLoading = false
            state.message = action.payload
        })
        builder.addCase(createProduct.fulfilled, (state, action) => {
            state.isLoading = false
            state.products.push(action.payload)
        })
        builder.addCase(getAllProduct.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getAllProduct.rejected, (state, action) => {
            state.isLoading = false
            state.message = action.payload
        })
        builder.addCase(getAllProduct.fulfilled, (state, action) => {
            state.isLoading = false
            state.products = action.payload.products
            state.total = action.payload.total
        })
        builder.addCase(getProduct.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getProduct.rejected, (state, action) => {
            state.isLoading = false
            state.message = action.payload
        })
        builder.addCase(getProduct.fulfilled, (state, action) => {
            state.isLoading = false
            state.product = action.payload
        })
        builder.addCase(updateProduct.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(updateProduct.rejected, (state, action) => {
            state.isLoading = false
            state.message = action.payload
        })
        builder.addCase(updateProduct.fulfilled, (state, action) => {
            state.isLoading = false
            state.message = "Product Updated"
        })
    }
})


export const {reset} = productSlice.actions
export default productSlice.reducer