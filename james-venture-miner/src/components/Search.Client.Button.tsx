'use client'

import { useFormStatus } from 'react-dom'

import { ArrowPathIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function SearchSubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button disabled={pending} className="bg-primary hover:bg-blue-400 disabled:bg-blue-200 transition-all duration-200 rounded-md w-8 h-8 aspect-square flex items-center justify-center">
      {pending ? (
        <ArrowPathIcon className="w-5 h-5 animate-spin" />
      ) : (
        <MagnifyingGlassIcon className="w-5 h-5" />
      )}
    </button>
  )
}