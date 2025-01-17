import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import React from 'react'
import { lightTheme } from './lightTheme'

export const AppTheme = ({children}) => {
  return (
   <ThemeProvider theme={lightTheme}>
    <CssBaseline/> 
    {children}
   </ThemeProvider>
  )
}
