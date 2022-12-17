import { Login } from '.';
import { ValidationStub } from '@/presentation/tests';
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react';
import React from 'react';
import faker from 'faker';

type SutTypes = {
	sut: RenderResult
	validationStub: ValidationStub
}

const testStatusForInput = (sut: RenderResult, field: string, validationError = ''): void => {
	const error = sut.getByTestId(`${field}Error`);
	expect(error.getAttribute('data-status')).toBe(validationError ? 'invalid' : 'valid');
};

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
		const { sut } = makeSut();
		const progress = sut.queryByTestId('progress');
		const button = sut.getByRole('button') as HTMLButtonElement;

		expect(progress).toBeFalsy();
		expect(button.disabled).toBe(true);
	});

	it('Should call email error if Validation fails', () => {
		const validationError = faker.random.words();
		const { sut } = makeSut(validationError);
		testStatusForInput(sut, 'email', validationError);
	});

	it('Should call password error if Validation fails', () => {
		const validationError = faker.random.words();
		const { sut } = makeSut(validationError);
		testStatusForInput(sut, 'password', validationError);
	});
});
