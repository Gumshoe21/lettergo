import type { NextPage } from 'next';
import React, { useState } from 'react'
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Image from 'next/image'

const Navbar: NextPage = () => {
  const [showNav, setShowNav] = useState(false)

  const handleShowNav = () => {
    setShowNav(!showNav);
  }

  return (
    <>
      <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
        <div className="container flex flex-wrap justify-center items-center mx-auto gap-4">
          {/* main content */}

          {/* Company name plus svg, left side of nav */}
          <a href="#" className="flex items-center">
{            /*

            <Image src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="LetterGo Logo" width='1' height='1' />
            */}
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">LetterGo</span>
          </a>

          {/* menu button */}
          <button onClick={handleShowNav} data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
          </button>

          {/* nav items */}
          <div className={`${showNav ? '' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
            <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a href="#" className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">How to Play</a>
              </li>
              <li>
                <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</a>
              </li>
            </ul>
          </div>

        </div>
      </nav>

    </>
  );
}

export default Navbar;
