import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { UIProvider } from '../context/ui';



function MyApp({ Component, pageProps }: AppProps) {


    return (
        <UIProvider>
            <Component {...pageProps} />
        </UIProvider>
    )
}

// MyApp.getInitialProps = async (appContext: AppContext) => {

//     const cookies = appContext.ctx.req ? (appContext.ctx.req as any).cookies : { theme: 'light' }
//     const { 'master-theme-cookie': theme = 'light', name = 'No name' } = cookies

//     const validThemes = ['light', 'dark', 'custom']

//     console.log(cookies);

//     return {
//         theme: validThemes.includes(theme) ? theme : 'dark',
//     }
// }

export default MyApp
