'use client'

import { LINKS, ROUTES } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const navList =
  'font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-gray-800 md:bg-gray-900 border-gray-700'
const navElementMain =
  'block py-2 pl-3 pr-4 bg-blue-700 rounded md:bg-transparent md:p-0 text-white md:text-blue-500'
const navElement =
  'block py-2 pl-3 pr-4 rounded md:border-0 md:p-0 text-white md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent'

export const Navbar = () => {
  return (
    <nav className="bg-gray-900 border-gray-700">
      <div className="max-w-screen-xl flex flex-row items-center justify-between mx-auto p-4">
        <ul className={navList}>
          <li>
            <Link href={LINKS.GITHUB}>
              <div className="relative w-6 h-6 rounded-xl">
                <Image
                  src="/github-mark-white.svg"
                  alt="The GitHub logo"
                  fill
                ></Image>
              </div>
            </Link>
          </li>

          <li>
            <Link href={LINKS.LINKEDIN}>
              <div className="relative w-6 h-6 rounded-xl">
                <Image
                  src="/LI-In-Bug.png"
                  alt="The LinkedIn logo"
                  fill
                ></Image>
              </div>
            </Link>
          </li>
        </ul>

        <ul className={navList}>
          <li>
            <Link href={ROUTES.HOME} className={navElementMain}>
              Home
            </Link>
          </li>

          <li>
            <Link href={ROUTES.PROJECTS} className={navElement}>
              Projects
            </Link>
          </li>

          <li>
            <Link href={ROUTES.ABOUT} className={navElement}>
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
