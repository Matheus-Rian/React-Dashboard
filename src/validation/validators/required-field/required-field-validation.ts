import { RequiredFieldError } from '../../errors';
import { FieldValidation } from '../../protocols/field-validation';

export class RequiredFieldValidation implements FieldValidation {
	constructor (readonly name: string) {}

	validate(value: string): Error {
		return value ? null : new RequiredFieldError();
	}
}
