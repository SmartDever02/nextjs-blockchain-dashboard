import Image from 'next/image'
import notFoundImage from '../../public/notfound.webp'
import ReturnHomeLink from '@/features/ReturnHomeLink'

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-y-14">
      <Image
        draggable={false}
        quality={100}
        src={notFoundImage}
        alt="not found"
        className="w-2/3 lg:w-1/3 select-none"
      />
      <ReturnHomeLink />
    </main>
  )
}
