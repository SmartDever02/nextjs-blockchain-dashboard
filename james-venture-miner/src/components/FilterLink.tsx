import Link from 'next/link';
import cx from 'classnames'

interface Props {
  href: string;
  isCurrentFilter: boolean;
  children: React.ReactNode;
}

export default function FilterLink({href, isCurrentFilter = false, children}: Props) {
  return (
    <Link
      href={href}
      className={cx("text-white px-4 py-2 rounded-md transition-all duration-200", isCurrentFilter ? "bg-white/10": "")}
    >
      {children}
    </Link>
  )
}
