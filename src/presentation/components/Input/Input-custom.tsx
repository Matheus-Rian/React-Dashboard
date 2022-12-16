import formContext from '@/presentation/contexts/form/form-context';
import { Input, InputProps } from '@chakra-ui/react';
import React, { useContext } from 'react';


export const InputCustom: React.FC<InputProps> = (props: InputProps) => {
	const { state, setState } = useContext(formContext);
	return (
		<Input
			{...props}
			variant='filled'
			maxW ='100%'
			h='60px'
			borderRadius ='8px'
			onChange={(e) => setState({ ...state, [e.target.name]: e.target.value })}
		/>
	);
};
