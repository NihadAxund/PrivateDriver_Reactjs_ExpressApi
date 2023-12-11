import { configureStore } from '@reduxjs/toolkit'
import loginSlice from '../features/opening/loginSlice'

export default configureStore({
  reducer: {
    login: loginSlice
  },
})