import { ROUTES } from '@/app'
import { Navbar, ProjectsContainer } from '@/components'
import { getProjects } from '@/dal'

const ProjectsPage = async () => {
  const projects = await getProjects()

  return (
    <div className='container-flex bg-blue-950 h-full min-h-screen overflow-hidden'>
      <Navbar page={ROUTES.PROJECTS} />

      <ProjectsContainer projects={projects} />
    </div>
  )
}

export default ProjectsPage
