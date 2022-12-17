import { render, RenderResult } from '@testing-library/react';
import { Login } from '.';
import React from 'react';

type SutTypes = {
	sut: RenderResult
}
const makeSut = (): SutTypes => {
	const sut = render(<Login />);
	return {
		sut
	};
};

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
});
