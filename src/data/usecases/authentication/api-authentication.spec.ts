import { HttpClientSpy } from '@/data/tests';
import { ApiAuthentication } from './api-authentication';

describe('ApiAuthentication', () => {
	it('Should call HttpClient with correct URL', () => {
		const url = 'any_url';
		const httpPostClientSpy = new HttpClientSpy();
		const sut = new ApiAuthentication(url, httpPostClientSpy);
		sut.auth();
		expect(httpPostClientSpy.url).toBe(url);
	});
});
