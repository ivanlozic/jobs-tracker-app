import { createSlice } from '@reduxjs/toolkit'

interface UserState {
  isLoggedIn: boolean
  token: string
  id: string
  name: string
  surname: string
  email: string
  username: string
  password: string
  jobs: []
}

export interface RootState {
  user: UserState
}

const initialState = {
  isLoggedIn: false,
  token: '',
  id: '',
  name: '',
  surname: '',
  email: '',
  username: '',
  password: '',
  jobs: []
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true
      state.id = action.payload.user.id
      state.name = action.payload.user.name
      state.surname = action.payload.user.surname
      state.email = action.payload.user.email
      state.username = action.payload.user.username
      state.password = action.payload.user.password
      state.jobs = action.payload.user.jobs

      localStorage.setItem('authToken', action.payload.token)
    },
    logout: (state) => {
      state.isLoggedIn = false
      state.token = ''
      state.id = ''
      state.name = ''
      state.surname = ''
      state.email = ''
      state.username = ''
      state.password = ''
      state.jobs = []

      localStorage.removeItem('authToken')
    },
    updateProfile: (state, action) => {
      const { name, surname, email, username, password, jobs } = action.payload
      state.name = name
      state.surname = surname
      state.email = email
      state.username = username
      state.password = password
      state.jobs = jobs
    }
  }
})

export const { login, logout } = userSlice.actions
export default userSlice.reducer
