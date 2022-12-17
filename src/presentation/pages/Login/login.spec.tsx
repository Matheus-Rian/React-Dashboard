import { Login } from '.';
import { Helper, ValidationStub } from '@/presentation/tests';
import { cleanup, render, RenderResult } from '@testing-library/react';
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
});
