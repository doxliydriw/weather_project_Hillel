import { createSlice } from '@reduxjs/toolkit'

const UsersList = {
    users: []
}

export const usersSlice = createSlice({
    name: 'list',
    initialState: UsersList,
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
    }
})

export const { ADD_USER, ADDDELETE_ENTRY_ENTRY, UPDATE_USER_PLACES } = usersSlice.actions

export default usersSlice.reducer