import { ROUTES } from '@/constants'
import { Navbar } from '../components'
import { PictureCarousel } from './pictures'

const header = <p className="text-center text-xl font-semibold">About me</p>

const content = (
  <p className="row-span-3 text-lg">
    My name is Yuval Maron.
    <br />
    I am an enthusiastic Fullstack/Backend developer, experienced with many
    technologies. <br />
    I&apos;m 23, and have been programming professionally for about 4 years now.
    <br />
    I&apos;ve worked with both Angular and React (with the pages model and the
    newer app router model), mainly using Next. On the backend I&apos;ve used
    NodeJS almost exclusively utilizing TypeScript, using a variety of databases
    - MySQL, MongoDB, PostgreSQL, etc. <br />I have experience deploying to AWS
    and Microsoft&apos;s Azure, though most recently I&apos;ve worked with
    Google&apos;s &quot;Cloud services&quot;. <br />
    Familiar with Docker and K8s. <br />
  </p>
)

const AboutPage = async () => (
  <div className="container-flex bg-blue-950 h-full min-h-screen overflow-hidden">
    <Navbar page={ROUTES.ABOUT} />

    <div className="grid grid-cols-4">
      <PictureCarousel />

      <div className="w-full h-full col-span-3 grid grid-rows-4 p-8">
        {header}
        {content}
      </div>
    </div>
  </div>
)

export default AboutPage
