import { InferModel } from 'drizzle-orm'
import { mysqlTable, serial, text, varchar } from 'drizzle-orm/mysql-core'

export const projects = mysqlTable('projects', {
  id: serial('id').autoincrement().primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  host: varchar('host', { length: 1024 }).notNull(),
  github_url: varchar('github_url', { length: 1024 }).notNull(),
  description: text('description'),
})

export type Project = InferModel<typeof projects>
export type NewProject = InferModel<typeof projects, 'insert'>
