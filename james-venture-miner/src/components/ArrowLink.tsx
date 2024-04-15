import Link from 'next/link'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import cx from 'classnames'
import type { PropsWithChildren } from 'react'

interface Props {
  direction: 'left' | 'right'
  href: string
  ariaLabel: string
}

export default function ArrowLink(props: Props) {
  const iconClassName = 'h-3 w-3 sm:h-4 sm:w-4'
  return (
    <Link
      href={props.href}
      aria-label={props.ariaLabel}
      className="bg-primary-border hover:bg-gray-300 transition-all duration-150 rounded w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-white hover:text-black font-bold"
    >
      {props.direction === 'left' && (
        <ChevronLeftIcon className={iconClassName} aria-hidden="true" />
      )}
      {props.direction === 'right' && (
        <ChevronRightIcon className={iconClassName} aria-hidden="true" />
      )}
    </Link>
  )
}

interface BorderedLinkProps extends PropsWithChildren {
  href: string;
  ariaLabel?: string;
  square?: boolean;
}

export function BorderedLink(props: BorderedLinkProps) {
  return (
    <Link
      href={props.href}
      className={cx('rounded py-1 border-primary-border border hover:bg-primary hover:text-white transition-all duration-200', props.square ? 'px-1' : 'px-2')}
      aria-label={props.ariaLabel}
    >
      {props.children}
    </Link>
  )
}
