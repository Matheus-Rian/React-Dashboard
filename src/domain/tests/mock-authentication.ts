import { AuthenticationParams } from '../usecases/authentication';
import faker from 'faker';
import { AccountModel } from '../models';

export const mockAuthentication = (): AuthenticationParams => ({
	email: faker.internet.email(),
	password: faker.random.words(5)
});

export const mockAccount = (): AccountModel => ({
	name: faker.name.firstName(),
	avatar: faker.image.cats(),
	username: faker.internet.userName(),
});
