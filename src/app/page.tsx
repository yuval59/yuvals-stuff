import '@total-typescript/ts-reset'

import { FETCH_ROUTES, ReposValidation, projectData } from '@/constants'
import ProjectContainer from './components/container'

const validateProjects = (repos: unknown) => {
  try {
    return ReposValidation.parse(repos)
      .map((project) => {
        const data = projectData.find((data) => data.name == project.name)
        if (!data) return

        return {
          ...project,
          name: data.name,
          host: data.host,
        }
      })
      .filter(Boolean)
  } catch {
    return []
  }
}

const getProjects = async () => {
  const res = await fetch(FETCH_ROUTES.GET_REPOS)

  // This will activate the closest `error.js` Error Boundary
  if (!res.ok) throw new Error('Failed to fetch data')

  return validateProjects(await res.json())
}

const HomePage = async () => {
  const projects = await getProjects()

  return (
    <div className="container-flex">
      <ProjectContainer projects={projects} />
    </div>
  )
}

export default HomePage
