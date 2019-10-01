import { MongoHelper } from '../mongo/mongoHelper'

export class User {
  private name: string
  private email: string

  constructor (name: string, email: string) {
    this.name = name
    this.email = email
    return this
  }
  private getOwnData():object {
    return {
      name: this.name,
      email: this.email
    }
  }
  public async save () {
    const client = await MongoHelper.getClient()
    const db = client.db('test')
    await db.collection('user').insertOne(this.getOwnData())
  }

}