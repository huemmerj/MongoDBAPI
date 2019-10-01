import { MongoHelper } from '../mongo/mongoHelper'
import { ImyResponse } from './response/response'
import { SuccessResponse } from './response/success'
import { ErrorResponse } from './response/error'
import { IModel } from './model'
import { HttpStatusCode } from './response/errorCodes'
export class User  implements	IModel{
  private name: string
  private email: string

  constructor (name: string, email: string) {
    this.name = name
    this.email = email
    return this
  }

  public async save (): Promise<ImyResponse>{
    const client = await MongoHelper.getClient()
    const db = client.db('test')
    return new Promise<ImyResponse>((resolve, reject)=>{
      db.collection('user').insertOne(this).then((user)=>{
        console.log("hajljöajj")
        resolve(new SuccessResponse(200, this))
      }).catch((err => {
        console.log(err)
        //errorklasse baun
        // return new ErrorResponse(HttpStatusCode.CONFLICT, err)
      }))
    })
  }
}