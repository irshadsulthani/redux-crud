import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    currentUser:null,
    loading:false,
    error:false
};

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart: (state) => {
            state.loading = true
        },
        signInSuccess : (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false
        },
        signInFailure : (state, action) => {
            state.loading = false
            state.error = action.payload;
        },
        updatingUser : (state, action) => {
            console.log('action payloade', action.payload);
            
            state.currentUser = action.payload
            state.loading = false;
            state.error = false
        }
    }
})

export const {signInStart, signInSuccess, signInFailure, updatingUser} = userSlice.actions;

export default userSlice.reducer;