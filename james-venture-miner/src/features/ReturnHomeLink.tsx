import { HomeIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

export default function ReturnHomeLink() {
  return (
    <Link
      href="/"
      className="w-fit flex items-center gap-x-2 text-xl font-medium hover:bg-white/20 rounded-lg text-white px-6 py-2 transition-all duration-150"
      data-testid='return-home-link'
    >
      <HomeIcon className='w-5 h-5' /> Return Home
    </Link>
  )
}
