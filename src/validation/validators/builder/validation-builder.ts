import { FieldValidation } from '@/validation/protocols/field-validation';
import { EmailValidation, MinLengthValidation, RequiredFieldValidation } from '@/validation/validators';

export class BuilderValidation {
	private constructor (
		private readonly fieldName: string,
		private validations: FieldValidation[]
	) {}

	static field(fieldName: string): BuilderValidation {
		return new BuilderValidation(fieldName, []);
	}

	required(): this {
		this.validations.push(new RequiredFieldValidation(this.fieldName));
		return this;
	}

	email(): this {
		this.validations.push(new EmailValidation(this.fieldName));
		return this;
	}

	min(length: number): this {
		this.validations.push(new MinLengthValidation(this.fieldName, length));
		return this;
	}

	build(): FieldValidation[] {
		return this.validations;
	}
}
