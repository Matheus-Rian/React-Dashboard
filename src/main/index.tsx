import { Login } from '@/presentation/pages/Login';
import { theme } from '@/presentation/styles/theme';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import '@/presentation/styles/global.scss';

const root = ReactDOM.createRoot(document.getElementById('main'));
root.render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<Login />
		</ChakraProvider>
	</React.StrictMode>
);
