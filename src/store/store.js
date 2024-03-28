import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import storage from "redux-persist/lib/storage"
import { FLUSH, PAUSE, PERSIST, PURGE, REHYDRATE, persistReducer, persistStore } from "redux-persist";
import authSlice from "../features/authSlice";
import productSlice from "../features/productSlice";
import cartSlice from "../features/cartSlice";
import orderSlice from "../features/orderSlice";
import authMiddleware from "./authMiddleware";


const rootReducer = combineReducers({
    auth: authSlice, 
    products: productSlice,
    carts: cartSlice,
    orders: orderSlice
})
const persistConfig = {key:'root', storage, version: 1}
const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
    reducer: persistedReducer,
    middleware: [
        ...getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REHYDRATE],
          },
        }),
        authMiddleware, // Add your custom middleware
    ],
})

export const persistor = persistStore(store)