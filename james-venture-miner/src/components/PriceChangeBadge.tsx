import cx from 'classnames'

interface Props {
  change: number | string
}

export default function PriceChange(props: Props) {
  const __change = Number(props.change)
  const isPositive = __change > 0

  return (
    <span
      className={cx('text-xs', isPositive ? 'text-green-500' : 'text-red-500')}
    >
      {` (${isPositive ? '+' : ''}${__change}%)`}
    </span>
  )
}
