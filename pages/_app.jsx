import { SessionProvider } from 'next-auth/react'
import 'tailwindcss/tailwind.css'
import '../styles/animations.css'
import Header from '../components/Header'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <Header />
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp
