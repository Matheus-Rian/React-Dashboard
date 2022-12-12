export class InvalidCredentialsError extends Error {
	constructor() {
		super('Ops... Credenciais inválidas');
		this.name = 'InvalidCredentialsError';
	}
}
