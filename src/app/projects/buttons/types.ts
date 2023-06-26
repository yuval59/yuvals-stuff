import { Project } from '@/app'

export type ProjectSelectorButtonProps = {
  params: {
    project: Project
    setSelected: (project: Project) => void
  }
}
