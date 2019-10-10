import { IResponse } from './response' 
import { HttpStatusCode } from './statusCodes'
export enum ErrorTitles {
  INVALID_ATTRIBUTE = "Invalid Attribute",
  NO_AUTHORIZATION = "No Authorization",
  SAVE_FAILED = "Save Failed",
  ERROR = "ERROR",
  ENTITY_NOT_FOUND = "Entity not Found"
}
export class ErrorResponse implements IResponse {
  errors: Array<ResponseError>
  statusCode: HttpStatusCode
  constructor(statusCode: HttpStatusCode) {
    this.statusCode = statusCode
    this.errors = new Array<ResponseError>()
  }
  public addEntry(error: ResponseError) {
    this.errors.push(error)
  }
}
export class ResponseError {
  title: ErrorTitles
  detail?: string
  constructor(title:ErrorTitles,detail?:string) {
    this.title = title
    this.detail = detail
  }
}