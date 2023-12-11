import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    email: null,
    password: null,
    token: null,
    isLoading: false,
    error: null,
};

export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        // Add your synchronous reducers here if needed
    },
    extraReducers: (builder) => {
        //login
        builder.addCase(loginAsync.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;

            let user = action.meta.arg;
            if(user.email&&user.password){
                state.email = user.email
                state.password = user.password;
            }
            else{
                state.email = null;
                state.password = null;
            }
        });
        builder.addCase(loginAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            if(action.payload)
                state.token = action.payload;
        });
        builder.addCase(loginAsync.rejected, (state, action) => {
            console.log("Errora dusdu")
            state.isLoading = false;
            state.error = action.error.message;
            state.email = null;
            state.password = null;
            throw new Error("Login Failed")
            
        });
        ///////////////////////////////////
    },
});

//export const { /* Add your synchronous action creators here if needed */ } = loginSlice.actions;

// Async action using createAsyncThunk
export const loginAsync = createAsyncThunk("login/loginAsync", async ({ email, password }) => {
    try {
        if(!email||!password)
            throw new Error("Login Failed")
        const response = await axios.post("http://localhost:3005/user/login", { email, password });
        let data = response.data.token;

        return data;
    } catch (error) {
        throw new Error("Login failed");
    }
});

export default loginSlice.reducer;
