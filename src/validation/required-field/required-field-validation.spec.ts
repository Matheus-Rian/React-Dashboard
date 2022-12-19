import { RequiredFieldError } from '../errors';
import { RequiredFieldValidation } from './required-field-validation';
import faker from 'faker';

describe('RequiredFieldValidation', () => {
	it('Should return error if field is empty', () => {
		const sut = new RequiredFieldValidation('email');
		const error = sut.validate('');
		expect(error).toEqual(new RequiredFieldError());
	});
});