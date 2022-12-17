import { Validation } from '../protocols/validation';

export class ValidationSpy implements Validation {
	error = false;
	fieldName: string;
	fieldValue: string;

	validate(fieldName: string, fieldValue: string): boolean {
		this.fieldName = fieldName;
		this.fieldValue = fieldValue;
		return this.error;
	}
}
