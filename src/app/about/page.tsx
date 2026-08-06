import { ROUTES } from '@/app'
import { Navbar, PictureCarousel } from '@/components'

const hackersLink = (
  <a
    href='https://www.imdb.com/title/tt0113243/'
    className='text-blue-500 hover:underline'
    rel='noopener noreferrer'
    target='_blank'
  >
    {' '}
    hacker movie
  </a>
)

const brainfuckLink = (
  <a
    href='https://github.com/yuval59/ts-brainf-k'
    className='text-blue-500 hover:underline'
    rel='noopener noreferrer'
    target='_blank'
  >
    check out my Brainfuck implementation
  </a>
)

const opensourceLink = (
  <a
    href='https://github.com/samuelmarina/is-even'
    className='text-blue-500 hover:underline'
    rel='noopener noreferrer'
    target='_blank'
  >
    is-even
  </a>
)

const link = (href: string, text: string) => (
  <a
    href={href}
    className='text-blue-500 hover:underline'
    rel='noopener noreferrer'
    target='_blank'
  >
    {text}
  </a>
)

const bunLink = link('https://github.com/oven-sh/bun', 'Bun')
const drizzleLink = link(
  'https://github.com/drizzle-team/drizzle-orm',
  'Drizzle ORM'
)
const redisLink = link('https://github.com/redis/redis', 'Redis')
const whatsappLink = link(
  'https://github.com/pedroslopez/whatsapp-web.js',
  'whatsapp-web.js'
)

const content = (
  <p className='row-span-3 text-lg text-white'>
    Hi there!
    <br />
    My name is Yuval Maron, and I&apos;m a Senior Backend Engineer with over 7
    years of experience building scalable, reliable systems from concept to
    deployment.
    <br />
    Most recently I spent a year and a half at Airobotics, where I architected a
    Command and Control system from the ground up, built a Built-In Test
    framework for health monitoring and fault detection, and set up the CI/CD
    pipeline that automated build, test and deployment.
    <br />
    Before that I spent nearly four years at Multix as a fullstack developer,
    integrating enterprise APIs for telecom providers like Yes, Cellcom and HOT,
    leading projects from conception to delivery, and keeping high-availability
    production systems healthy.
    <br />
    These days I write mostly TypeScript, Python and SQL - React and Angular on
    the frontend, NodeJS and GraphQL on the backend, with AWS, Docker, Git and a
    CI/CD pipeline holding it together. Databases are usually MongoDB or SQL.
    <br />
    <br />
    I&apos;d started learning how to code at the age of 10, following a
    {hackersLink}, and although it wasn&apos;t anything like I imagined I simply
    fell in love with it.
    <br />
    The first language I learned was C#, and later Python.
    <br />
    When I finished high-school I started working at SculptrVR, a company based
    in the U.S making video games - I was optimizing their voxel engine in
    Unreal Engine 4 and C++, which ended up winning more than 30% in frame-rates
    across platforms.
    <br />
    After that, I&apos;d briefly worked at Yes, and then started doing fullstack
    work in Nahariyya, which is when I learned JS and fell in love with the
    language.
    <br />
    <br />
    In my free time I like to program passion projects ({brainfuckLink}) and
    contribute to open-source ones - a crash in {bunLink} when reading very
    large files, the nested-object typing in {drizzleLink} (which prompted a
    TypeScript bugfix of its own), a {redisLink} bug where SETUSER did not
    revert to true defaults, and a few Puppeteer crashes in {whatsappLink}.
    <br />
    {'Also, obviously, the best open-source project there is, '}
    {opensourceLink}
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
  <div className='container-flex bg-blue-950 h-full min-h-screen overflow-hidden'>
    <Navbar page={ROUTES.ABOUT} />

    <div className='grid grid-cols-4'>
      <PictureCarousel />

      <div className='w-full h-full col-span-3 grid grid-rows-4 p-8'>
        {content}
      </div>
    </div>
  </div>
)

export default AboutPage
