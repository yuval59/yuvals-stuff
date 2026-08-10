import { ROUTES, thisRepo } from '@/app'
import { HeightmapBackground, HideableText, Navbar } from '@/components'

const header = (
    <h1 className='text-center text-3xl font-semibold tracking-tight text-white sm:text-4xl'>
        Hi, I&apos;m Yuval.
    </h1>
)

const content = (
    <div className='row-span-3 mx-auto flex max-w-2xl flex-col items-center gap-6 px-6 py-8 text-center'>
        <p className='text-xl font-medium text-white sm:text-2xl'>
            Backend Engineer.
        </p>

        <p className='text-xs uppercase tracking-[0.2em] text-blue-200/80 sm:text-sm'>
            Next.js • TypeScript • Python • Distributed Systems
        </p>

        <div className='h-px w-16 bg-white/15' />

        <p className='max-w-prose text-base leading-relaxed text-slate-300 sm:text-lg'>
            I build reliable backend services, modern web applications, and
            occasionally buy domains I don&apos;t need.
        </p>

        <a
            href={thisRepo}
            className='text-sm font-medium text-blue-400 underline decoration-blue-400/40 underline-offset-4 transition-colors hover:text-blue-300 hover:decoration-blue-300'
            rel='noopener noreferrer'
            target='_blank'
        >
            Source code
        </a>
    </div>
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
