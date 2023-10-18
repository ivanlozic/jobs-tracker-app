'use client'
import { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import styles from './page.module.css'
const Register = () => {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = async () => {
    try {
      const user = {
        name: name,
        surname: surname,
        email: email,
        username: username,
        password: password
      }
      const response = await axios.post('http://localhost:5000/register', user)
      console.log('Registration successful', response.data)
    } catch (error) {
      console.error('Registration failed', error)
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Register</h1>
      <input
        type='text'
        placeholder='Name'
        className={styles.input}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type='text'
        placeholder='Surname'
        className={styles.input}
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
      />
      <input
        type='email'
        placeholder='Email'
        className={styles.input}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type='text'
        placeholder='Username'
        className={styles.input}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type='password'
        placeholder='Password'
        className={styles.input}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister} className={styles.button}>
        Register
      </button>
      <p className={styles.p}>
        Already have an account?{' '}
        <Link href='/login' className={styles.link}>
          Sign in
        </Link>
      </p>
    </div>
  )
}

export default Register
