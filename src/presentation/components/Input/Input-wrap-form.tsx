import { FormLabel, FormErrorMessage } from '@chakra-ui/react';
import { InputCustom } from './Input-custom';
import { FormContext } from '@/presentation/contexts';
import React, { useContext } from 'react';

type Props = {
	nameLabel: string,
	input: {
		type?: React.HTMLInputTypeAttribute,
		name: string,
		placeholder?: string;
	}
	messageError: string;
}

export const InputWrapForm: React.FC<Props> = ({ input, nameLabel, messageError }) => {
	const { state } = useContext(FormContext);
	const errorName = `${input.name}Error`;

	return (
		<>
			<FormLabel mt='40px' ml='12px' fontWeight='normal'>{nameLabel}</FormLabel>
			<InputCustom
				name={input.name}
				placeholder={input.placeholder || ''}
				type={input.type || 'text'}
			/>
			<span
				data-testid={errorName}
				data-status={state[errorName] ? 'invalid' : 'valid'}
				title={state[errorName]}
			>
				<FormErrorMessage>{messageError}</FormErrorMessage>
			</span>
		</>
	);
};
