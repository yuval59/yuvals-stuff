'use client'

import { projectData } from '@/constants'
import { useState } from 'react'
import ProjectSelector from './selector'
import { ProjectContainerProps } from './types'

const ProjectContainer = (props: ProjectContainerProps) => {
  const [projects, setProjects] = useState(props.projects)
  const [selected, setSelected] = useState('')

  return (
    <div>
      <div className="relative rounded-xl overflow-auto p-8 justify-around flex">
        {projects.map(({ id, name, url, host }) => {
          const project = {
            id,
            name,
            url,
            host,
          }

          // @ts-ignore
          return (
            <ProjectSelector
              key={id}
              project={project}
              setSelected={setSelected}
            />
          )
        })}
      </div>
      <div className="relative rounded-xl overflow-auto p-8 justify-around flex">
        <h1>{selected}</h1>
      </div>
    </div>
  )
}

export default ProjectContainer
