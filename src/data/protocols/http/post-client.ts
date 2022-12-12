import { HttpResponse } from './response';

export type HttpPostParams<TBody = any> = {
	url: string,
	body?: TBody,
}

export interface HttpPostClient<TBody = any,TResponse = any> {
	post(params: HttpPostParams<TBody>): Promise<HttpResponse<TResponse>>
}
