import React from 'react'
import JobItem from '../components/jobItem/JobItem'
import styles from './page.module.css'
import Navbar from '../components/navbar/Navbar'

const jobList = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'Tech Co.',
    location: 'New York, NY',
    dateOfExpiration: '2023-09-30',
    websiteLink: 'https://example.com/job1',
    answered: false,
    interviewed: false
  },
  {
    id: 2,
    title: 'Backend Developer',
    company: 'Web Solutions',
    location: 'San Francisco, CA',
    dateOfExpiration: '2023-11-30',
    websiteLink: 'https://example.com/job2',
    answered: true,
    interviewed: false
  },
  {
    id: 3,
    title: 'UI/UX Designer',
    company: 'Design Studio',
    location: 'Los Angeles, CA',
    dateOfExpiration: '2023-12-15',
    websiteLink: 'https://example.com/job3',
    answered: false,
    interviewed: false
  }
]

const JobList = (): JSX.Element => {
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
        {jobList.map((job) => (
          <JobItem key={job.id} job={job} />
        ))}
      </div>
    </div>
  )
}

export default JobList
