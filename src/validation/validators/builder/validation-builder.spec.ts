import { EmailValidation, MinLengthValidation, RequiredFieldValidation } from '@/validation/validators';
import { BuilderValidation } from './validation-builder';
import faker from 'faker';

describe('BuilderValidation', () => {
	it('Should return RequiredFieldValidation', () => {
		const field = faker.database.column();
		const sut = BuilderValidation.field(field).required().build();
		expect(sut).toEqual([new RequiredFieldValidation(field)]);
	});

	it('Should return EmailValidation', () => {
		const field = faker.database.column();
		const sut = BuilderValidation.field(field).email().build();
		expect(sut).toEqual([new EmailValidation(field)]);
	});

	it('Should return MinLengthValidation', () => {
		const field = faker.database.column();
		const sut = BuilderValidation.field(field).min(5).build();
		expect(sut).toEqual([new MinLengthValidation(field, 5)]);
	});

	it('Should return a list of validations', () => {
		const field = faker.database.column();
		const length = faker.datatype.number();
		const sut = BuilderValidation.field(field).required().email().min(length).build();
		expect(sut).toEqual([
			new RequiredFieldValidation(field),
			new EmailValidation(field),
			new MinLengthValidation(field, length),
		]);
	});
});
