import '@/styles/global.css'
import '@/styles/base.css'
import '@/styles/tailwindcss.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
