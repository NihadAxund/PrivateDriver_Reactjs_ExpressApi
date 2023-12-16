import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";

const urlText = "http://localhost:3005";

let initialState = {
    path:null,
    error: null,

};  
const token ="eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1N2E0YjQ0M2E5NWIxYWVkZGQ5ODNlMSIsImVtYWlsIjoibmloYXRheHVuZHphZGUwNkBnbWFpbC5jb20iLCJpYXQiOjE3MDI3NDY4ODksImV4cCI6MTcwMjc4Mjg4OX0.E5S6jUjuHGCn459hcmtV_-yj4z3dksjeWMInjY9VMOcBheR7po146RLhiHHYl4hMvwBZ3tLQtRWzjW23burjSQ";

export const getUserFoldersAsync = createAsyncThunk("fileFolder/userFolders",async ()=>{
    try {
        console.log("Get User Folders");
        const response = await axios.get(`${urlText}/driver/userfolders`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        let data = response.data;
        console.log("aaaaaaaaaaaaaaaa")
        console.log(data);
    } catch (error) {
        throw new Error("Get User Folders");
    }
})


export const addFolderAsync = createAsyncThunk("fileFolder/addFolderAsync", async ({ folderName }) => {

    // const { token } = useSelector((state) => state.login);

    // console.log(token);
    try {
        console.log(folderName)
        // if (!folderName)
        
        //     throw new Error("Login Failed");
        const response = await axios.post(`${urlText}/driver/addfolder`, { folderName }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const data = response.data;
        console.log("aaaaaaaaaaaaa")
        console.log(data);
        return data;
    } catch (error) {
        throw new Error("Add Folder Failed");
    }
});



export const fileFolderSlice = createSlice({
    name: "login",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addFolderAsync.pending, (state, action) => {
            const item = action.meta.arg;
            console.log('_========')
            console.log(item)
        });
        builder.addCase(addFolderAsync.fulfilled, (state, action) => {
            console.log("___________")
            let data = action.payload;
            console.log(data);
        });
        builder.addCase(addFolderAsync.rejected, (state, action) => {
            throw new Error("Add Folder Failed");
        });

    },
});



export default fileFolderSlice.reducer;