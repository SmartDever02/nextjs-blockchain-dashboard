import { ArrowPathRoundedSquareIcon } from '@heroicons/react/24/solid'
import type { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
  reset: () => void
}

export default function ErrorResetButton(props: Props) {
  return (
    <button
      className="w-fit flex items-center gap-x-2 text-xl font-medium hover:bg-white/70 rounded-lg text-white hover:text-dark-bg px-6 py-2 transition-all duration-150 border border-white"
      onClick={
        // Attempt to recover by trying to re-render the segment
        () => props.reset()
      }
    >
      {props.children || (
        <>
          <ArrowPathRoundedSquareIcon className="w-5 h-5" />
          Reset
        </>
      )}
    </button>
  )
}
