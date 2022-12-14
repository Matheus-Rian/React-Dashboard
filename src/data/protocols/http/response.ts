/* eslint-disable @typescript-eslint/no-explicit-any */
export enum HttpStatusCode {
	ok = 200,
	created =  201,
	noContent = 204,
	badRequest = 400,
  unauthorized = 401,
	notFound = 404,
	serverError = 500,
}

export type HttpResponse<T = any> = {
	statusCode: HttpStatusCode,
	body?: T
}
