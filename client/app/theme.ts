'use client'
import { createTheme } from '@mui/material/styles';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  weight: ['300', '400', '500', '700'],
  subsets: ['vietnamese'],
  display: 'swap',
})

const theme = createTheme({
  palette: {
    primary: {
      main: '#C4AC99'
    },
  },
  typography: {
    fontFamily: [
      montserrat.style.fontFamily,
    ].join(',')
  },
})

export default theme;