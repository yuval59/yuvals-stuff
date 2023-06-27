import { ProjectSelectorButtonProps } from './types'

const ProjectSelectorButton = (props: ProjectSelectorButtonProps) => {
  const { project, setSelected } = props.params

  return (
    <button
      key={project.id}
      className="px-5 py-3 rounded-full font-semibold bg-sky-500 hover:bg-sky-500/80 focus:ring"
      onClick={() => setSelected(project)}
    >
      {project.name}
    </button>
  )
}

export default ProjectSelectorButton
