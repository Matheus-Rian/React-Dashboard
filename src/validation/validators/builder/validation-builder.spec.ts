import { RequiredFieldValidation } from '@/validation/validators';
import { BuilderValidation } from './validation-builder';

describe('BuilderValidation', () => {
	it('Should return RequiredFieldValidation', () => {
		const sut = BuilderValidation.field('any_field').required().build();
		expect(sut).toEqual([new RequiredFieldValidation('any_field')]);
	});
});
