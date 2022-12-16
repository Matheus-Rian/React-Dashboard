
import { ButtonCustom, HeadingCustom,InputCustom } from '@/presentation/components';
import { FormContext } from '@/presentation/contexts';
import { Logo } from '@/presentation/icons/logo';
import { Flex, FormControl, FormLabel, FormErrorMessage, CircularProgress } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Styles from './styles.scss';

export const Login: React.FC = () => {
	console.log('Renderizou');
	const [state, setState] = useState({
		email: '',
		password: ''
	});
	const [isError, setIsError] = useState(false);

	async function handleSubmitData(event: React.FormEvent<HTMLFormElement>): Promise<void> {
		event.preventDefault();
		setIsError(!isError);
	}

	useEffect(() => {
		console.log('executei useffect');
		console.log(setState);
		setState({ ...state });
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
							<FormLabel fontWeight='normal' ml='12px'>E-mail</FormLabel>
							<InputCustom
								name='email'
								placeholder='Digite seu e-mail'
								type='email'
							/>
							<FormErrorMessage as='span'>Email is required.</FormErrorMessage>
							<FormLabel mt='40px' ml='12px' fontWeight='normal'>Senha</FormLabel>
							<InputCustom
								name='password'
								placeholder='Digite sua senha'
								type='password'
							/>
							<FormErrorMessage as='span'>Password is required.</FormErrorMessage>
						</FormControl>

						<ButtonCustom type='submit'>
							Entrar
						</ButtonCustom>
						{/* <CircularProgress isIndeterminate color='purple.300' /> */}
					</form>
				</FormContext.Provider>
			</Flex>
		</div>
	);
};
