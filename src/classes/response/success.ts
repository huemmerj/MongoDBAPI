import { MyResponse } from './response'
export class SuccessResponse implements MyResponse{
  statusCode: number
  getStatusCode(): number {
    return this.statusCode
  }
  response: object
  getResponse(): object {
    throw new Error("Method not implemented.")
  }


}