import { InvalidFieldError } from '@/validation/errors';
import { FieldValidation } from '@/validation/protocols/field-validation';

export class MinLengthValidation implements FieldValidation {
	constructor (readonly name: string, private readonly min: number) {}
	validate(value: string): Error {
		return value.length >= this.min ? null : new InvalidFieldError();
	}
}
