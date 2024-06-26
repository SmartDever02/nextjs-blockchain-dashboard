import Link from 'next/link'
import { PropsWithChildren } from 'react'

interface PropsType {
  cardHeading: string
  items: any[]
  renderRow: (item: any) => React.ReactNode
  viewAll: {
    text: string
    href: string
  }
}

export default function CardList({
  cardHeading,
  items,
  renderRow,
  viewAll,
}: PropsType) {
  return (
    <CardWrapper>
      <p className="p-4 text-sm font-normal border-b border-b-primary-border">
        {cardHeading}
      </p>
      <ol className="p-4 *:py-[14px] *:border-b *:border-b-primary-border border-b border-primary-border sm:max-h-[30rem] overflow-auto">
        {items.map((item: any) => renderRow(item))}
      </ol>
      <Link
        href={viewAll.href}
        className="uppercase py-4 flex justify-center text-gray-bb hover:text-link-hover transition-all duration-150 text-xs font-medium"
      >
        {viewAll.text}
      </Link>
    </CardWrapper>
  )
}

interface Props extends PropsWithChildren {
  className?: string
}

export function CardWrapper(props: Props) {
  return (
    <section className={"shadow-primary-card border border-primary-border rounded-lg " + props.className}>
      {props.children}
    </section>
  )
}
