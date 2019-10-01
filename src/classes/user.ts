import { MongoHelper } from '../mongo/mongoHelper'
import { ImyResponse } from './response/response'
import { SuccessResponse } from './response/success'
export class User {
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
    await db.collection('user').insertOne(this)
    const data = new Array<User>()
    data.push(this)
    return new SuccessResponse(data, 200)
  }

}