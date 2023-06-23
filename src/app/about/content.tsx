import { PictureCarousel } from './pictures'

const aboutInfo = ''

const AboutContent = () => (
  <div className="grid grid-cols-4">
    <PictureCarousel />
    <div className="bg-gray-50 w-full h-full col-span-3"></div>
  </div>
)

export default AboutContent
