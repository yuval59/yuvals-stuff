import { projectData } from './constants'

//#region Project types
export type ProjectData = (typeof projectData)[number]
export type ProjectNames = ProjectData['name']
export type ProjectHosts = ProjectData['host']
//#endregion

export type Project = {
  name: ProjectNames
  host: ProjectHosts
  id: number
  url: string
  description: string | null
}
