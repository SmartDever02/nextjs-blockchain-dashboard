import { cookies } from 'next/headers'
import cx from 'classnames'

import { fetchQuickSearchResult } from '@/services/eth'
import SearchSubmitButton from '@/components/Search.Client.Button'

import { IQuickSearchResult } from '@/types/eth.stat'
import SearchResponseList from './SearchResponseList'

export interface ISearchForm {
  size?: 'sm' | 'lg'
}

export interface IQuickSearchResponse {
  results: Array<IQuickSearchResult>
}

export default async function SearchForm({ size }: ISearchForm) {
  async function quickSearch(formData: FormData) {
    'use server'
    const query = formData.get('query')
    if (!query) {
      return
    }

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
  const data: IQuickSearchResponse = JSON.parse(
    cookieStore.get('quicksearch')?.value || '[]'
  )

  return (
    <form
      data-testid={`quick-search-form-${size}`}
      action={quickSearch}
      className="max-w-[800px] w-full"
    >
      <div
        className={cx(
          'border border-primary-border rounded-lg bg-dark-bg flex gap-x-3 p-2',
          size === 'sm' ? 'h-12' : 'h-14'
        )}
      >
        <label className="relative w-full h-full">
          <input
            autoComplete="off"
            name="query"
            placeholder="Search by Address / Txn Hash / Block / Token / Domain Name"
            className="peer w-full h-full bg-transparent rounded-sm focus:outline-primary-border outline-none transition-all duration-200 px-3 text-sm box-border"
            data-testid="quick-search-input"
          />
          <SearchResponseList size={size} {...data} />
        </label>
        <SearchSubmitButton
          className={size === 'lg' ? 'w-10 h-10' : undefined}
        />
      </div>
    </form>
  )
}
