'use client'
import React, { useState, useEffect } from 'react'
import styles from './page.module.css'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, logout } from '@/app/reduxStore/reducers/userReducer'
import Spinner from '@/app/components/spinner/Spinner'
import { useParams, useRouter } from 'next/navigation'
interface JobItemProps {
  jobId: number
  title: string
  company: string
  location: string
  dateOfExpiration: string
  websiteLink: string
  answered: boolean
  interviewed: boolean
}

const JobDetail = () => {
  const router = useRouter()
  const { id } = useParams()
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user)
  const [job, setJob] = useState<JobItemProps | null>(null)

  const [answered, setAnswered] = useState(false)
  const [interviewed, setInterviewed] = useState(false)
  const [formattedDate, setFormattedDate] = useState('')

  useEffect(() => {
    const selectedJob = user.jobs.find(
      (job: JobItemProps) => job.jobId === Number(id)
    )
    console.log(selectedJob,id)
    console.log(user.jobs)
    if (selectedJob) {
      setJob(selectedJob as JobItemProps)
      setAnswered((selectedJob as JobItemProps).answered)
      setInterviewed((selectedJob as JobItemProps).interviewed)
    } else {
      setJob(null)
    }
  }, [id, user.jobs])
  const handleUpdateJob = async () => {
    try {
      const updatedJob = { ...job, answered, interviewed }
      const response = await axios.put(
        `http://localhost:5000/editJob/${id}`,
        updatedJob
      )

      if (response.status === 200) {
        alert('Sucessfully updated job')
        router.push('/jobs')
      }
    } catch (error) {
      console.error('Error updating job:', error)
    }
  }

  return (
    <div className={styles.editJobContainer}>
      <div>
        <h3 className={styles.id}>{job?.jobId}</h3>
        <h3 className={styles.title}>{job?.title}</h3>
        <p className={styles.company}>Company: {job?.company}</p>
        <p className={styles.location}>Location: {job?.location}</p>
        <div>
          <h3>Date until expiration: {formattedDate}</h3>
          <h3>Link of the job announcement: {job?.websiteLink}</h3>
          <h3>Answered: {job?.answered ? 'Yes' : 'No'}</h3>
          <h3>Interviewed: {job?.interviewed ? 'Yes' : 'No'}</h3>
        </div>
      </div>

      <h1>Edit Job</h1>
      <label>
        Answered:
        <input
          type='checkbox'
          checked={answered}
          onChange={() => setAnswered(!answered)}
        />
      </label>
      <label>
        Interviewed:
        <input
          type='checkbox'
          checked={interviewed}
          onChange={() => setInterviewed(!interviewed)}
        />
      </label>
      <button onClick={handleUpdateJob}>Update Job</button>
    </div>
  )
}

export default JobDetail
