/*
'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './EditJob.module.css';
import axios from 'axios';

const JobDetail = () => {
  const router = useRouter();

  const handleUpdateJob = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/editJob/${job.id}`, {
        answered,
        interviewed,
      });

      if (response.status === 200) {
        router.push('/jobs');
      } else {
      }
    } catch (error) {
      console.error('Error updating job:', error);
    }
  };

  return (
    <div className={styles.editJobContainer}>
      <h1>Edit Job</h1>
      <label>
        Answered:
        <input
          type="checkbox"
          checked={answered}
          onChange={() => setAnswered(!answered)}
        />
      </label>
      <label>
        Interviewed:
        <input
          type="checkbox"
          checked={interviewed}
          onChange={() => setInterviewed(!interviewed)}
        />
      </label>
      <button onClick={handleUpdateJob}>Update Job</button>
    </div>
  );
};

export default JobDetail;

  */
