import { FormLabel, FormErrorMessage } from '@chakra-ui/react';
import { InputCustom } from './Input-custom';
import React, { useContext } from 'react';
import { FormContext } from '@/presentation/contexts';

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
			{ state[errorName] &&
				<span data-testid={errorName}>
					<FormErrorMessage>{messageError}</FormErrorMessage>
				</span>
			}
		</>
	);
};
