import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ClientProvider from './provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Venture Miner',
  description:
    'Explore and search the blockchain for transactions, addresses, tokens, prices and other activities taking place',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  )
}
