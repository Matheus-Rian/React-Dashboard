import { HttpPostClient } from '@/data/protocols/http/post-client';
import { ApiAuthentication } from './api-authentication';

class HttpClientSpy implements HttpPostClient {
	url?: string;

	async post(url: string): Promise<void> {
		this.url = url;
	}
}

describe('ApiAuthentication', () => {
	it('Should call HttpClient with correct URL', () => {
		const url = 'any_url';
		const httpPostClientSpy = new HttpClientSpy();
		const sut = new ApiAuthentication(url, httpPostClientSpy);
		sut.auth();
		expect(httpPostClientSpy.url).toBe(url);
	});
});
