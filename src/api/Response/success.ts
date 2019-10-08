import { IResponse } from './response'
import { HttpStatusCode } from './statusCodes'
import { IModel } from '../model'
import { execSync } from 'child_process'
export class SuccessResponse<T> implements IResponse{
  statusCode: HttpStatusCode
  data: Array<T>

  constructor(statusCode: HttpStatusCode, data: T | Array<T>){
    
    let dataArray = new Array<T>()
    if (data instanceof Array) {
      dataArray = data
    } else {
      dataArray = new Array<T>()
      dataArray.push(data)
    }
    this.data = dataArray
    this.statusCode = statusCode
  }
  getStatusCode(): HttpStatusCode {
    return this.statusCode
  }


}