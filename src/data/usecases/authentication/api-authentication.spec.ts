import { HttpPostClientSpy } from '@/data/tests';
import { ApiAuthentication } from './api-authentication';
import faker from 'faker';
import { mockAuthentication } from '@/domain/tests/mock-authentication';

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
});
