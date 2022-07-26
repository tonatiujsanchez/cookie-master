import '../styles/globals.css'
import type { AppContext, AppProps } from 'next/app'
import { CssBaseline, Theme, ThemeProvider } from '@mui/material'
import { lightTheme, darkTheme, customTheme } from '../themes';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';

interface Props extends AppProps {
    theme: string
}

function MyApp({ Component, pageProps, theme }: Props) {
    
    const [currentTheme, setCurrentTheme] = useState(lightTheme)

    useEffect(()=>{
        const cookieTheme = Cookies.get('master-theme-cookie') || 'light'
        
        const selectedTheme = () => {
            switch (cookieTheme) {
                case 'light':
                    return lightTheme
                case 'dark':
                    return darkTheme
                case 'custom':
                    return customTheme
                default:
                    return lightTheme
            }
        }

        setCurrentTheme(selectedTheme())
    },[])

    


    return (
        <ThemeProvider theme={currentTheme}>
            <CssBaseline />
            <Component {...pageProps} />
        </ThemeProvider>
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
