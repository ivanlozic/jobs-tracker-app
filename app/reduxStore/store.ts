import { configureStore } from '@reduxjs/toolkit'
import jobsReducer from './reducers/jobsReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    user: userReducer
  }
})

export default store
