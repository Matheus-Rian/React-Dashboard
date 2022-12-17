import { AccountModel } from '@/domain/models';
import { mockAccount } from '@/domain/tests/mock-authentication';
import { Authentication, AuthenticationParams } from '@/domain/usecases/authentication';

export class AuthenticationSpy implements Authentication {
	params: AuthenticationParams;
	callsCount = 0;
	account = mockAccount();

	async auth(params: AuthenticationParams): Promise<AccountModel> {
		this.params = params;
		this.callsCount++;
		return Promise.resolve(this.account);
	}
}
