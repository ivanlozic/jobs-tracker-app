'use client'
import styles from './page.module.css'
import axios from 'axios'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { login } from '../reduxStore/reducers/userReducer'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const dispatch = useDispatch()

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password
      })
      console.log('Login successful', response.data)
      const { user } = response.data
      dispatch(login({ user }))
      router.push('/')
    } catch (error) {
      console.error('Login failed', error)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin()
    }
  }
  return (
    <div className={styles.loginContainer}>
      <h1>Login</h1>
      <input
        type='text'
        placeholder='Username'
        value={username}
        onKeyPress={handleKeyPress}
        onChange={(e) => setUsername(e.target.value)}
        className={styles.inputField}
      />
      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyPress={handleKeyPress}
        className={styles.inputField}
      />
      <button onClick={handleLogin} className={styles.button}>
        Login
      </button>
      <p>
        Dont have an account?{' '}
        <Link href='/register' className={styles.link}>
          Register
        </Link>
      </p>
    </div>
  )
}

export default Login
