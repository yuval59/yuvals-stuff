import { z } from 'zod'
import { env } from './env.mjs'

//#region GitHub constants
export const owner = 'yuval59' as const

export const projectData = [
  {
    name: 'react-vacations',
    host: 'https://react-vacations.vercel.app',
  },
  {
    name: 'ts-brainf-k',
    host: 'b',
  },
] as const

export const ReposValidation = z.array(
  z.object({
    id: z.number(),
    url: z.string().url(),
    name: z.string(),
  })
)
//#endregion

const GITHUB_BASE = 'https://api.github.com' as const

export const FETCH_ROUTES = {
  GET_REPOS: `${GITHUB_BASE}/users/${owner}/repos`,
} as const
