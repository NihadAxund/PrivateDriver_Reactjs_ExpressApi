import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";

const urlText = "https://privatedriver.onrender.com";

let initialState = {
    path:null,
    error: null,
    folders: [],

};  
//const token ="eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1N2E0YjQ0M2E5NWIxYWVkZGQ5ODNlMSIsImVtYWlsIjoibmloYXRheHVuZHphZGUwNkBnbWFpbC5jb20iLCJpYXQiOjE3MDI3NDY4ODksImV4cCI6MTcwMjc4Mjg4OX0.E5S6jUjuHGCn459hcmtV_-yj4z3dksjeWMInjY9VMOcBheR7po146RLhiHHYl4hMvwBZ3tLQtRWzjW23burjSQ";

export const getUserFoldersAsync = createAsyncThunk("fileFolder/userFolders", async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const { token } = state.login;
    
    try {
      console.log(token);
      console.log("Get User Folders");
      const response = await axios.get(`${urlText}/driver/userfolders`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      let data = response.data;
      console.log("aaaaaaadd223aaaaaaaaaa");
      console.log(data);
      return response.data;
    } catch (error) {
      console.error("Error in getUserFoldersAsync:", error);
      throw new Error("Get User Folders");
    }
  });



export const addFolderAsync = createAsyncThunk("fileFolder/addFolderAsync", async ({ folderName },thunkAPI) => {

    try {
        const state = thunkAPI.getState();
        const { token } = state.login;
  
       console.log(token);
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
        return response.data;
    } catch (error) {
        throw new Error("Add Folder Failed");
    }
});



export const fileFolderSlice = createSlice({
    name: "fileFolder",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        ///AddFolderAsync
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
            console.log("zzzzzzzzzzzzzz")
            console.log(action.error);
            throw new Error("Add Folder Failed");
        });
        ////getUserFoldersAsync
        builder.addCase(getUserFoldersAsync.pending, (state, action) => {
  

        });
        builder.addCase(getUserFoldersAsync.fulfilled, (state, action) => {
            console.log("getUserFoldersAsync is fulfilled");
            let data = action.payload;
            console.log(data);
            // Update state with the received data if needed
            state.folders = data.folderInfo;
        });
        builder.addCase(getUserFoldersAsync.rejected,(state, action)=>{
            state.folders = [];
            throw new Error("Get User Folders Error");
        });

    },
});



export default fileFolderSlice.reducer;