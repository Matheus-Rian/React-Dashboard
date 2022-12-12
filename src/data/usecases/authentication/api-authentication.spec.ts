import { HttpPostClientSpy } from '@/data/tests';
import { ApiAuthentication } from './api-authentication';
import { mockAuthentication } from '@/domain/tests/mock-authentication';
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error';
import faker from 'faker';
import { HttpStatusCode } from '@/data/protocols/http/response';

type SutTypes = {
	sut: ApiAuthentication,
	httpPostClientSpy: HttpPostClientSpy
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
	const httpPostClientSpy = new HttpPostClientSpy();
	const sut = new ApiAuthentication(url, httpPostClientSpy);

	return {
		sut,
		httpPostClientSpy
	};
};

describe('ApiAuthentication', () => {
	it('Should call HttpClient with correct URL', async () => {
		const url = faker.internet.url();
		const { sut, httpPostClientSpy } = makeSut(url);
		await sut.auth(mockAuthentication());
		expect(httpPostClientSpy.url).toBe(url);
	});

	it('Should call HttpClient with correct body', async () => {
		const { sut, httpPostClientSpy } = makeSut();
		const authParams = mockAuthentication();
		await sut.auth(authParams);
		expect(httpPostClientSpy.body).toBe(authParams);
	});

	it('Should throw InvalidCredentialsError if HttpPostClient returns 401', async () => {
		const { sut, httpPostClientSpy } = makeSut();
		httpPostClientSpy.response = {
			statusCode: HttpStatusCode.unauthorized
		};
		const promise = sut.auth(mockAuthentication());
		await expect(promise).rejects.toThrow(new InvalidCredentialsError());
	});
});
