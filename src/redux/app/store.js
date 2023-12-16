import { configureStore } from '@reduxjs/toolkit'
import loginSignupSlice from '../features/opening/loginSignupSlice'
import fileFolderSlice from '../features/filefolder/fileFolderSlice'

export default configureStore({
  reducer: {
    login: loginSignupSlice,
    fileFolder: fileFolderSlice
  },
})