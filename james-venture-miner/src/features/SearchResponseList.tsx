'use client'

import cx from 'classnames'
import Link from 'next/link'
import Image from 'next/image'

import { useFormStatus } from 'react-dom'

import { IQuickSearchResponse, ISearchForm } from './SearchForm'
import { IQuickSearchResult } from '@/types/eth.stat'
import { analyzeQuickSearchResponse } from '@/utils/eth'

import {
  ArrowsRightLeftIcon,
  CubeTransparentIcon,
  UserCircleIcon,
  WalletIcon,
} from '@heroicons/react/24/outline'


export default function SearchResponseList({
  size,
  results,
}: ISearchForm & IQuickSearchResponse) {
  const { pending } = useFormStatus()

  if (pending || results?.length) {
    return (
      <ul
        data-testid="quick-search-result-wrapper"
        className={cx(
          'invisible opacity-0 peer-focus:visible peer-focus:opacity-100 transition-all duration-200 absolute w-full rounded-b-md bg-dark-bg border border-primary-border p-2 z-10 shadow-primary-card',
          size === 'sm' ? 'top-[34px]' : 'top-10'
        )}
      >
        {pending && (
          <li className="px-4 py-3 text-center text-sm">Searching...</li>
        )}
        {!pending &&
          results?.map((item: IQuickSearchResult, index) => {
            const data = analyzeQuickSearchResponse(item)

            return (
              <li
                className="group truncate flex flex-col mb-1 last:mb-0"
                key={data.uniqueKey}
              >
                <span className="text-sm font-medium px-3 pb-1 pt-2 group-first:pt-1 border-t border-t-primary-border group-first:border-t-0 uppercase">
                  {data.type}
                </span>
                <Link
                  href={data.generatedHref}
                  className="text-white cursor-pointer text-xs  py-2 transition-all duration-150 hover:bg-primary-border rounded px-3 flex justify-between items-center gap-x-4"
                  data-testid={`quick-search-result-${index}`}
                >
                  <span className="flex items-center gap-x-1">
                    <SearchResponseItemAvatar {...data} />
                    {data?.display}
                  </span>
                  <span className="truncate">{data.moreDetail}</span>
                </Link>
              </li>
            )
          })}
      </ul>
    )
  }

  return null
}

function SearchResponseItemAvatar(props: any) {
  if (props.type === 'block') {
    return <CubeTransparentIcon className="w-4 h-4" />
  }
  if (props.type === 'transaction') {
    return <ArrowsRightLeftIcon className="w-4 h-4" />
  }
  if (props.type === 'token') {
    return props.icon_url ? (
      <Image
        width={16}
        height={16}
        alt={props.symbol}
        src={props.icon_url}
        className="w-4 h-4"
        quality={100}
        draggable={false}
      />
    ) : (
      <div className="w-4 h-4 rounded-full leading-4 text-center bg-primary">
        {props?.symbol.slice(0, 1)}
      </div>
    )
  }

  if (props.type === 'address') {
    return <UserCircleIcon className="w-4 h-4" />
  }

  return <WalletIcon className="w-4 h-4" />
}
