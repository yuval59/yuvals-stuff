import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    DB_HOST: z.string(),
    DB_USER: z.string(),
    DB_PASS: z.string(),
  },
  client: {},
  runtimeEnv: {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
  },
})
