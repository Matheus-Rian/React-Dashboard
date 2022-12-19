import { EmailValidation, MinLengthValidation, RequiredFieldValidation } from '@/validation/validators';
import { BuilderValidation } from './validation-builder';

describe('BuilderValidation', () => {
	it('Should return RequiredFieldValidation', () => {
		const sut = BuilderValidation.field('any_field').required().build();
		expect(sut).toEqual([new RequiredFieldValidation('any_field')]);
	});

	it('Should return EmailValidation', () => {
		const sut = BuilderValidation.field('any_field').email().build();
		expect(sut).toEqual([new EmailValidation('any_field')]);
	});

	it('Should return MinLengthValidation', () => {
		const sut = BuilderValidation.field('any_field').min(5).build();
		expect(sut).toEqual([new MinLengthValidation('any_field', 5)]);
	});
});
