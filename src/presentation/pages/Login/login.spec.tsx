import { Login } from '.';
import { ValidationStub } from '@/presentation/tests';
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react';
import React from 'react';
import faker from 'faker';

type SutTypes = {
	sut: RenderResult
	validationStub: ValidationStub
}
const makeSut = (): SutTypes => {
	const validationStub = new ValidationStub();
	validationStub.error = true;
	const sut = render(<Login validation={validationStub} />);
	return {
		sut,
		validationStub
	};
};

describe('Login Page', () => {
	it('Should start with initial State', () => {
		const { sut } = makeSut();
		const progress = sut.queryByTestId('progress');
		const button = sut.getByRole('button') as HTMLButtonElement;

		expect(progress).toBeFalsy();
		expect(button.disabled).toBe(true);
	});

	it('Should call email error if Validation fails', () => {
		const { sut } = makeSut();
		const inputEmail = sut.getByTestId('email-input');
		fireEvent.input(inputEmail, { target: { value: faker.internet.email() } });
		const emailError = sut.getByTestId('emailError');
		expect(emailError).toBeTruthy();
	});

	it('Should call password error if Validation fails', () => {
		const { sut } = makeSut();
		const inputPassword = sut.getByTestId('password-input');

		fireEvent.input(inputPassword, { target: { value: faker.internet.password() } });
		const passwordError = sut.getByTestId('passwordError');
		expect(passwordError).toBeTruthy();
	});
});
