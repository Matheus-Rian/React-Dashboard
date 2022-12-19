import { FieldValidationSpy } from '../tests';
import { ValidationComposite } from './validation-composite';

describe('ValidationComposite', () => {
	it('Should return error if any validation fails', () => {
		const fieldValidationSpy = new FieldValidationSpy('field');
		const fieldValidationSpy2 = new FieldValidationSpy('field');
		fieldValidationSpy2.error = new Error('any_message');
		const sut = new ValidationComposite([
			fieldValidationSpy,
			fieldValidationSpy2
		]);

		const error = sut.validate('field', 'any_value');
		expect(error).toBe('any_message');
	});
});
