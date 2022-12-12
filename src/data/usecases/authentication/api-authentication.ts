import { HttpPostClient } from '@/data/protocols/http/post-client';
import { AccountModel } from '@/domain/models';
import { Authentication, AuthenticationParams } from '@/domain/usecases/authentication';

export class ApiAuthentication implements Authentication {
	constructor (
		private readonly url: string,
		private readonly httpPostClient: HttpPostClient
	) {}

	async auth(): Promise<AccountModel> {
		await this.httpPostClient.post(this.url);
		return { } as AccountModel;
	}
}
