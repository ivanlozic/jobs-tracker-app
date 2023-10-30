import { createSlice } from '@reduxjs/toolkit'
let storedToken = '';
if (typeof window !== 'undefined' && window.localStorage) {
  storedToken = localStorage.getItem('authToken') || '';
}
const storedUserData = localStorage?.getItem('userData') || '';

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
  isLoggedIn: !!storedToken,
  token: storedToken || '',
  id: '',
  name: '',
  surname: '',
  email: '',
  username: '',
  password: '',
  jobs: []
}

if (storedUserData) {
  const userData = JSON.parse(storedUserData)
  initialState.id = userData.id
  initialState.name = userData.name
  initialState.surname = userData.surname
  initialState.email = userData.email
  initialState.username = userData.username
  initialState.password = userData.password
  initialState.jobs = userData.jobs
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
      localStorage.setItem('userData', JSON.stringify(action.payload.user))
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
      localStorage.removeItem('userData')
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
