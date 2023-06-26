import { env } from '@/env.mjs'
import { connect } from '@planetscale/database'
import { drizzle } from 'drizzle-orm/planetscale-serverless'
import { NewProject, Project, projects } from './schemas'

const connection = connect({
  host: env.DB_HOST,
  username: env.DB_USER,
  password: env.DB_PASS,
})

const db = drizzle(connection)

export const getProjects = async (): Promise<Project[]> =>
  db.select().from(projects)

export const insertProject = async (params: NewProject) =>
  db.insert(projects).values(params)
