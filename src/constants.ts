//#region GitHub constants
const GITHUB_API_BASE = 'https://api.github.com' as const
export const owner = 'yuval59' as const
export const thisRepo = 'https://github.com/yuval59/project-showcase' as const
//#endregion

//#region Projects
export const projectData = [
  {
    name: 'react-vacations',
    host: 'https://react-vacations.vercel.app',
  },
  {
    name: 'project-showcase',
    host: 'b',
  },
] as const
export const projectNames = projectData.map((project) => project.name)
export const projectHosts = projectData.map((project) => project.host)
//#endregion

export const FETCH_ROUTES = {
  GET_REPOS: `${GITHUB_API_BASE}/users/${owner}/repos`,
} as const

export const ROUTES = {
  HOME: '/',
  PROJECTS: '/projects',
  ABOUT: '/about',
} as const

export const LINKS = {
  LINKEDIN: 'https://www.linkedin.com/in/yuvalmaron',
  GITHUB: 'https://github.com/yuval59',
} as const
