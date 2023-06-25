import '@total-typescript/ts-reset'

import { FETCH_ROUTES, ROUTES, projectData } from '@/constants'
import { z } from 'zod'
import { Navbar } from '../components'
import { ProjectsContainer } from './containers'

const GitHubResponseShape = z
  .object({
    id: z.number(),
    private: z.boolean(),

    html_url: z.string().url(),

    name: z.string(),
    description: z.string().nullable(),
  })
  .array()

const validateProjects = (repos: unknown) => {
  try {
    return GitHubResponseShape.parse(repos)
      .map((project) => {
        const data = projectData.find(({ name }) => project.name == name)

        if (!data || project.private) return

        return {
          ...project,
          url: project.html_url,
          name: data.name,
          host: data.host,
        }
      })
      .filter(Boolean)
  } catch (err) {
    return []
  }
}

const getProjects = async () => {
  const res = await fetch(FETCH_ROUTES.GET_REPOS)

  // This will activate the closest `error.js` Error Boundary
  if (!res.ok) throw new Error('Failed to fetch data')

  return validateProjects(await res.json())
}

const ProjectsPage = async () => {
  const projects = await getProjects()

  return (
    <div className="container-flex bg-blue-950 h-full min-h-screen overflow-hidden">
      <Navbar page={ROUTES.PROJECTS} />

      <ProjectsContainer projects={projects} />
    </div>
  )
}

export default ProjectsPage
