'use client'
import React, { useState, useEffect } from 'react'
import JobItem from '../components/jobItem/JobItem'
import styles from './page.module.css'
import Navbar from '../components/navbar/Navbar'
import { RootState } from '../reduxStore/reducers/userReducer'
import { useSelector } from 'react-redux'
import axios from 'axios'

const JobList = (): JSX.Element => {
  const [jobList, setJobList] = useState([])
  const user = useSelector((state: RootState) => state.user)

  useEffect(() => {
    const userId = user.id
    axios
      .get(`http://localhost:5000/userJobs/${userId}`)
      .then((response) => {
        setJobList(response.data)
      })
      .catch((error) => {
        console.error('Error fetching job data:', error)
      })
  }, [user.id])

  return (
    <div className={styles.jobListContainer}>
      <Navbar />
      <div className={styles.infoBoxContainer}>
        <div className={styles.info}>
          <p>1. Expired and not answered </p>
          <div className={`${styles.boxColor} ${styles.darkRed}`}></div>
        </div>
        <div className={styles.info}>
          <p> 2. Expired or answered but not interviewed </p>
          <div className={`${styles.boxColor} ${styles.lightRed}`}></div>
        </div>
        <div className={styles.info}>
          <p>3. Answered </p>

          <div className={`${styles.boxColor} ${styles.greenLight}`}></div>
        </div>
        <div className={styles.info}>
          <p>4. Answered and interviewed </p>
          <div className={`${styles.boxColor} ${styles.darkGreen}`}></div>
        </div>
      </div>

      <h1 className={styles.jobListHeader}>Job Listings</h1>
      <div className={styles.jobList}>
        {jobList.map((job, index) => (
          <JobItem key={index} job={job} />
        ))}
      </div>
    </div>
  )
}

export default JobList
