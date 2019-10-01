import { ImyResponse } from './response'
export class SuccessResponse<T> implements ImyResponse{
  statusCode: number
  data: Array<T>

  constructor(data: Array<T>, statusCode: number){
    this.data = data
    this.statusCode = statusCode
  }
  getStatusCode(): number {
    return this.statusCode
  }


}