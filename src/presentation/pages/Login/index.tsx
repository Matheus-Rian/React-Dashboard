
import { ButtonCustom, HeadingCustom, InputWrapForm } from '@/presentation/components';
import { FormContext } from '@/presentation/contexts';
import { Logo } from '@/presentation/icons/logo';
import { Flex, FormControl, CircularProgress } from '@chakra-ui/react';
import { Validation } from '../../protocols/validation';
import React, { useEffect, useState } from 'react';
import Styles from './styles.scss';

type Props = {
	validation: Validation
}

export const Login: React.FC<Props> = ({ validation }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [state, setState] = useState({
		email: '',
		password: '',
		emailError: '',
		passwordError: ''
	});
	const [isError, setIsError] = useState(false);

	async function handleSubmitData(event: React.FormEvent<HTMLFormElement>): Promise<void> {
		event.preventDefault();
		setIsError(!isError);
	}

	useEffect(() => {
		setState({
			...state,
			emailError: validation.validate('email', state.email),
			passwordError: validation.validate('password', state.password)
		});
	}, [state.email, state.password]);

	return (
		<div className={Styles.loginContainer}>
			<Flex direction='column' align='center' maxW='800px'>
				<Flex align='center' direction='column'>
					<Logo/>
					<HeadingCustom mt='42px' mb='65px'>
						Entrar na plataforma
					</HeadingCustom>
				</Flex>

				<FormContext.Provider value={{ state, setState }}>
					<form className={Styles.formContainer} onSubmit={handleSubmitData}>
						<FormControl isInvalid={isError}>
							<InputWrapForm
								nameLabel='E-mail'
								input={{
									name: 'email',
									placeholder: 'Digite seu e-mail',
									type: 'email'
								}}
								messageError='Email is required.'
							/>
							<InputWrapForm
								nameLabel='Senha'
								input={{
									name: 'password',
									placeholder: 'Digite sua senha',
									type: 'password'
								}}
								messageError='Password is required.'
							/>
						</FormControl>

						<ButtonCustom type='submit' disabled>
							Entrar
						</ButtonCustom>
						{isLoading &&
							<CircularProgress data-testid='progress' isIndeterminate color='purple.300' />
						}
					</form>
				</FormContext.Provider>
			</Flex>
		</div>
	);
};
