import { HttpPostClient } from '@/data/protocols/http/post-client';
import { HttpStatusCode } from '@/data/protocols/http/response';
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors';
import { AccountModel } from '@/domain/models';
import { Authentication, AuthenticationParams } from '@/domain/usecases/authentication';

export class ApiAuthentication implements Authentication {
	constructor (
		private readonly url: string,
		private readonly httpPostClient: HttpPostClient<AuthenticationParams, AccountModel>
	) {}

	async auth(params: AuthenticationParams): Promise<AccountModel> {
		const httpResponse = await this.httpPostClient.post({ url: this.url, body: params });

		switch (httpResponse.statusCode) {
		case HttpStatusCode.ok: return httpResponse.body;
		case HttpStatusCode.unauthorized: throw new InvalidCredentialsError();
		default: throw new UnexpectedError();
		}
	}
}
