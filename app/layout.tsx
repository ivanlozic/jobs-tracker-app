'use client'
import { Inter } from 'next/font/google'
import './globals.css'
import { Provider } from 'react-redux'
import store from './reduxStore/store'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Provider store={store}>
          <div>{children}</div>
        </Provider>
      </body>
    </html>
  )
}
