import { configureStore } from '@reduxjs/toolkit'
import listReducer from './slice.js'


export const store = configureStore({
    reducer: {
        list: listReducer,
    },
})