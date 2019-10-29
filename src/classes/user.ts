import { MongoHelper } from '../mongo/mongoHelper'
import { ImyResponse } from './response/response'
import { SuccessResponse } from './response/success'
import { ErrorResponse, ErrorTitles} from './response/error'
import { IModel } from './model'
import { HttpStatusCode } from './response/statusCodes'
import * as MongoDb from 'mongodb'

export class User  implements	IModel{
  private name: string
  private email: string

  constructor ({name, email}: {name: string, email:string}) {
    this.name = name
    this.email = email
    return this
  }
  public static async getEntitys(req: Express.Request):Promise<Array<User>>{
    const client = await MongoHelper.getClient()
    const db = client.db('test')
    return new Promise<Array<User>>((resolve, reject)=> {
      db.collection('user').find(req.query).toArray()
      .then(users =>{
        resolve(users)
      })
      .catch(err=>{
        reject(new ErrorResponse(ErrorTitles.ERROR, HttpStatusCode.no))
      })
    })
  }
  public static async getEntitysResponse(req:Express.Request):Promise<ImyResponse>{
    return new Promise((resolve, reject)=>{
        User.getEntitys(req)
          .then(users => {
            resolve(new SuccessResponse(HttpStatusCode.OK, users))
          })
    })
  }
  public static async getEntityById(id:string):Promise<User> {
    const client = await MongoHelper.getClient()
    const db = client.db('test')
    return new Promise<User>((resolve,reject)=>{
      db.collection('user').findOne({_id:new MongoDb.ObjectID(id)}).then((user)=>{
        resolve(new User({name: user.name, email: user.email}))
      })
    })
  }
  public static async getEntityByIdResponse(id: string):Promise<ImyResponse>{
    return new Promise<ImyResponse>((resolve, reject)=>{
      User.getEntityById(id).then(user => {
        resolve(new SuccessResponse(HttpStatusCode.OK, user))
      })
    })
  }
  public async save (): Promise<ImyResponse>{
    const client = await MongoHelper.getClient()
    const db = client.db('test')
    return new Promise<ImyResponse>((resolve, reject)=>{
      db.collection('user').insertOne(this).then((user)=>{
        resolve(new SuccessResponse(HttpStatusCode.CREATED, user))
      }).catch((err => {
        console.log(err)
        reject(new ErrorResponse(ErrorTitles.SAVE_FAILED, HttpStatusCode.CONFLICT, err.toString()))
      }))
    })
  }
}