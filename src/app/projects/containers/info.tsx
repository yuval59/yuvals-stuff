import Image from 'next/image'
import Link from 'next/link'
import { ProjectInfoContainerProps } from './types'

export const ProjectInfoContainer = (props: ProjectInfoContainerProps) => {
  const { project } = props

  return (
    <div className="rounded-xl p-4 mb-4 grid grid-rows-2 gap-4">
      <div className="flex flex-row">
        <p className="rounded-xl p-2 bg-slate-800 text-center text-xl text-white font-semibold w-full">
          {project.name}
        </p>

        <div className="rounded-xl p-2 ml-8 justify-end align-top">
          <div className="relative w-16 h-16">
            <Link
              href={project.github_url}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Image src="/github-mark-white.svg" alt="The GitHub logo" fill />
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-row">
        <p className="text-md text-center text-white rounded-xl p-2 bg-slate-800 w-full">
          {project.description}
        </p>

        <div className="rounded-xl p-2 ml-8 justify-end align-top">
          <div className="relative w-16 h-16">
            <Link href={project.host} rel="noopener noreferrer" target="_blank">
              <Image src="/open_white.png" alt="Open in new window" fill />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
