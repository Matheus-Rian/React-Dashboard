import { InvalidFieldError } from '@/validation/errors';
import { FieldValidation } from '../../protocols/field-validation';

export class EmailValidation implements FieldValidation {
	constructor(readonly name: string) {}

	validate(value: string): Error {
		const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
		return (!value || emailRegex.test(value)) ? null : new InvalidFieldError();
	}
}
