import Image from 'next/image';
import Link from 'next/link'
import notFoundImage from '../../public/notfound.webp'

export default function NotFound() {
  return (
    <main className='flex flex-col items-center justify-center min-h-screen gap-y-14'>
      <Image draggable={false} quality={100} src={notFoundImage} alt="not found" className='w-2/3 lg:w-1/3 select-none' />
      <Link href="/" className='text-xl font-medium hover:bg-white/20 rounded-lg text-white px-6 py-2 transition-all duration-150'>Return Home</Link>
    </main>
  )
}
