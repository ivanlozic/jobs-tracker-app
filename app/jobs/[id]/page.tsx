import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, logout } from '@/app/reduxStore/reducers/userReducer';
import Spinner from '@/app/components/spinner/Spinner';
import { useParams, useRouter } from 'next/navigation';

interface JobItemProps {
  jobId: number;
  title: string;
  company: string;
  location: string;
  dateOfExpiration: string;
  websiteLink: string;
  answered: boolean;
  interviewed: boolean;
}

const JobDetail = () => {
  const router = useRouter();
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [formattedDate, setFormattedDate] = useState('');
  const [jobId, setJobId] = useState(0);
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [dateOfExpiration, setDateOfExpiration] = useState('');
  const [websiteLink, setWebsiteLink] = useState('');
  const [answered, setAnswered] = useState(false);
  const [interviewed, setInterviewed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const selectedJob = user.jobs.find(
      (job: JobItemProps) => job.jobId === Number(id)
    );
    if (selectedJob) {
      const {
        jobId,
        title,
        company,
        location,
        dateOfExpiration,
        websiteLink,
        answered,
        interviewed,
      } = selectedJob;

      setJobId(jobId);
      setTitle(title);
      setCompany(company);
      setLocation(location);
      setDateOfExpiration(dateOfExpiration);
      setWebsiteLink(websiteLink);
      setAnswered(answered);
      setInterviewed(interviewed);
    }
  }, [id, user.jobs]);

  const handleUpdateJob = async () => {
    const updatedJob = {
      jobId,
      title,
      company,
      location,
      dateOfExpiration,
      websiteLink,
      answered,
      interviewed,
    };
    const userId = user.id;
    setIsLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:5000/editJob/${userId}`,
        updatedJob
      );

      if (response.status === 200) {
        alert('Successfully updated job');
        router.push('/jobs');
      }
    } catch (error) {
      console.error('Error updating job:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.editJobContainer}>
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Spinner />
        </div>
      ) : (
        <div>
          <h3 className="id">{jobId}</h3>
          <h3 className="title">{title}</h3>
          <p className="company">Company: {company}</p>
          <p className="location">Location: {location}</p>
          <div>
            <h3>Date until expiration: {formattedDate}</h3>
            <h3>Link of the job announcement: {websiteLink}</h3>
            <h3>Answered: {answered ? 'Yes' : 'No'}</h3>
            <h3>Interviewed: {interviewed ? 'Yes' : 'No'}</h3>
          </div>
        </div>
      )}

      <div>
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
    </div>
  );
};

export default JobDetail;
