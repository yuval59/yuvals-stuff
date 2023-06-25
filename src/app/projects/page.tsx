import { ROUTES } from '@/constants'
import { getProjects } from '@/dal'
import { Navbar } from '../components'
import { ProjectsContainer } from './containers'

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
