import { HttpPostClient, HttpPostParams } from '@/data/protocols/http/post-client';
import { HttpResponse, HttpStatusCode } from '@/data/protocols/http/response';

export class HttpPostClientSpy<B = any, R = any> implements HttpPostClient {
	url?: string;
	body?: B;
	response: HttpResponse<R> = {
		statusCode: HttpStatusCode.ok,
	};

	async post(params: HttpPostParams<B>): Promise<HttpResponse<R>> {
		this.url = params.url;
		this.body = params.body;

		return this.response;
	}
}
