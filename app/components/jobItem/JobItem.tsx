'use client'
import Link from 'next/link'
import Navbar from '../navbar/Navbar'
import styles from './JobItem.module.css'
import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/reduxStore/reducers/userReducer'
import DeleteConfirmationModal from '../deleteModal/deleteModal'

interface JobItemProps {
  job: {
    jobId: number
    title: string
    company: string
    location: string
    dateOfExpiration: string
    websiteLink: string
    answered: boolean
    interviewed: boolean
    declined: boolean
  }
}

const formatDate = (dateString: string) => {
  const parts = dateString.split('T')[0].split('-')
  if (parts.length === 3) {
    const [year, month, day] = parts
    return `${day}/${month}/${year}`
  }
  return dateString
}

const JobItem = ({ job }: JobItemProps): JSX.Element => {
  const [expired, setExpired] = useState(false)

  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false)

  const user = useSelector((state: RootState) => state.user)

  useEffect(() => {
    const currentDate = new Date()
    const expirationDate = new Date(job.dateOfExpiration)
    if (expirationDate < currentDate) {
      setExpired(true)
    }
  }, [job.dateOfExpiration])

  const handleDeleteJob = () => {
    setIsDeleteConfirmationOpen(!isDeleteConfirmationOpen)
  }

  const confirmDelete = () => {
    const userId = user.id
    const jobId = job.jobId

    axios
      .delete(`http://localhost:5000/deleteJob/${userId}/${jobId}`)
      .then((response) => {
        if (response.status === 200) {
          alert('Job deleted successfully')
        }
      })
      .catch((error) => {
        console.error('Error deleting job:', error)
      })

    setIsDeleteConfirmationOpen(false)
  }

  const cancelDelete = () => {
    setIsDeleteConfirmationOpen(false)
  }
  let statusClass = ''
  if ((expired && !job.answered) || job.declined ) {
    statusClass = 'darkRed'
  } else if (expired || (expired && job.answered && !job.interviewed)) {
    statusClass = 'lightRed'
  } else if (!expired && job.answered && !job.interviewed) {
    statusClass = 'greenLight'
  } else if (job.answered && job.interviewed) {
    statusClass = 'darkGreen'
  } else if (!expired && !job.answered) {
    statusClass = 'jobItem'
  }

  const formattedDate = formatDate(job.dateOfExpiration)
  return (
    <div className={` ${styles[statusClass]} `}>
      <h3 className={styles.id}>{job.jobId}</h3>
      <h3 className={styles.title}>{job.title}</h3>
      <p className={styles.company}>Company: {job.company}</p>
      <p className={styles.location}>Location: {job.location}</p>
      <div>
        <h3>Date until expiration: {formattedDate}</h3>
        <h3>Link of the job announcement: {job.websiteLink}</h3>
        <h3>Answered: {job.answered ? 'Yes' : 'No'}</h3>
        <h3>Interviewed: {job.interviewed ? 'Yes' : 'No'}</h3>
        {!expired && job.interviewed === false && (
          <Link href='/jobs/[id]' as={`/jobs/${job.jobId}`}>
            <button className={styles.editButton}>Edit</button>
          </Link>
        )}

        <button className={styles.deleteButton} onClick={handleDeleteJob}>
          Delete
        </button>
      </div>

      <DeleteConfirmationModal
        isOpen={isDeleteConfirmationOpen}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  )
}

export default JobItem
