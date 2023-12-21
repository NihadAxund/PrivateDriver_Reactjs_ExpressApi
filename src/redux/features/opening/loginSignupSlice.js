import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const urlText = "https://privatedriver.onrender.com";
//const urlText = "http://localhost:3005";

const storedState = localStorage.getItem('reduxState');

let initialState = {
    name: null,
    email: null,
    password: null,
    token: null,
    isLoading: false,
    isUser: false,
    error: null,
};

// delete LocalStorage
// localStorage.removeItem('reduxState');



if (storedState) {
    const memorydata = JSON.parse(storedState);
    if (memorydata.loginSignup && memorydata.loginSignup.email && memorydata.loginSignup.password && memorydata.loginSignup.token) {
        initialState = memorydata.loginSignup;
        initialState.isUser = true;
    }
}

export const loginAsync = createAsyncThunk("login/loginAsync", async ({ email, password }) => {
    try {
        if (!email || !password)
            throw new Error("Login Failed");
        const response = await axios.post(`${urlText}/user/login`, { email, password });
        const data = response.data.token;

        return data;
    } catch (error) {
        throw new Error("Login failed");
    }
});

export const signupAsync = createAsyncThunk("signup/signupAsync", async ({ name, email, password }) => {
    try {
        if (!name || !password || !email) {
            throw new Error("Signup Failed");
        }
        console.log(`${name}-${email}-${password}`);
        const response = await axios.post(`${urlText}/user/signup`, { name, email, password });     

        return response;
    } catch (error) {
        console.log(error.response.status);
        if (error.response.status == 400) {
            
        }
        throw new Error("Signup Failed");
    }
});

export const loginSignupSlice = createSlice({
    name: "login",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loginAsync.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;

            const user = action.meta.arg;
            if (user.email && user.password) {
                state.email = user.email
                state.password = user.password;
                state.isUser = true;
                localStorage.setItem('reduxState', JSON.stringify({ loginSignup: { ...state } }));
            }else {
                state.email = null;
                state.password = null;
                state.isUser = false;
            }
        });
        builder.addCase(loginAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            if (action.payload) {
                state.token = action.payload;
                localStorage.setItem('reduxState', JSON.stringify({ loginSignup: { ...state } }));
            }
        });
        builder.addCase(loginAsync.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
            state.email = null;
            state.password = null;
            state.isUser = false;
            localStorage.removeItem('reduxState');
            throw new Error("Login Failed");
        });

        builder.addCase(signupAsync.pending, (state, action) => {
            state.error = null;

            const user = action.meta.arg;
            if (user.email && user.password) {
                
                state.name = user.name
                state.email = user.email
                state.password = user.password;
                state.isUser = true;
            } else {
                state.isUser = false;
                state.email = null;
                state.password = null;
            }
        });

        builder.addCase(signupAsync.rejected, (state, action) => {
            state.error = action.error.message;
            state.name = null;
            state.email = null;
            state.password = null;
            throw new Error("Signup Failed");
        });
    },
});

export default loginSignupSlice.reducer;
