import { HomeIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import type { PropsWithChildren } from 'react'

export default function ReturnHomeLink(props: PropsWithChildren) {
  return (
    <Link
      href="/"
      className="w-fit flex items-center gap-x-2 text-xl font-medium hover:bg-white/70 rounded-lg text-white hover:text-dark-bg px-6 py-2 transition-all duration-150"
      data-testid="return-home-link"
    >
      {props.children || (
        <>
          <HomeIcon className="w-5 h-5" /> Return Home
        </>
      )}
    </Link>
  )
}
