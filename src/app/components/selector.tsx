'use client'

import { ProjectSelectorProps } from './types'

const buttonClass =
  'bg-sky-500 hover:bg-sky-700 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white'

const ProjectSelector = (props: ProjectSelectorProps) => {
  const {
    project: { host, name },
    setSelected,
  } = props

  return (
    <button className={buttonClass} onClick={() => setSelected(host)}>
      {name}
    </button>
  )

  // repoData[id as RepoIdsValues].host
}

export default ProjectSelector
