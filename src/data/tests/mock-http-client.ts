/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpPostClient, HttpPostParams } from '@/data/protocols/http/post-client';
import { HttpResponse, HttpStatusCode } from '@/data/protocols/http/response';
import faker from 'faker';

export const mockPostRequest = (): HttpPostParams => ({
	url: faker.internet.url(),
	body: faker.random.objectElement()
});

export class HttpPostClientSpy<B = any, R = any> implements HttpPostClient {
	url?: string;
	body?: B;
	response: HttpResponse<R> = {
		statusCode: HttpStatusCode.created,
	};

	async post(params: HttpPostParams<B>): Promise<HttpResponse<R>> {
		this.url = params.url;
		this.body = params.body;

		return this.response;
	}
}
