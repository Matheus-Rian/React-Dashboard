import { extendTheme } from '@chakra-ui/react';

const config = {
	initialColorMode: 'light',
	useSystemColorMode: false,
	fonts: {
		body: 'Ubuntu',
		heading: 'Nunito Sans',
		mono: 'Menlo, monospace',
	},
};

export const theme = extendTheme(config);
