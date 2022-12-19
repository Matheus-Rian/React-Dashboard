import { RequiredFieldError } from '../errors';
import { RequiredFieldValidation } from './required-field-validation';
import faker from 'faker';

const makeSut = () => new RequiredFieldValidation(faker.database.column());

describe('RequiredFieldValidation', () => {
	it('Should return error if field is empty', () => {
		const sut = makeSut();
		const error = sut.validate('');
		expect(error).toEqual(new RequiredFieldError());
	});

	it('Should return falsy if field is not empty', () => {
		const sut = makeSut();
		const error = sut.validate(faker.internet.email());
		expect(error).toBeFalsy();
	});
});
