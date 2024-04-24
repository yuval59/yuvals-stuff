import { env } from '@/env.mjs'
import { drizzle } from 'drizzle-orm/mysql2'
import mysql from 'mysql2/promise'
import { NewProject, Project, projects } from './schemas'

const connection = mysql.createPool({
  host: env.DB_HOST,
  port: env.DB_PORT,

  user: env.DB_USER,
  password: env.DB_PASS,

  database: env.DB_DB,
})

const db = drizzle(connection)

export const getProjects = async (): Promise<Project[]> =>
  db.select().from(projects)

export const insertProject = async (params: NewProject) =>
  db.insert(projects).values(params)
