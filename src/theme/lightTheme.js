import { createTheme } from "@mui/material";


export const lightTheme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#4a7dbf',
      dark: '#335785',
      light: '#6e97cb',
    },
    secondary: {
      main: 'rgba(230,117,3,0.77)',
      dark: 'rgba(161,81,2,0.76)',
    },
    background: {
      default: '#f6fbfb',
    },
    error: {
      main: '#f5483b',
      light: '#f76c62',
      dark: '#ab3229',
    },
    success: {
      main: '#4caf50',
      light: '#6fbf73',
      dark: '#357a38',
    },
  },

})