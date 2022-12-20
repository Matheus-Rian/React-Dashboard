import { ApiAuthentication } from '@/data/usecases/authentication/api-authentication';
import { AxiosHttpClient } from '@/infra/http/axios-http-client/axios-http-client';
import { Login } from '@/presentation/pages/Login';
import { BuilderValidation } from '@/validation/validators/builder/validation-builder';
import React from 'react';
import { ValidationComposite } from '@/validation/validators';

export const makeLogin: React.FC = () => {
	const url = 'https://628bf017667aea3a3e387e51.mockapi.io/login';
	const axiosHttpClient = new AxiosHttpClient();
	const authentication = new ApiAuthentication(url, axiosHttpClient);
	const validationComposite = new ValidationComposite([
		...BuilderValidation.field('email').required().email().build(),
		...BuilderValidation.field('password').required().min(4).build(),
	]);

	return (
		<Login
			authentication={authentication}
			validation={validationComposite}
		/>
	);
};
