import { IResponse } from './response' 
import { HttpStatusCode } from './statusCodes'
export enum ErrorTitles {
  INVALID_ATTRIBUTE = "Invalid Attribute",
  NO_AUTHORIZATION = "No Authorization",
  SAVE_FAILED = "Save Failed",
  ERROR = "ERROR"
}
export class ErrorResponse implements IResponse {
  title: ErrorTitles
  detail?: string
  statusCode: HttpStatusCode
  constructor(title:ErrorTitles, statusCode:HttpStatusCode ,detail?:string) {
    this.title = title
    this.detail = detail
    this.statusCode = statusCode
  }
  getStatusCode(): HttpStatusCode {
    return this.statusCode
  }
}