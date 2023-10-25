'use client'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../reduxStore/reducers/userReducer'
import styles from './page.module.css'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'

const EditProfilePage: React.FC = () => {
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user)
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: user.name,
    surname: user.surname,
    email: user.email,
    username: user.username,
    password: user.password
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleUpdateProfile = () => {
    axios
      .put(`http://localhost:5000/editProfile/${user.id}`, formData)
      .then((response) => {
        toast.success('Profile updated successfully')
        router.push('/')
        console.log('Profile updated successfully')
      })
      .catch((error) => {
        console.error('Profile update failed:', error.response.data.message)
      })
  }

  return (
    <div className={styles.container}>
      <h1>Edit Profile</h1>
      <form className={styles.formContainer}>
        <div>
          <label className={styles.label}>Name:</label>
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div>
          <label className={styles.label}>Surname:</label>
          <input
            type='text'
            name='surname'
            value={formData.surname}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div>
          <label className={styles.label}>Email:</label>
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div>
          <label className={styles.label}>Username:</label>
          <input
            type='text'
            name='username'
            value={formData.username}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div>
          <label className={styles.label}>Password:</label>
          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <button type='button' onClick={handleUpdateProfile}>
          Update Profile
        </button>
      </form>
      <ToastContainer position='top-right' autoClose={3000} hideProgressBar />
    </div>
  )
}

export default EditProfilePage
