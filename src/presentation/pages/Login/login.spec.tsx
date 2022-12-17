import { Login } from '.';
import { Helper, ValidationStub } from '@/presentation/tests';
import { cleanup, render, RenderResult, fireEvent } from '@testing-library/react';
import React from 'react';
import faker from 'faker';
import { Authentication, AuthenticationParams } from '@/domain/usecases/authentication';
import { AccountModel } from '@/domain/models';
import { mockAccount } from '@/domain/tests/mock-authentication';

class AuthenticationSpy implements Authentication {
	params: AuthenticationParams;
	account = mockAccount();

	async auth(params: AuthenticationParams): Promise<AccountModel> {
		this.params = params;
		return Promise.resolve(this.account);
	}

}

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
});
