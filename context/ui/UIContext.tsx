import { createContext } from 'react';


interface ContextProps {
    theme: string,
    changeTheme: (theme: string) => void
}


export const UIContext = createContext({} as ContextProps)