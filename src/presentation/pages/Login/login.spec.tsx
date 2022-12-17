import { Login } from '.';
import { ValidationSpy } from '@/presentation/tests';
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react';
import React from 'react';
import faker from 'faker';

type SutTypes = {
	sut: RenderResult
	validationSpy: ValidationSpy
}
const makeSut = (): SutTypes => {
	const validationSpy = new ValidationSpy();
	validationSpy.error = true;
	const sut = render(<Login validation={validationSpy} />);
	return {
		sut,
		validationSpy
	};
};

describe('Login Page', () => {
	afterEach(cleanup);

	it('Should start with initial State', () => {
		const { sut } = makeSut();
		const progress = sut.queryByTestId('progress');
		const button = sut.getByRole('button') as HTMLButtonElement;

		expect(progress).toBeFalsy();
		expect(button.disabled).toBe(true);
	});

	it('Should call Validation with correct email', () => {
		const { sut, validationSpy } = makeSut();
		const inputEmail = sut.getByTestId('email-input');
		const email = faker.internet.email();
		fireEvent.input(inputEmail, { target: { value: email } });

		expect(validationSpy.fieldName).toBe('email');
		expect(validationSpy.fieldValue).toBe(email);
	});

	it('Should call Validation with correct password', () => {
		const { sut, validationSpy } = makeSut();
		const inputPassword = sut.getByTestId('password-input');
		const password = faker.internet.password();
		fireEvent.input(inputPassword, { target: { value: password } });
		expect(validationSpy.fieldName).toBe('password');
		expect(validationSpy.fieldValue).toBe(password);
		console.log(validationSpy);
	});

	it('Should call email error if Validation fails', () => {
		const { sut } = makeSut();
		const inputEmail = sut.getByTestId('email-input');
		fireEvent.input(inputEmail, { target: { value: faker.internet.email() } });
		const emailError = sut.getByTestId('emailError');
		expect(emailError).toBeTruthy();
	});
});
