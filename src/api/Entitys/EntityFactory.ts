import * as express from 'express'
import { IResponse } from '../Response/response';
import { MongoHelper } from '../Mongo/MongoHelper';
import * as MongoDb from 'mongodb'
import { SuccessResponse } from '../Response/Success';
import { HttpStatusCode } from '../Response/statusCodes';
import { keys } from 'ts-transformer-keys';

import { User } from './User'
import { validate } from 'class-validator';
import { ErrorResponse, ResponseError, ErrorTitles } from '../Response/error';
export abstract class EntityFactory<T> {
  entity: T
  tablename: string
  client
  db
  collection
  response: IResponse
  constructor(tablename: string) {
    this.tablename = tablename
  }
  public async deleteEntity(id: string){
    await this.connect()
    await this.collection.deleteOne({_id: new MongoDb.ObjectID(id)}).then( async (result)=>{
          if (result.deletedCount < 1 ) {
          let response = new ErrorResponse(HttpStatusCode.UNPROCESSABLE_ENTITY)
          response.addError(new ResponseError(ErrorTitles.ENTITY_NOT_FOUND))
          this.response = response
          throw new Error(ErrorTitles.ENTITY_NOT_FOUND)
        }else {
          this.response = new SuccessResponse(HttpStatusCode.OK, result)
        }

    })
  }
  public createEntity(data: T) {
    this.entity = data
  }
  public getResponse() {
    return this.response
  }
  async connect() {
    this.client = await MongoHelper.getClient()
    this.db = this.client.db('test')
    this.collection = this.db.collection(this.tablename)
  }
  async getEntityById(id: string):Promise<T>{
    await this.connect()
    return new Promise<T>((resolve,reject)=>{
      this.db.collection(this.tablename).findOne({_id:new MongoDb.ObjectID(id)}).then((entity)=>{
        this.response = new SuccessResponse(HttpStatusCode.OK, entity)
        resolve(entity)
      })
    })
  }
  async getEntitys (req: express.Request):Promise<Array<T>>{
    await this.connect()
    return new Promise<Array<T>>((resolve, reject) => {
      this.db.collection(this.tablename).find(req.query).toArray().then((entitys)=>{
        this.response = new SuccessResponse(HttpStatusCode.OK, entitys)
        resolve(entitys)
      })
    })
  }
  async save ():Promise<T>{
    await this.connect()
    return new Promise<T>((resolve, reject) => {
      this.db.collection(this.tablename).insertOne(this.entity).then(entity => {
        this.response = new SuccessResponse(HttpStatusCode.CREATED, entity)
        resolve(entity)
      })
    })
  }
  async validate(){
    await validate(this.entity).then(errors =>{
    if (errors.length !== 0) {
      let errorResponse = new ErrorResponse(HttpStatusCode.UNPROCESSABLE_ENTITY)
      Object.values(errors[0].constraints).forEach(element => {
        errorResponse.addError(new ResponseError(ErrorTitles.INVALID_ATTRIBUTE, element))
      });
      this.response = errorResponse
      throw new Error(errors.toString())
    }
    })
  }
}