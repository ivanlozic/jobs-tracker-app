import React, { useState } from 'react'
import axios from 'axios'
import styles from './InputJob.module.css'
import { RootState } from '@/app/reduxStore/reducers/userReducer'
import { useSelector } from 'react-redux'
import { axiosInstance } from '@/app/config/axios'
import { axiosRoutes } from '@/app/constatnts/constants'

const InputJobForm = (): JSX.Element => {
  const user = useSelector((state: RootState) => state.user)

  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    dateOfExpiration: '',
    websiteLink: ''
  })
  const [errors, setErrors] = useState({
    title: '',
    company: '',
    location: '',
    dateOfExpiration: '',
    websiteLink: ''
  })
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const validateForm = () => {
    const newErrors = { ...errors }
    let isValid = true

    if (formData.company.trim() === '') {
      newErrors.company = 'Company is required'
      isValid = false
    } else {
      newErrors.company = ''
    }

    if (formData.location.trim() === '') {
      newErrors.location = 'Location is required'
      isValid = false
    } else {
      newErrors.location = ''
    }

    if (formData.dateOfExpiration.trim() === '') {
      newErrors.dateOfExpiration = 'Date of Expiration is required'
      isValid = false
    } else {
      newErrors.dateOfExpiration = ''
    }

    if (formData.websiteLink.trim() === '') {
      newErrors.websiteLink = 'Website Link is required'
      isValid = false
    } else {
      newErrors.websiteLink = ''
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      const userId = user.id
      const job = {
        userId,
        ...formData,
        answered: false,
        interviewed: false,
        declined: false
      }

      try {
        const response = await axiosInstance.post(
          `${axiosRoutes.POST_JOB}`,
          job
        )
        console.log('Registration successful', response.data)

        if (response.status === 200) {
          alert(
            `${response.data.message}, you can check it in the Jobs List section.`
          )
        } else {
          alert('An unexpected error occurred while posting the job.')
        }

        setFormData({
          title: '',
          company: '',
          location: '',
          dateOfExpiration: '',
          websiteLink: ''
        })
      } catch (error) {
        console.error('Error submitting job data:', error)
      }
    }
  }

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor='title' className={styles.label}>
          Title
        </label>
        <input
          type='text'
          id='title'
          name='title'
          value={formData.title}
          onChange={handleInputChange}
          className={styles.inputField}
          required
        />
        <span className={styles.error}>{errors.title}</span>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor='company' className={styles.label}>
          Company
        </label>
        <input
          type='text'
          id='company'
          name='company'
          value={formData.company}
          onChange={handleInputChange}
          className={styles.inputField}
          required
        />
        <span className={styles.error}>{errors.company}</span>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor='location' className={styles.label}>
          Location
        </label>
        <input
          type='text'
          id='location'
          name='location'
          value={formData.location}
          onChange={handleInputChange}
          className={styles.inputField}
          required
        />
        <span className={styles.error}>{errors.location}</span>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor='dateOfExpiration' className={styles.label}>
          Date of Expiration
        </label>
        <input
          type='date'
          id='dateOfExpiration'
          name='dateOfExpiration'
          value={formData.dateOfExpiration}
          onChange={handleInputChange}
          className={styles.inputField}
          required
        />
        <span className={styles.error}>{errors.dateOfExpiration}</span>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor='websiteLink' className={styles.label}>
          Website Link
        </label>
        <input
          type='url'
          id='websiteLink'
          name='websiteLink'
          value={formData.websiteLink}
          onChange={handleInputChange}
          className={styles.inputField}
          required
        />
        <span className={styles.error}>{errors.websiteLink}</span>
      </div>
      <button type='submit' className={styles.submitButton}>
        Submit Job
      </button>
    </form>
  )
}

export default InputJobForm
