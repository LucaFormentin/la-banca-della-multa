import type { Metadata } from 'next'
import './globals.css'
import { inter } from './fonts/config'
import AppProvider from './providers/app-provider'
import { getAuthenticatedAppForUser } from '@/lib/firebase/server-app'
import { AuthContextProvider } from './context/auth-context'

export const metadata: Metadata = {
  title: 'La Banca della Multa',
  description: 'Gestisci le multe della tua squadra.',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { currentUser } = await getAuthenticatedAppForUser()

  return (
    <html lang='en'>
      <body className={`${inter.className} antialiased`}>
        <AppProvider>
          <AuthContextProvider initialUser={currentUser}>
            {children}
          </AuthContextProvider>
        </AppProvider>
      </body>
    </html>
  )
}
