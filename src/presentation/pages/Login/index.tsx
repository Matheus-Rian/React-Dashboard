
import { ButtonCustom, HeadingCustom, InputWrapForm } from '@/presentation/components';
import { AccountContext, FormContext } from '@/presentation/contexts';
import { Logo } from '@/presentation/icons/logo';
import { Flex, FormControl, CircularProgress, Text } from '@chakra-ui/react';
import { Validation } from '../../protocols/validation';
import React, { useContext, useEffect, useState } from 'react';
import Styles from './styles.scss';
import { Authentication } from '../../../domain/usecases/authentication';
import { useHistory } from 'react-router-dom';

type Props = {
	validation?: Validation
	authentication: Authentication
}

export const Login: React.FC<Props> = ({ validation, authentication }) => {
	const history = useHistory();
	const { setCurrentAccount } = useContext(AccountContext);
	const [state, setState] = useState({
		email: '',
		password: '',
		emailError: '',
		passwordError: '',
		mainError: '',
		isLoading: false
	});

	const isFormInvalid = Boolean(state.emailError || state.passwordError);
	async function handleSubmitData(event: React.FormEvent<HTMLFormElement>): Promise<void> {
		event.preventDefault();

		try {
			if (state.isLoading || isFormInvalid)
				return;

			setState({ ...state, isLoading: true });

			const account = await authentication.auth({
				email: state.email,
				password: state.password
			});
			setCurrentAccount(account);

			history.replace('/main');
		} catch (error) {
			setState({
				...state,
				isLoading: false,
				mainError: error.message
			});
		}
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
					<form data-testid='form' className={Styles.formContainer} onSubmit={handleSubmitData}>
						<FormControl isInvalid={isFormInvalid}>
							<InputWrapForm
								nameLabel='E-mail'
								input={{
									name: 'email',
									placeholder: 'Digite seu e-mail',
									type: 'email'
								}}
								messageError={state.emailError}
							/>
							<InputWrapForm
								nameLabel='Senha'
								input={{
									name: 'password',
									placeholder: 'Digite sua senha',
									type: 'password'
								}}
								messageError={state.passwordError}
							/>
						</FormControl>

						{state.isLoading
							? <CircularProgress mt='48px' data-testid='progress' isIndeterminate color='purple.300' />
							: (
								<ButtonCustom type='submit' disabled={isFormInvalid}>
									Entrar
								</ButtonCustom>
							)
						}

						{state.mainError &&
							<Text color='red.300' data-testid='main-error'>{state.mainError}</Text>
						}
					</form>
				</FormContext.Provider>
			</Flex>
		</div>
	);
};
