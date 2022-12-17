import { Validation } from '../protocols/validation';

export class ValidationStub implements Validation {
	error = '';

	validate(fieldName: string, fieldValue: string): string {
		return this.error;
	}
}
