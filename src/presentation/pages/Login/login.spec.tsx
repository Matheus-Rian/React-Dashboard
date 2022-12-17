import { fireEvent, render, RenderResult } from '@testing-library/react';
import { Login } from '.';
import React from 'react';
import { Validation } from '@/presentation/protocols/validation';

type SutTypes = {
	sut: RenderResult
	validationSpy: ValidationSpy
}
const makeSut = (): SutTypes => {
	const validationSpy = new ValidationSpy();
	const sut = render(<Login validation={validationSpy} />);
	return {
		sut,
		validationSpy
	};
};

class ValidationSpy implements Validation {
	errorMessage: string;
	fieldName: string;
	fieldValue: string;

	validate(fieldName: string, fieldValue: string): string {
		this.fieldName = fieldName;
		this.fieldValue = fieldValue;
		return this.errorMessage;
	}

}

describe('Login Page', () => {
	it('Should start with initial State', () => {
		const { sut } = makeSut();
		const progress = sut.queryByTestId('progress');
		const button = sut.getByRole('button') as HTMLButtonElement;
		const errorsMessage = sut.queryAllByTestId('errorMessage');
		expect(errorsMessage).toHaveLength(0);
		expect(progress).toBeFalsy();
		expect(button.disabled).toBe(true);
	});

	it('Should call Validation with correct email', () => {
		const { sut, validationSpy } = makeSut();
		const inputEmail = sut.getByTestId('email-input');
		fireEvent.input(inputEmail, { target: { value: 'any_email'} });
		expect(validationSpy.fieldName).toBe('email');
		expect(validationSpy.fieldValue).toBe('any_email');
	});

	it('Should call Validation with correct password', () => {
		const { sut, validationSpy } = makeSut();
		const inputPassword = sut.getByTestId('password-input');
		fireEvent.input(inputPassword, { target: { value: 'any_password'} });
		expect(inputPassword).toBeTruthy();
		expect(validationSpy.fieldName).toBe('password');
		expect(validationSpy.fieldValue).toBe('any_password');
	});
});
