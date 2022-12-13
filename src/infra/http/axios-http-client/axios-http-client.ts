import { HttpPostClient, HttpPostParams } from '@/data/protocols/http/post-client';
import { HttpResponse } from '@/data/protocols/http/response';
import axios from 'axios';

export class AxiosHttpClient implements HttpPostClient {
	async post(params: HttpPostParams): Promise<HttpResponse> {
		await axios(params.url);
		return { } as HttpResponse;
	}
}
