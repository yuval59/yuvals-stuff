'use client'

import { useEffect, useState } from 'react'
import images from './images'

const PictureCarousel = () => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((index + 1) % images.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [index])

  return (
    <div className="relative w-full">
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        {images[index]}
      </div>

      <button
        type="button"
        onClick={() => setIndex(index == 0 ? images.length - 1 : index - 1)}
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
      >
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-gray-500/30 group-hover:bg-gray-500/60 group-focus:ring-4 group-focus:ring-white group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 sm:w-6 sm:h-6 text-gray-950"
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
        onClick={() => setIndex((index + 1) % images.length)}
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
      >
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-gray-500/30 group-hover:bg-gray-500/60 group-focus:ring-4 group-focus:ring-white group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 sm:w-6 sm:h-6 text-gray-950"
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
