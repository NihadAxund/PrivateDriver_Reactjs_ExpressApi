import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";

const urlText = "https://privatedriver.onrender.com";
//const urlText = "http://localhost:3005"

let initialState = {
    path:null,
    error: null,
    folders: [],
    files:[],

};  


export const getFolderZipAsync = createAsyncThunk("fileFolder/folderzip", async ({ folderid }, thunkAPI) => {
    const state = thunkAPI.getState();
    const { token } = state.login;
    try {
        const response = await axios.get(`${urlText}/driver/folderdownload`, {
            params: { folderid },
            headers: {
                Authorization: `Bearer ${token}`
            },
            responseType: 'blob', 
        });


        const blob = new Blob([response.data], { type: 'application/zip' });
        const url = window.URL.createObjectURL(blob);

        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'folder.zip';

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        console.log('Download completed:', response);
    } catch (error) {
        console.error("Error Get Folder Zip:", error);
        throw new Error("Get Folder Download Error");
    }
});


export const getfolderfilesnameAsync = createAsyncThunk("fileFolder/folderfilesinfo", async ({folderid}, thunkAPI)=>{
    const state = thunkAPI.getState();
    const { token } = state.login;
    try {
        const response = await axios.get(`${urlText}/driver/folderfilesinfo`, {
            params: { folderid }, 
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
        const data = response.data;
        console.log(data);
        return response.data;
    } catch (error) {
        console.error("Error Get Folder files:", error);
        throw new Error("Get Folder files name error");
    }

});

export const addFileAsync = createAsyncThunk("fileFolder/addFileAsync", async ({ folderId, file }, thunkAPI) => {
    const state = thunkAPI.getState();
    const { token } = state.login;

    try {
        const formData = new FormData();
        formData.append("folderid", folderId); 
        formData.append("file", file);
        
        const response = await axios.post(
            `${urlText}/driver/addfile`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        const data = response.data;
        console.log("File added successfully:", data);
        return response.data;
    } catch (error) {
        console.error("Error adding file:", error);
        throw new Error("Add File Failed");
    }
});


export const RemoveUserFolderAsync = createAsyncThunk("fileFolder/RemoveUserFolder",async ({ folderid },thunkAPI) =>{
    const state = thunkAPI.getState();
    const { token } = state.login;

    try {
        console.log("Remove User Folder");
        const response = await axios.delete(`${urlText}/driver/removejustfolder?folderid=${folderid}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          
          let data = response.data;
          console.log("REmoveeeeeeeeeeeeeeeeeeeeeee");
          console.log(data);
          return response.data;

    } catch (error) {
        console.error("Remove User Folder Error:", error);
        throw new Error("Remove User Folder failed");
    }
});

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
        ////RemoveUserFolder
        builder.addCase(RemoveUserFolderAsync.fulfilled, (state, action) => {
            console.log("Remove User Folder is fulfilled");
            const item = action.meta.arg.folderid;
            if(item){
                const indexToRemove = state.folders.findIndex(folder => folder.id === item);
                if (indexToRemove !== -1) {
                    //state.folders.splice(indexToRemove, 1)
                    state.folders = state.folders.filter(folder => folder.id !== item);;
                }
            }
        });

        ////////////////////////////
        //getfolderfilesnameAsync
        builder.addCase(getfolderfilesnameAsync.pending, (state, action) => {
            console.log("Get Folder Files name pending");
            const item = action.payload;
            if(item&&item.length >0&&item!==state.files){
                state.files = item;
            }
            else{
                state.files = []
            }

        });
        builder.addCase(getfolderfilesnameAsync.fulfilled, (state,action)=>{
            console.log("Get Folder Files name");
            const item = action.payload;
            if(item&&item.length >0&&item!==state.files){
                state.files = item;
            }
            else{
                state.files = []
            }
        });
        builder.addCase(getfolderfilesnameAsync.rejected, (state, action) => {
            
        });

    },
});



export default fileFolderSlice.reducer;