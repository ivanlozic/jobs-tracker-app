import React, { useState, FormEvent } from 'react'
import classes from './LoginForm.module.css'
import { useDispatch } from 'react-redux'
import axios, { AxiosResponse, AxiosError } from 'axios'
import { login } from '@/app/reduxStore/reducers/userReducer'
import Spinner from '../spinner/Spinner'

interface LoginFormProps {
  onClose: () => void
}

interface CustomAxiosError extends AxiosError {
  response?: AxiosResponse & {
    data: {
      message: string
    }
  }
}

const LoginForm = ({ onClose }: LoginFormProps): JSX.Element => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const dispatch = useDispatch()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    setLoading(true)
    try {
      const response = await axios.post('http:localhost5000:/login', {
        email: username,
        password
      })

      const { token, user } = response.data
      console.log(response.data)

      dispatch(login({ user }))
      onClose()
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 401) {
          alert('Authentication failed: ' + error.response.data.message)
        } else {
          console.error('Error authenticating:', error)
        }
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <form className={classes.form} onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type='submit'>Log In</button>
        </form>
      )}
    </div>
  )
}

export default LoginForm
