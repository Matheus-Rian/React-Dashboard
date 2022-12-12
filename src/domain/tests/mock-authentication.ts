import { AuthenticationParams } from '../usecases/authentication';
import faker from 'faker';

export const mockAuthentication = (): AuthenticationParams => ({
	email: faker.internet.email(),
	password: faker.random.words(5)
});
