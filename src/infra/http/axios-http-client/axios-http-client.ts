import { HttpPostClient, HttpPostParams } from '@/data/protocols/http/post-client';
import { HttpResponse } from '@/data/protocols/http/response';
import axios, { AxiosResponse } from 'axios';

export class AxiosHttpClient implements HttpPostClient {
	async post(params: HttpPostParams): Promise<HttpResponse> {
		const axiosResponse = await axios.post(params.url, params.body);

		return this.adapt(axiosResponse);
	}

	adapt(response: AxiosResponse): HttpResponse {
		return {
			statusCode: response.status,
			body: response.data
		};
	}
}
