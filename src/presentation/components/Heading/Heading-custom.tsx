import { Heading, HeadingProps } from '@chakra-ui/react';
import React from 'react';

export const HeadingCustom: React.FC<HeadingProps> = (props: HeadingProps) => {
	return (
		<Heading
			{...props}
			letterSpacing='0.48px'
			color='#1E252B'
			fontSize='24px'
			fontFamily='Ubuntu'
			fontWeight='normal'
		>
			{props.children}
		</Heading>
	);
};
