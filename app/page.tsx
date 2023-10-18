'use client'
import Link from 'next/link'
import Navbar from './components/navbar/Navbar'
import InputJobForm from './components/inputJob/InputJob'
import { useSelector } from 'react-redux'
import { RootState } from './reduxStore/reducers/userReducer'


export default function Home() {
  const user = useSelector((state: RootState) => state.user)


  return (
    <div>
      {user.isLoggedIn ? (
        <div>
          <Navbar />
          <InputJobForm />
        </div>
      ) : (
        <p>
          Please <Link href='/login'>Log In</Link> to access the home page.
        </p>
      )}
    </div>
  )
}
