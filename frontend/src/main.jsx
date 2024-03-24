import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider,extendTheme } from '@chakra-ui/react'
import {BrowserRouter} from 'react-router-dom'

const theme = extendTheme({
	colors: {
	  brand: {
		50: "#EDE7F6",
		100: "#E1BEE7",
		200: "#CE93D8",
		300: "#BA68C8",
		400: "#AB47BC",
		500: "#9C27B0",
		600: "#8E24AA",
		700: "#7B1FA2",
		800: "#6A1B9A",
		900: "#4A148C"
	  },
	},
  })
  

ReactDOM.createRoot(document.getElementById('root')).render(
	<ChakraProvider theme={theme}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</ChakraProvider>

)
