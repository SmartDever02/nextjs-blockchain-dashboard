import Link from 'next/link'
import Image from 'next/image'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

interface Props {
  chainName: string
  imageSrc: string
  href: string
  description: string
}

export default function ChainSelectLink(props: Props) {
  return (
    <Link
      href={props.href}
      className="group p-5 shadow-primary-card border border-primary-border rounded-xl hover:border-white/20 transition-all duration-200 text-white flex flex-col gap-y-5 relative"
    >
      <Image
        src={props.imageSrc}
        alt="Ethereum"
        width={120}
        height={120}
        className="absolute bottom-3 right-3 opacity-20 group-hover:opacity-40 transition-all duration-200 w-24 h-24 lg:w-[120px] lg:h-[120px]"
      />

      <h2 className="text-xl font-semibold flex items-center gap-x-2">
        {props.chainName}
        <ArrowRightIcon className="w-6 h-6 stroke-[3px] group-hover:translate-x-1 transition-all duration-200" />
      </h2>

      <p className="text-gray-bb group-hover:text-white text-sm mt-auto max-w-[280px] relative">
        {props.description}
      </p>
    </Link>
  )
}
