import { HttpStatusCode } from './statusCodes'
export interface ImyResponse {
  statusCode: HttpStatusCode
  getStatusCode():number
}