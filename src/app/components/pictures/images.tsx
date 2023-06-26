import {
  IMG_20191222_163239,
  IMG_20210514_174845,
  IMG_20210805_070640,
  IMG_20221102_154422,
  IMG_20230131_164314,
  IMG_20230215_210519_545,
  IMG_20230220_111732,
  IMG_20230410_121531,
} from '@/app'
import Image from 'next/image'

const images = [
  <Image
    key={0}
    src={IMG_20191222_163239}
    alt="A selfie of Yuval in a bus stop"
    style={{ objectFit: 'contain' }}
    fill
    priority
  />,
  <Image
    key={0}
    src={IMG_20210514_174845}
    alt="A selfie of Yuval with his brother"
    style={{ objectFit: 'contain' }}
    fill
    priority
  />,
  <Image
    key={0}
    src={IMG_20210805_070640}
    alt="A selfie of yuval with his dog in a bus stop"
    style={{ objectFit: 'contain' }}
    fill
    priority
  />,
  <Image
    key={0}
    src={IMG_20221102_154422}
    alt="A silly picture of Yuval and a friend cooking"
    style={{ objectFit: 'contain' }}
    fill
    priority
  />,
  <Image
    key={0}
    src={IMG_20230131_164314}
    alt="A selfie of Yuval with two bearded dragons on his shirt"
    style={{ objectFit: 'contain' }}
    fill
    priority
  />,
  <Image
    key={0}
    src={IMG_20230215_210519_545}
    alt="A picture of Yuval holding his cat (she is very cute)"
    style={{ objectFit: 'contain' }}
    fill
    priority
  />,
  <Image
    key={0}
    src={IMG_20230220_111732}
    alt="A selfie of Yuval at a random street"
    style={{ objectFit: 'contain' }}
    fill
    priority
  />,
  <Image
    key={0}
    src={IMG_20230410_121531}
    alt="A picture of Yuval in an elevator, filmed through a mirror"
    style={{ objectFit: 'contain' }}
    fill
    priority
  />,
]

export default images
