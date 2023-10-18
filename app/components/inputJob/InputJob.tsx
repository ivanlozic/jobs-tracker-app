import React, { useState } from 'react'
import axios from 'axios'
import styles from './InputJob.module.css'

const InputJobForm = (): JSX.Element => {
  const [formData, setFormData] = useState({
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const job = { ...formData, answered: false, interviewed: false }
      const response = await axios.post('http://localhost:5000/job', job)
      console.log('Registration successful', response.data)

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
      </div>
      <button type='submit' className={styles.submitButton}>
        Submit Job
      </button>
    </form>
  )
}

export default InputJobForm
