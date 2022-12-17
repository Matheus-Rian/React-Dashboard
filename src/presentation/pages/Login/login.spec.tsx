import { Login } from '.';
import { AuthenticationSpy, Helper, ValidationStub } from '@/presentation/tests';
import { cleanup, render, RenderResult, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import faker from 'faker';

const simulateValidSubmit = async (
	sut: RenderResult
) => {
	Helper.populateField(sut, 'email', faker.internet.email());
	Helper.populateField(sut, 'password', faker.internet.password());
	const form = sut.getByTestId('form');
	fireEvent.submit(form);
	await waitFor(() => form);
};

type SutTypes = {
	sut: RenderResult
	authenticationSpy: AuthenticationSpy
}

const makeSut = (validationError = ''): SutTypes => {
	const validationStub = new ValidationStub();
	const authenticationSpy = new AuthenticationSpy();
	validationStub.error = validationError;
	const sut = render(<Login validation={validationStub} authentication={authenticationSpy} />);
	return {
		sut,
		authenticationSpy
	};
};

describe('Login Page', () => {
	afterEach(cleanup);

	it('Should start with initial State', () => {
		const validationError = faker.random.words();
		const { sut } = makeSut(validationError);
		Helper.testButtonIsDisabled(sut, true);
		Helper.testElementExists(sut, 'progress').toBeFalsy();
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
		Helper.populateField(sut, 'email');
		Helper.populateField(sut, 'password');
		Helper.testButtonIsDisabled(sut, false);
	});

	// it('Should show progress on submit', () => {
	// 	const { sut } = makeSut();
	// 	Helper.populateField(sut, 'email');
	// 	Helper.populateField(sut, 'password');
	// 	const button = sut.getByRole('button');
	// 	fireEvent.click(button);
	// 	// expect(button).toBeFalsy();
	// 	Helper.testElementExists(sut, 'progress').toBeTruthy();
	// });

	it('Should call authentication with correct values', () => {
		const { sut, authenticationSpy } = makeSut();
		const email = faker.internet.email();
		const password = faker.internet.password();

		Helper.populateField(sut, 'email', email);
		Helper.populateField(sut, 'password', password);
		const button = sut.getByRole('button');
		fireEvent.click(button);
		expect(authenticationSpy.params).toEqual({
			email,
			password
		});
	});

	it('Should call authentication only once', () => {
		const { sut, authenticationSpy } = makeSut();
		simulateValidSubmit(sut);
		simulateValidSubmit(sut);

		expect(authenticationSpy.callsCount).toBe(1);
	});

	it('Should not call authentication if form is invalid', () => {
		const validationError = faker.random.words();
		const { sut, authenticationSpy } = makeSut(validationError);
		const form = sut.getByTestId('form');
		Helper.populateField(sut, 'email');
		fireEvent.submit(form);

		expect(authenticationSpy.callsCount).toBe(0);
	});
});
