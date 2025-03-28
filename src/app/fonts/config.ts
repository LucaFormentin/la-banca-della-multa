import localFont from 'next/font/local'
import { Inter, Roboto } from 'next/font/google'

const geistSans = localFont({
  src: './GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})

const geistMono = localFont({
  src: './GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

const inter = Inter({ subsets: ['latin'] })

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export { geistSans, geistMono, inter, roboto }
