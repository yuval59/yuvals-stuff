'use client'

import { useState } from 'react'
import { HideableTextProps } from './types'

const button =
    'rounded-lg bg-gray-800/80 px-3 py-2 text-sm font-medium text-white border border-gray-700 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'

export const HideableText = ({ children }: HideableTextProps) => {
    const [shown, setShown] = useState(true)

    return (
        // Above the heightmap, which sits at a negative z-index
        <div className='relative z-10'>
            <div className='flex justify-end p-4'>
                <button
                    type='button'
                    className={button}
                    onClick={() => setShown(!shown)}
                    aria-expanded={shown}
                    aria-controls='home-text'
                >
                    {shown ? 'Hide text' : 'Show text'}
                </button>
            </div>

            {shown && (
                <div
                    id='home-text'
                    className='grid grid-rows-4 p-8 m-8 rounded-xl bg-black/60'
                >
                    {children}
                </div>
            )}
        </div>
    )
}
