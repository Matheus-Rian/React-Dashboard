export class UnexpectedError extends Error {
	constructor() {
		super('Hmm... Erro inesperado. Tente novamente mais tarde'),
		this.name = 'UnexpectedError';
	}
}
