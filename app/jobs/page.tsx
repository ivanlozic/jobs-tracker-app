'use client'
import React, { useState, useEffect } from 'react'
import JobItem from '../components/jobItem/JobItem'
import styles from './page.module.css'
import Navbar from '../components/navbar/Navbar'
import { RootState } from '../reduxStore/reducers/userReducer'
import { useSelector } from 'react-redux'
import axios from 'axios'

interface JobItemProps {
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

const JobList = (): JSX.Element => {
  const [jobList, setJobList] = useState<JobItemProps[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [activeButton, setActiveButton] = useState(1)
  const itemsPerPage = 5
  const user = useSelector((state: RootState) => state.user)

  const filteredJobList = jobList.filter((job: JobItemProps) => {
    return job.title.toLowerCase().includes(searchQuery.toLowerCase())
  })

  const displayJobList = searchQuery ? filteredJobList : jobList

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentJobList = filteredJobList.slice(
    indexOfFirstItem,
    indexOfLastItem
  )
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
  }, [user.id, jobList])

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    setActiveButton(pageNumber)
  }

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
      <input
        type='text'
        className={styles.searchInput}
        placeholder='Search Jobs'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className={styles.jobList}>
        {currentJobList.map((job, index) => (
          <JobItem key={index} job={job} />
        ))}
      </div>
      <div className={styles.pagination}>
        {Array.from(
          { length: Math.ceil(displayJobList.length / itemsPerPage) },
          (_, index) => (
            <button
              key={index}
              className={`${styles.paginationButton} ${
                activeButton === index + 1 ? styles.active : ''
              }`}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  )
}

export default JobList
