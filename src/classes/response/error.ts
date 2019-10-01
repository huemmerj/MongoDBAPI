import { ImyResponse } from './response' 
import { HttpStatusCode } from './errorCodes'
export enum ErrorTitles {
  INVALID_ATTRIBUTE = "Invalid Attribute",
  NO_AUTHORIZATION = "No Authorization"
}
export class ErrorResponse implements ImyResponse {
  title: ErrorTitles
  detail?: string
  statusCode: HttpStatusCode
  getStatusCode(): HttpStatusCode {
    return this.statusCode
  }
}