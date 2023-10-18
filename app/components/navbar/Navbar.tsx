'use client'
import Link from 'next/link'
import styles from './Navbar.module.css'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, logout } from '@/app/reduxStore/reducers/userReducer'

const Navbar = (): JSX.Element => {
  const [showProfileOptions, setShowProfileOptions] = useState(false)
  const user = useSelector((state: RootState) => state.user)

  const dispatch = useDispatch()

  const toggleProfileOptions = () => {
    setShowProfileOptions(!showProfileOptions)
  }

  const handleLogout = () => {
    dispatch(logout())
    setShowProfileOptions(false)
  }
  const initials = user.name.charAt(0).toUpperCase() + user.surname.charAt(0).toUpperCase();

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <div className={styles.navRoutes}>
          <li className={styles.navItem}>
            <Link href='/'>Home</Link>
          </li>
          <li className={styles.navItem}>
            <Link href='/jobs'>Jobs List</Link>
          </li>
        </div>

        {user.isLoggedIn ? (
          <li className={styles.profileIcon} onClick={toggleProfileOptions}>
            <div className={styles.icon}>
              <span className={styles.profileInitials}>{initials}</span>{' '}
            </div>
            {showProfileOptions && (
              <ul className={styles.profileOptions}>
                <Link href='/editProfilePage'>
                  <li>Edit Profile Page</li>
                </Link>
                <li onClick={handleLogout}>Logout</li>
              </ul>
            )}
          </li>
        ) : null}
      </ul>
    </nav>
  )
}

export default Navbar
