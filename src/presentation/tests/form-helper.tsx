import { fireEvent, RenderResult } from '@testing-library/react';
import faker from 'faker';

export const testStatusForInput = (sut: RenderResult, field: string, validationError = ''): void => {
	const error = sut.getByTestId(`${field}Error`);
	expect(error.getAttribute('data-status')).toBe(validationError ? 'invalid' : 'valid');
	expect(error.title).toBe(validationError);
};

export const populateField = (sut: RenderResult, fieldName: string, value = faker.random.word()) => {
	const input = sut.getByTestId(fieldName);
	fireEvent.input(input, { target: { value }});
};

export const testButtonIsDisabled = (sut: RenderResult, isDisabled: boolean) => {
	const button = sut.getByRole('button') as HTMLButtonElement;
	expect(button.disabled).toBe(isDisabled);
};

export const testElementExists = (sut: RenderResult, element: string) => {
	const el = sut.queryByTestId(element);
	return expect(el);
};
