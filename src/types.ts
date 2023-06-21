import { z } from 'zod'
import { projectData, ReposValidation } from './constants'

//#region GitHub types
export type RepositoryData = (typeof projectData)[number]
export type RepositoryNames = RepositoryData['name']
export type RepositoryHosts = RepositoryData['host']
//#endregion

//#region Util types
export type IncludeProjectName = { name: RepositoryNames }
export type IncludeProjectHost = { host: RepositoryHosts }
export type IncludeProjectId = { id: number }
export type IncludeProjectUrl = { url: string }
//#endregion
