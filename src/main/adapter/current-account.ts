import { UnexpectedError } from '@/domain/errors';
import { AccountModel } from '@/domain/models';
import { makeLocalStorageAdapter } from  '../factories/cache/local-storage-factory';

export const setCurrentAccountAdapter = (account: AccountModel): void => {
	if (!account?.name) {
		throw new UnexpectedError();
	}

	makeLocalStorageAdapter().set('account', account);
};