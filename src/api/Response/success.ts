import { IResponse } from './response'
import { HttpStatusCode } from './statusCodes'
import { execSync } from 'child_process'
export class SuccessResponse<T> implements IResponse{
  statusCode: HttpStatusCode
  data: Array<T>

  constructor(statusCode: HttpStatusCode, data?:Array<T>){
    this.statusCode = statusCode
    this.data = new Array<T>()
    if (data){
      this.data = data
    }
  }
  public addEntry(entry:T){
    this.data.push(entry)
  }
}