import { configureStore } from '@reduxjs/toolkit'
import loginSignupSlice from '../features/opening/loginSignupSlice'

export default configureStore({
  reducer: {
    login: loginSignupSlice
  },
})