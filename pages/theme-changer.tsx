import { ChangeEvent, FC, useEffect, useState } from "react"

import { GetServerSideProps } from 'next'

import { Button, Card, CardContent, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material"
import Cookies from 'js-cookie'
import axios from 'axios'

import { Layout } from "../components/layouts"

interface Props {
    theme: string
}

const ThemeChangerPage:FC<Props> = ({ theme }) => {
    

    const [currentTheme, setCurrentTheme] = useState(theme)

    const onThemeChange = (event: ChangeEvent<HTMLInputElement>) => {
        
        const selectedTheme = event.target.value
        setCurrentTheme( selectedTheme )

        localStorage.setItem('master-theme', selectedTheme)
        Cookies.set('master-theme-cookie', selectedTheme)
    }

    const onClick = async() => {
        const { data } = await axios.get('/api/hello')
        console.log({ data })
    }
    
    useEffect(()=>{
        // console.log( 'LocalStorage: ', localStorage.getItem('master-theme') )
        // console.log( 'Cookie: ', Cookies.get('master-theme-cookie') )
    },[])

    return (
        <Layout>
            <Card>
                <CardContent>
                    <FormControl>
                        <FormLabel>
                            Tema
                        </FormLabel>
                        <RadioGroup value={currentTheme} onChange={onThemeChange}>
                            <FormControlLabel value="light" control={<Radio />} label="Light" />
                            <FormControlLabel value="dark" control={<Radio />} label="Dark" />
                            <FormControlLabel value="custom" control={<Radio />} label="Custom" />
                        </RadioGroup>
                    </FormControl>
                    <Button
                        onClick={onClick}
                        style={{ display: 'block', marginTop: '20px' }}
                    >
                        Request
                    </Button>
                </CardContent>
            </Card>
        </Layout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    
    const { 'master-theme-cookie': theme='light', name='No name' } = req.cookies

    const validThemes = [ 'light', 'dark', 'custom' ]




    return {
        props: {
            theme: validThemes.includes( theme ) ? theme : 'dark',
            name,
        }
    }
}

export default ThemeChangerPage