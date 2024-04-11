'use client'

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'
import type { PropsWithChildren } from 'react'

export default function ClientProvider(props: PropsWithChildren) {
  return (
    <>
      {props.children}
      <ProgressBar
        height="4px"
        color="#fff"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  )
}
