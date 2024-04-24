'use client'

import { useState } from 'react'
import { ProjectSelectorButton } from '../buttons'
import { ProjectInfoContainer } from './info'
import { ProjectContainerProps } from './types'

export const ProjectsContainer = (props: ProjectContainerProps) => {
  const { projects } = props

  const [selected, setSelected] = useState(projects[0])

  const selectorButtons = projects.map((project) => (
    <ProjectSelectorButton
      key={project.id}
      params={{
        project,
        setSelected,
      }}
    />
  ))

  return (
    <div>
      <div className='rounded-xl p-8 m-8 justify-around flex bg-slate-900'>
        {selectorButtons}
      </div>
      (
      <div className='rounded-xl p-8 m-8 bg-slate-900'>
        {!selected || <ProjectInfoContainer project={selected} />}

        <iframe
          src={selected?.host}
          className='rounded-xl w-full h-full min-h-[45vh]'
        />
      </div>
      )
    </div>
  )
}
