import { ImyResponse } from './response' 
export class Error implements ImyResponse {
  data: object
  statusCode: number
  getStatusCode(): number {
    return this.statusCode
  }
}