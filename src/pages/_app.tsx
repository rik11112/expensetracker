import '@styles/globals.scss'
import type { AppProps } from 'next/app'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { fredoka } from '@styles/fonts'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Navbar from '@src/components/Navbar'


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false, // default: true
        },
    },
})
config.autoAddCss = false

export default function App({ Component, pageProps }: AppProps) {
    return (
        <div className={`${fredoka.variable}`}>
            <QueryClientProvider client={queryClient}>
                <Hydrate state={pageProps.dehydratedState}>
                    <>{Component && <Component {...pageProps} />}</>
                </Hydrate>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </div>
    )
}
