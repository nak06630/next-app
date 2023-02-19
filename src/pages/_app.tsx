import { useRouter } from "next/router"
import Head from 'next/head'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'
import theme from '@/theme'
import createEmotionCache from '@/createEmotionCache'
import { RecoilRoot } from 'recoil'
import type { AppPropsWithLayout } from '@/types/layout'
import Layout from '@/layouts/default'
import { Auth } from '@aws-amplify/auth'
import awsconfig from '@/aws-exports'

Auth.configure(awsconfig)
const clientSideEmotionCache = createEmotionCache()
interface MyAppProps extends AppPropsWithLayout {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  const router = useRouter()

  // 認証されていなかったらログアウト
  if (router.route.startsWith("/groups") || router.route.startsWith("/accounts")) {
    Auth.currentAuthenticatedUser().catch(err => router.push('/'))
  }
  const getLayout = router.route.startsWith("/groups") || router.route.startsWith("/accounts")
    ? (page: any) => <RecoilRoot><Layout>{page}</Layout></RecoilRoot>
    : (page: any) => <RecoilRoot>{page}</RecoilRoot>
  return getLayout(
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  )
}

export default MyApp
