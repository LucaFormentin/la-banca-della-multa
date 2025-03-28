import type { Metadata } from 'next'
import './globals.css'
import { geistMono, geistSans, inter } from './fonts/config'
import AppProvider from './providers/app-provider'

export const metadata: Metadata = {
  title: 'NextJS Starter',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.className} antialiased`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}
