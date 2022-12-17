import { Validation } from '../protocols/validation';

export class ValidationStub implements Validation {
	error = false;

	validate(fieldName: string, fieldValue: string): boolean {
		return this.error;
	}
}
