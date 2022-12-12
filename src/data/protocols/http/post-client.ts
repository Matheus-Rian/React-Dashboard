import { HttpResponse } from './response';

export type HttpPostParams<TBody = never> = {
	url: string,
	body?: TBody,
}

export interface HttpPostClient<TBody = never,TResponse = never> {
	post(params: HttpPostParams<TBody>): Promise<HttpResponse<TResponse>>
}
