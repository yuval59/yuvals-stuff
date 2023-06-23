import { Project } from '@/types'

export type ProjectSelectorButtonProps = {
  params: {
    project: Project
    setSelected: (project: Project) => void
  }
}
