import { Button, ButtonProps } from '@chakra-ui/react';
import React from 'react';

export const ButtonCustom: React.FC<ButtonProps> = (props: ButtonProps) => {
	return (
		<Button
			{...props}
			w='120px'
			h='40px'
			bg='#5A4CA7'
			mt='48px'
			color='white'
			_hover={{ background: '#5B5CA7'}}
		>
			{props.children}
		</Button>
	);
};
