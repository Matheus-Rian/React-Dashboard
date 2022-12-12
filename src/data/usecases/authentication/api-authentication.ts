import { HttpPostClient } from '@/data/protocols/http/post-client';
import { HttpStatusCode } from '@/data/protocols/http/response';
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error';
import { Authentication, AuthenticationParams } from '@/domain/usecases/authentication';

export class ApiAuthentication implements Authentication {
	constructor (
		private readonly url: string,
		private readonly httpPostClient: HttpPostClient
	) {}

	async auth(params: AuthenticationParams): Promise<void> {
		const httpResponse = await this.httpPostClient.post({ url: this.url, body: params });

		switch (httpResponse.statusCode) {
		case HttpStatusCode.unauthorized: throw new InvalidCredentialsError();
		}
	}
}
