'use client'

import { useFormStatus } from 'react-dom'

import { ArrowPathIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

interface Props {
  className?: string
}

export default function SearchSubmitButton(props: Props) {
  const { pending } = useFormStatus()

  return (
    <button disabled={pending} className={`bg-primary hover:bg-blue-400 disabled:bg-blue-200 transition-all duration-200 rounded-md  aspect-square flex items-center justify-center ${props.className || "w-8 h-8"}`}>
      {pending ? (
        <ArrowPathIcon className="w-5 h-5 animate-spin" />
      ) : (
        <MagnifyingGlassIcon className="w-5 h-5" />
      )}
    </button>
  )
}