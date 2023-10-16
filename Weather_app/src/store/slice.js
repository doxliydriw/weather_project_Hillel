import { createSlice } from '@reduxjs/toolkit'

const Data = {
    token: {
        data: '',
        timeStamp: (new Date(2023, 9, 13, 9)).getTime()
    },
    users: [],
    loggedIn: false,
    requestedFromApi: {},
    apiResult: {}
}

export const usersSlice = createSlice({
    name: 'data',
    initialState: Data,
    reducers: {
        ADD_USER: (state, action) => {
            state.users = state.users.push(action.payload)
        },
        DELETE_ENTRY: (state, action) => {
            state.users = action.payload
        },
        UPDATE_USER_PLACES: (state, action) => {
            state.users = action.payload
        },
        SET_TOKEN: (state, action) => {
            // console.log('inside reducer TOKEN', action.payload)
            state.token = action.payload
        },
        SET_PARAMS: (state, action) => {
            // console.log('inside reducer PARAMS', action.payload)
            state.requestedFromApi = action.payload
        },
        LOGIN_CHANGE: (state, action) => {
            state.loggedIn = action.payload
        },
        SET_API_RESULT:
            (state, action) => {
                // console.log('inside reducer API RESULT', action.payload)
                state.apiResult = action.payload
            }
    }
})

export const { ADD_USER, ADDDELETE_ENTRY_ENTRY, UPDATE_USER_PLACES, SET_TOKEN, SET_PARAMS, LOGIN_CHANGE, SET_API_RESULT } = usersSlice.actions

export default usersSlice.reducer