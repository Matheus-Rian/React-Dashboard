import { InvalidFieldError } from '@/validation/errors';
import { FieldValidation } from '../../protocols/field-validation';

export class EmailValidation implements FieldValidation {
	constructor(readonly name: string) {}

	validate(value: string): Error {
		return new InvalidFieldError();
	}
}
