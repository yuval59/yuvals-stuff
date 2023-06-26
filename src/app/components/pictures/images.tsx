import Image from 'next/image'

const images = [
  <Image
    key={0}
    src="/me/IMG_20191222_163239.jpg"
    alt="A selfie of Yuval in a bus stop"
    style={{ objectFit: 'contain' }}
    fill
    priority
  />,

  <Image
    key={0}
    src="/me/IMG_20210514_174845.jpg"
    alt="A selfie of Yuval with his brother"
    style={{ objectFit: 'contain' }}
    fill
    priority
  />,

  <Image
    key={0}
    src="/me/IMG_20210805_070640.jpg"
    alt="A selfie of yuval with his dog at a bus stop"
    style={{ objectFit: 'contain' }}
    fill
    priority
  />,

  <Image
    key={0}
    src="/me/IMG_20221102_154422.jpg"
    alt="A silly picture of Yuval and a friend cooking"
    style={{ objectFit: 'contain' }}
    fill
    priority
  />,

  <Image
    key={0}
    src="/me/IMG_20230131_164314.jpg"
    alt="A selfie of Yuval with two bearded dragons on his shirt"
    style={{ objectFit: 'contain' }}
    fill
    priority
  />,

  <Image
    key={0}
    src="/me/IMG_20230215_210519_545.JPG"
    alt="A picture of Yuval holding his cat (she is very cute)"
    style={{ objectFit: 'contain' }}
    fill
    priority
  />,

  <Image
    key={0}
    src="/me/IMG_20230220_111732.jpg"
    alt="A selfie of Yuval at a random street"
    style={{ objectFit: 'contain' }}
    fill
    priority
  />,

  <Image
    key={0}
    src="/me/IMG_20230410_121531.jpg"
    alt="A picture of Yuval in an elevator, filmed through a mirror"
    style={{ objectFit: 'contain' }}
    fill
    priority
  />,
]

export default images
