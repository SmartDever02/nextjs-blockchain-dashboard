import QuestionMarkCircleIcon from '@heroicons/react/24/outline/QuestionMarkCircleIcon'
import cx from 'classnames'
import type { PropsWithChildren } from 'react'

interface CardContainer extends PropsWithChildren {
  className?: string
}

export function DetailViewCardContainer(props: CardContainer) {
  return (
    <section className={cx("bg-card-bg border border-primary-border shadow-primary-card p-5 rounded-lg", props.className)}>
      {props.children}
    </section>
  )
}


export function BlockDetailListTitle(props: PropsWithChildren) {
  return <div className="sm:w-1/4 text-gray-bb flex items-center gap-x-1">
    <QuestionMarkCircleIcon className='w-4 h-4' />
    {props.children}</div>
}

export function BlockDetailListDivider() {
  return (
    <li>
      <hr className="border-primary-border w-full" />
    </li>
  )
}

export function BlockDetailListItemWrapper(props: PropsWithChildren) {
  return <li className="max-sm:flex-col gap-y-1">{props.children}</li>
}

export function BlockDetailListItemValueWrapper(props: PropsWithChildren) {
  return <div className="sm:w-3/4 break-words">{props.children}</div>
}
