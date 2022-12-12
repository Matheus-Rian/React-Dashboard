export enum HttpStatusCode {
	noContent = 204,
	badRequest = 400,
  unauthorized = 401,
}

export type HttpResponse<T = unknown> = {
	statusCode: HttpStatusCode,
	body?: T
}
