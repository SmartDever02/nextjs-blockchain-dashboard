'use client' // Error components must be Client Components

import ErrorResetButton from '@/features/Error.Reset'
import ReturnHomeLink from '@/features/ReturnHomeLink'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <main className="flex flex-col gap-y-20 items-center justify-center min-h-screen">
      <h2 className="text-2xl font-semibold">Oops! Something went wrong</h2>

      <div className="flex gap-x-2">
        <ErrorResetButton reset={reset} />
        <ReturnHomeLink />
      </div>
    </main>
  )
}
