import { ROUTES } from '@/app'
import { Navbar, PictureCarousel } from '../components'

const hackersLink = (
  <a
    href="https://www.imdb.com/title/tt0113243/"
    className="text-blue-500 hover:underline"
    rel="noopener noreferrer"
    target="_blank"
  >
    {' '}
    hacker movie
  </a>
)

const brainfuckLink = (
  <a
    href="https://github.com/yuval59/ts-brainf-k"
    className="text-blue-500 hover:underline"
    rel="noopener noreferrer"
    target="_blank"
  >
    check out my Brainfuck implementation
  </a>
)

const opensourceLink = (
  <a
    href="https://github.com/samuelmarina/is-even"
    className="text-blue-500 hover:underline"
    rel="noopener noreferrer"
    target="_blank"
  >
    is-even
  </a>
)

const content = (
  <p className="row-span-3 text-lg text-white">
    Hi there!
    <br />
    My name is Yuval Maron, and I&apos;m an enthusiastic Fullstack/Backend
    developer, experienced with many technologies.
    <br />
    I&apos;m 23, and have been programming professionally for about 4 years now.
    <br />
    I&apos;ve worked with both Angular and React (with the pages model and the
    newer app router model), mainly using Next. On the backend I&apos;ve used
    NodeJS almost exclusively utilizing TypeScript, using a variety of databases
    - MySQL, MongoDB, PostgreSQL, etc.
    <br />
    I have experience deploying to AWS and Microsoft&apos;s Azure, though most
    recently I&apos;ve worked with Google&apos;s &quot;Cloud services&quot;.
    <br />
    Familiar with Docker and K8s.
    <br />
    <br />
    I&apos;d started learning how to code at the age of 10, following a
    {hackersLink}, and although it wasn&apos;t anything like I imagined I simply
    fell in love with it.
    <br />
    The first language I learned was C#, and later Python.
    <br />
    When I finished high-school I started working with a company based in the
    U.S making video games - I was doing rendering optimization using C++.
    <br />
    After that, I&apos;d briefly worked at Yes, and then started doing fullstack
    work in Nahariyya, which is when I learned JS and fell in love with the
    language.
    <br />
    <br />
    In my free time I like to program passion projects ({brainfuckLink}) and
    contributing to open-source projects (
    {'check out the best open-source project, '}
    {opensourceLink}
    )
    <br />
    Sometimes I climb, sometimes I play video games, I love reading and I just
    cannot get enough of learning - anything at all
    <br />
    I&apos;m usually home with my snake and my cat, or hanging out with my
    friends (probably eating something new)
    <br />
  </p>
)

const AboutPage = async () => (
  <div className="container-flex bg-blue-950 h-full min-h-screen overflow-hidden">
    <Navbar page={ROUTES.ABOUT} />

    <div className="grid grid-cols-4">
      <PictureCarousel />

      <div className="w-full h-full col-span-3 grid grid-rows-4 p-8">
        {content}
      </div>
    </div>
  </div>
)

export default AboutPage
