import Link from 'next/link'

interface PropsType {
  cardHeading: string
  items: any[]
  renderRow: (item: any) => React.ReactNode
  viewAll: {
    text: string;
    href: string;
  }
}

export default function CardList({ cardHeading, items, renderRow, viewAll }: PropsType) {
  return (
    <section className="shadow-primary-card border border-primary-border rounded-lg">
      <p className="p-4 text-sm font-normal border-b border-b-primary-border">
        {cardHeading}
      </p>
      <ol className="p-4 *:py-[14px] *:border-b *:border-b-primary-border border-b border-primary-border max-h-[30rem] overflow-auto">
        {items.map((item: any) => renderRow(item))}
      </ol>
      <Link
        href={viewAll.href}
        className="uppercase py-4 flex justify-center text-gray-bb hover:text-link-hover transition-all duration-150 text-xs font-medium"
      >
        {viewAll.text}
      </Link>
    </section>
  )
}
