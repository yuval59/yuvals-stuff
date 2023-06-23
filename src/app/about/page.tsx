import { Navbar } from '../components'
import AboutContent from './content'

const AboutPage = () => (
  <div className="container-flex bg-blue-950 h-full min-h-screen overflow-hidden">
    <Navbar />

    <AboutContent />
  </div>
)

export default AboutPage
