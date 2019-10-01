import { HttpStatusCode } from './errorCodes'
export interface ImyResponse {
  statusCode: HttpStatusCode
  getStatusCode():number
}