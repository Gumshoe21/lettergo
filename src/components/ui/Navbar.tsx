import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/react'
import { Righteous } from '@next/font/google'

const righteous = Righteous({ weight: '400' })

const Navbar: React.FC = () => {
  const router = useRouter()
  const isActive: (pathname: string) => boolean = (pathname) => router.pathname === pathname
  const { data: session } = useSession()
  const [showNav, setShowNav] = useState(false)

  const handleShowNav = () => {
    setShowNav(!showNav)
  }

  return (
    <>
      <nav className='bg-white self-stretch rounded p-4 dark:bg-neutral-800 border-b-[#3a3a3c] border-b-[1px] border-r-current border-l-current '>
        <div className='flex flex-wrap justify-between items-stretch gap-2'>
          {/* main content */}

          {/* Company name plus svg, left side of nav */}
          <Link href='/' className='flex items-center'>
            {/*

            <Image src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="LetterGo Logo" width='1' height='1' />
            */}
            <span className={`${righteous.className} text-primary-400 self-center text-2xl whitespace-nowrap `}>LetterGo</span>
          </Link>

          {/* menu button */}
          <button
            onClick={handleShowNav}
            data-collapse-toggle='navbar-default'
            type='button'
            className='inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
            aria-controls='navbar-default'
            aria-expanded='false'
          >
            <span className='sr-only'>Open main menu</span>
            <svg className='w-5 h-5' aria-hidden='true' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
              <path
                fillRule='evenodd'
                d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                clipRule='evenodd'
              ></path>
            </svg>
          </button>

          {/* nav items */}
          <div className={`${showNav ? '' : 'hidden'} w-full md:block md:w-auto`} id='navbar-default'>
            <ul className='flex flex-col p-2 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-neutral-800 dark:border-gray-700'>
              <li>
                <Link href='howtoplay' className='block py-2 pr-4 pl-3 text-white rounded md:bg-transparent md:p-0 dark:text-white' aria-current='page'>
                  How to Play
                </Link>
              </li>
              <li>
                <Link href='leaderboard' className='block py-2 pr-4 pl-3 text-white rounded md:bg-transparent md:p-0 dark:text-white' aria-current='page'>
                  Leaderboard
                </Link>
              </li>
              {/* Log in */}
              {!session && (
                <li>
                  <Link className='text-white' href='/api/auth/signin' data-active={isActive('/signup')}>
                    Log In
                  </Link>
                </li>
              )}
              {/* Log out */}
              {session && (
                <li>
                  <button className='block py-2 pr-4 pl-3 text-white rounded md:bg-transparent md:p-0 dark:text-white' onClick={() => signOut()}>
                    <a>Log out</a>
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
