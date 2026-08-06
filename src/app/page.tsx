import { ROUTES, thisRepo } from '@/app'
import { HeightmapBackground, HideableText, Navbar } from '@/components'

const header = (
    <p className='text-center text-xl font-semibold text-white'>
        So, what is this website?
    </p>
)

const content = (
    <p className='row-span-3 p-8 m-8 text-center text-white'>
        A place to link my socials. <br />A place to showcase my projects (The
        ones with a frontend, anyways). <br />
        A justification for me buying this domain. <br />
        <a
            href={thisRepo}
            className='text-blue-500 hover:underline'
            rel='noopener noreferrer'
            target='_blank'
        >
            Source code
        </a>
    </p>
)

const HomePage = async () => {
    return (
        <div>
            {/* `isolate` keeps the canvas above this background but below the content */}
            <div className='container-flex isolate bg-blue-950 h-full min-h-screen'>
                <HeightmapBackground />

                <Navbar page={ROUTES.HOME} />

                <HideableText>
                    {header}
                    {content}
                </HideableText>
            </div>
        </div>
    )
}

export default HomePage
