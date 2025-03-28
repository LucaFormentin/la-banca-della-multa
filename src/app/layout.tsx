import type { Metadata } from 'next'
import './globals.css'
import { inter } from './fonts/config'
import AppProvider from './providers/app-provider'

export const metadata: Metadata = {
  title: 'La Banca della Multa',
  description: 'Gestisci le multe della tua squadra.',
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
