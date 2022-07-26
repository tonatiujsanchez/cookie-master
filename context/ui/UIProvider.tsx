import Cookies from 'js-cookie';
import { FC, useReducer, useEffect, useState, useMemo } from 'react';
import { UIContext, uiReducer } from "./";

import { CssBaseline, Theme, ThemeProvider } from '@mui/material'
import { lightTheme, darkTheme, customTheme } from '../../themes';

interface Props {
    children: JSX.Element
}

export interface UIState {
    theme: string;
}

const UI_INITIAL_STATE: UIState = {
    theme: Cookies.get('master-theme-cookie') || 'light'
}

type TypeTheme = { [key: string]: Theme }


export const UIProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)

    const [currentTheme, setCurrentTheme] = useState(lightTheme)

    useEffect(() => {
        const currentTheme: TypeTheme = {
            light: lightTheme,
            dark: darkTheme,
            custom: customTheme,
        }
        setCurrentTheme(currentTheme[state.theme])
    }, [state.theme])

    const changeTheme = (theme: string) => {
        dispatch({ type: "[UI] - Change Theme", payload: theme })
    }


    return (
        <UIContext.Provider value={{
            ...state,
            changeTheme
        }}>

            <ThemeProvider theme={currentTheme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </UIContext.Provider>
    )
}