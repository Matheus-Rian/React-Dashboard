import { ApiAuthentication } from './api-authentication';
import { HttpPostClientSpy } from '@/data/tests';
import { HttpStatusCode } from '@/data/protocols/http/response';
import { mockAccount, mockAuthentication } from '@/domain/tests/mock-authentication';
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors';
import faker from 'faker';
import { AuthenticationParams } from '@/domain/usecases/authentication';
import { AccountModel } from '@/domain/models';

type SutTypes = {
	sut: ApiAuthentication,
	httpPostClientSpy: HttpPostClientSpy<AuthenticationParams, AccountModel>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
	const httpPostClientSpy = new HttpPostClientSpy<AuthenticationParams, AccountModel>();
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

	it('Should throw UnexpectedError if HttpPostClient returns 400', async () => {
		const { sut, httpPostClientSpy } = makeSut();
		httpPostClientSpy.response = {
			statusCode: HttpStatusCode.badRequest
		};
		const promise = sut.auth(mockAuthentication());
		await expect(promise).rejects.toThrow(new UnexpectedError());
	});

	it('Should throw UnexpectedError if HttpPostClient returns 404', async () => {
		const { sut, httpPostClientSpy } = makeSut();
		httpPostClientSpy.response = {
			statusCode: HttpStatusCode.notFound
		};
		const promise = sut.auth(mockAuthentication());
		await expect(promise).rejects.toThrow(new UnexpectedError());
	});

	it('Should throw UnexpectedError if HttpPostClient returns 500', async () => {
		const { sut, httpPostClientSpy } = makeSut();
		httpPostClientSpy.response = {
			statusCode: HttpStatusCode.serverError
		};
		const promise = sut.auth(mockAuthentication());
		await expect(promise).rejects.toThrow(new UnexpectedError());
	});


	it('Should return AccountModel if HttpPostClient returns 200', async () => {
		const { sut, httpPostClientSpy } = makeSut();
		const httpResult = mockAccount();
		httpPostClientSpy.response = {
			statusCode: HttpStatusCode.ok,
			body: httpResult
		};
		const account = await sut.auth(mockAuthentication());
		expect(account).toBe(httpResult);
	});
});
