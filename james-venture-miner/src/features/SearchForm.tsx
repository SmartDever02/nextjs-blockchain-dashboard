import { cookies } from 'next/headers'
import Link from 'next/link'
import Image from 'next/image'

import { fetchQuickSearchResult } from '@/services/eth'
import SearchSubmitButton from '@/components/Search.Client.Button'

import { IQuickSearchResult } from '@/types/eth.stat'
import { analyzeQuickSearchResponse } from '@/utils/eth'
import {
  ArrowsRightLeftIcon,
  CubeTransparentIcon,
  UserCircleIcon,
  WalletIcon,
} from '@heroicons/react/24/outline'

export default async function SearchForm() {
  async function quickSearch(formData: FormData) {
    'use server'
    const query = formData.get('query')
    const results = await fetchQuickSearchResult(String(query))
    const data = {
      query,
      results,
    }

    cookies().set({
      name: 'quicksearch',
      value: JSON.stringify(data),
    })
  }

  const cookieStore = cookies()
  const data: {
    results: Array<IQuickSearchResult>
  } = JSON.parse(cookieStore.get('quicksearch')?.value || '[]')

  return (
    <form action={quickSearch}>
      <div className="h-12 max-w-[800px] w-full border border-primary-border rounded-lg bg-dark-bg flex gap-x-3 p-2">
        <label className="relative w-full h-full">
          <input
            autoComplete="off"
            name="query"
            placeholder="Search by Address / Txn Hash / Block / Token / Domain Name"
            className="peer w-full h-full bg-transparent rounded-sm focus:outline-primary-border outline-none transition-all duration-200 px-3 text-sm box-border"
          />
          {data?.results?.length ? (
            <ul className="invisible opacity-0 peer-focus:visible peer-focus:opacity-100 transition-all duration-200 absolute w-full top-[34px] rounded-b-md bg-dark-bg border border-primary-border p-2 z-10 shadow-primary-card">
              {data?.results?.map((item: IQuickSearchResult) => {
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
          ) : null}
        </label>
        <SearchSubmitButton />
      </div>
    </form>
  )
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
      <Image width={16} height={16} alt={props.symbol} src={props.icon_url} className="w-4 h-4" quality={100} draggable={false} />
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
