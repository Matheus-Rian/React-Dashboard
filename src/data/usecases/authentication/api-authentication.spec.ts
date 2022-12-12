import { HttpPostClientSpy } from '@/data/tests';
import { ApiAuthentication } from './api-authentication';

type SutTypes = {
	sut: ApiAuthentication,
	httpPostClientSpy: HttpPostClientSpy
}

const makeSut = (url: string): SutTypes => {
	const httpPostClientSpy = new HttpPostClientSpy();
	const sut = new ApiAuthentication(url, httpPostClientSpy);

	return {
		sut,
		httpPostClientSpy
	};
};

describe('ApiAuthentication', () => {
	it('Should call HttpClient with correct URL', async () => {
		const url = 'any_url';
		const { sut, httpPostClientSpy } = makeSut(url);
		await sut.auth();
		expect(httpPostClientSpy.url).toBe(url);
	});
});
