import Head from 'next/head'
import type { AppPropsWithLayout } from '@/types/layout'
//import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'
import theme from '@/theme'
import createEmotionCache from '@/createEmotionCache'

import { Amplify } from 'aws-amplify'
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import Layout from '@/layouts/default'
import awsconfig from '@/aws-exports'

Amplify.configure(awsconfig)

const clientSideEmotionCache = createEmotionCache()
interface MyAppProps extends AppPropsWithLayout {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  const getLayout = Component.getLayout || ((page) => page)
  return getLayout(
    <Authenticator hideSignUp={true} loginMechanisms={['email']}>
      {() => (
        <Layout>
          <CacheProvider value={emotionCache}>
            <Head>
              <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Component {...pageProps} />
            </ThemeProvider>
          </CacheProvider>
        </Layout>
      )}
    </Authenticator>
  )
}

export default MyApp
