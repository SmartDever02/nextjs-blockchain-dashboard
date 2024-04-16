import Image from 'next/image'

import comingSoonImage from '../../public/coming-soon.webp'
import ReturnHomeLink from './ReturnHomeLink'

export default function ComingSoon() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center gap-y-14">
      <Image className="invert select-none" src={comingSoonImage} alt="coming soon" quality={100} draggable={false} />
      <ReturnHomeLink />
    </main>
  )
}
