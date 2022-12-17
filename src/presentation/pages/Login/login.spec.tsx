import { Login } from '.';
import { Helper, ValidationStub } from '@/presentation/tests';
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react';
import React from 'react';
import faker from 'faker';

type SutTypes = {
	sut: RenderResult
	validationStub: ValidationStub
}

const makeSut = (validationError = ''): SutTypes => {
	const validationStub = new ValidationStub();
	validationStub.error = validationError;
	const sut = render(<Login validation={validationStub} />);
	return {
		sut,
		validationStub
	};
};

describe('Login Page', () => {
	afterEach(cleanup);

	it('Should start with initial State', () => {
		const validationError = faker.random.words();
		const { sut } = makeSut(validationError);
		const progress = sut.queryByTestId('progress');
		const button = sut.getByRole('button') as HTMLButtonElement;

		expect(progress).toBeFalsy();
		expect(button.disabled).toBe(true);
	});

	it('Should call email error if Validation fails', () => {
		const validationError = faker.random.words();
		const { sut } = makeSut(validationError);
		Helper.testStatusForInput(sut, 'email', validationError);
	});

	it('Should call password error if Validation fails', () => {
		const validationError = faker.random.words();
		const { sut } = makeSut(validationError);
		Helper.testStatusForInput(sut, 'password', validationError);
	});

	it('Should enable submit button if form is valid', () => {
		const { sut } = makeSut();
		const inputEmail = sut.getByTestId('email');
		fireEvent.input(inputEmail, { target: { value: faker.internet.email() }});
		const inputPassword = sut.getByTestId('password');
		fireEvent.input(inputPassword, { target: { value: faker.internet.password() }});
		const button = sut.getByRole('button') as HTMLButtonElement;

		expect(button.disabled).toBe(false);
	});
});
