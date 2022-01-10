import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'

const fonts = { body: "Quicksand" }

const breakpoints = createBreakpoints({
  sm: '426px',
  md: '769px',
  lg: '1025px',
  xl: '1441px',
  "2xl": '2561px',
})

const theme = extendTheme({
  colors: {
    black: '#16161D',
  },
  fonts,
  breakpoints,
})

export default theme
