import { AuthenticationParams } from '../usecases/authentication';
import { AccountModel } from '../models';
import faker from 'faker';

export const mockAuthentication = (): AuthenticationParams => ({
	email: faker.internet.email(),
	password: faker.random.words(5)
});

export const mockAccount = (): AccountModel => ({
	'access-token': faker.datatype.uuid()
});
