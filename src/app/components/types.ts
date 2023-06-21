import {
  IncludeProjectHost,
  IncludeProjectId,
  IncludeProjectName,
  IncludeProjectUrl,
  RepositoryHosts,
} from '@/types'

export type ProjectSelectorProps = {
  project: IncludeProjectHost & IncludeProjectName
  setSelected: (host: RepositoryHosts) => void
}

export type ProjectContainerProps = {
  projects: (IncludeProjectHost &
    IncludeProjectName &
    IncludeProjectId &
    IncludeProjectUrl)[]
}
