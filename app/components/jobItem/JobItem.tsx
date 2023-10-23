'use client'
import Link from 'next/link'
import Navbar from '../navbar/Navbar'
import styles from './JobItem.module.css'
import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'

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
  }
}

const formatDate = (dateString: string) => {
  const parts = dateString.split('T')[0].split('-')
  if (parts.length === 3) {
    const [year, month, day] = parts
    return `${month}/${day}/${year}`
  }
  return dateString
}

const JobItem = ({ job }: JobItemProps): JSX.Element => {
  const [expired, setExpired] = useState(false)

  useEffect(() => {
    const currentDate = new Date()
    const expirationDate = new Date(job.dateOfExpiration)
    if (expirationDate < currentDate) {
      setExpired(true)
    }
  }, [job.dateOfExpiration])

  let statusClass = ''
  if (expired && !job.answered) {
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
      </div>
    </div>
  )
}

export default JobItem
