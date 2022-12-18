import { LocalStorageAdapter } from '@/infra/cache/local-storage';
import { UnexpectedError } from '@/domain/errors';
import { mockAccount } from '@/domain/tests/mock-authentication';
import { setCurrentAccountAdapter } from './current-account';

jest.mock('@/infra/cache/local-storage');

describe('CurrentAccountAdapter', () => {
	test('Should call LocalStorageAdapter with correct values', () => {
		const account = mockAccount();
		const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set');
		setCurrentAccountAdapter(account);
		expect(setSpy).toHaveBeenCalledWith('account', account);
	});

	test('Should throw UnexpectedError', () => {
		expect(() => {
			setCurrentAccountAdapter(undefined);
		}).toThrow(new UnexpectedError());
	});
});
