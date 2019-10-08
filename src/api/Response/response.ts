import { HttpStatusCode } from './statusCodes'
export interface IResponse {
  statusCode: HttpStatusCode
  getStatusCode():number
}