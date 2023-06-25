'use client'

import Image from 'next/image'
import { useState } from 'react'
import pictures from './pictures'

const PictureCarousel = () => {
  const [current, setCurrent] = useState(0)

  const increment = () => {
    console.log(current)
    setCurrent((current + 1) % pictures.length)
  }

  const decrement = () =>
    setCurrent(current == 0 ? pictures.length - 1 : current - 1)

  return (
    <div className="relative w-full">
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        <Image
          key={pictures[current].src}
          src={pictures[current].src}
          alt={pictures[current].alt}
          style={{ objectFit: 'contain' }}
          fill
          loading="eager"
          quality="100"
        />
      </div>

      <button
        type="button"
        onClick={decrement}
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
      >
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-gray-800/30 group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        onClick={increment}
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
      >
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-gray-800/30 group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  )
}

export default PictureCarousel
