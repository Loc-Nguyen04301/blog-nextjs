'use client'
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#C4AC99'
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
    h1: { fontFamily: 'var(--font-montserrat)' },
    h2: { fontFamily: 'var(--font-montserrat)' },
    h3: { fontFamily: 'var(--font-montserrat)' },
    h4: { fontFamily: 'var(--font-montserrat)' },
    h5: { fontFamily: 'var(--font-montserrat)' },
    h6: { fontFamily: 'var(--font-montserrat)' },
  },
})

export default theme;