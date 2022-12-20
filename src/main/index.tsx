import { theme } from '@/presentation/styles/theme';
import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './routes/router';
import '@/presentation/styles/global.scss';

const root = ReactDOM.createRoot(document.getElementById('main'));
root.render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<Router />
		</ChakraProvider>
	</React.StrictMode>
);
