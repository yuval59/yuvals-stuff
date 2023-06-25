import { ROUTES } from '@/constants'
import '@total-typescript/ts-reset'
import { Navbar } from './components'

const HomePage = async () => {
  return (
    <div className="container-flex bg-blue-950 h-full min-h-screen overflow-hidden">
      <Navbar page={ROUTES.HOME} />
    </div>
  )
}

export default HomePage
