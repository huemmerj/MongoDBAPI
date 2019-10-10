import * as express from 'express'
import { IResponse } from '../Response/response';
import { ConnectionManager } from '../Mongo/ConnectionManager';
import * as MongoDb from 'mongodb'
import { SuccessResponse } from '../Response/Success';
import { HttpStatusCode } from '../Response/statusCodes';
import { keys } from 'ts-transformer-keys';

import { User } from './User'
import { validate } from 'class-validator';
import { ErrorResponse, ResponseError, ErrorTitles } from '../Response/error';
import { IEntity } from './IEntity';
import { rejects } from 'assert';
import { resolve } from 'dns';

export abstract class EntityManager {
  entity: IEntity
  collectionName: string
  response: IResponse
  constructor(collectionName: string) {
    this.collectionName = collectionName
  }
  public async deleteEntity(id: string):Promise<object>{
    const collection = await ConnectionManager.getCollection(this.collectionName)
    return new Promise<object>((resolve, reject) =>{
      collection.deleteOne({_id: new MongoDb.ObjectID(id)}).then(result => {
        if (result.deletedCount === 0) {
          this.response = new ErrorResponse(HttpStatusCode.UNPROCESSABLE_ENTITY)
          this.response.addEntry(new ResponseError(ErrorTitles.ENTITY_NOT_FOUND))
          reject()
          return
        }
        this.response = new SuccessResponse(HttpStatusCode.OK)
        this.response.addEntry(result)
        resolve(this.entity)
      }).catch(err => {
        this.response = new ErrorResponse(HttpStatusCode.CONFLICT)
      })
    })
  }
  public async createEntity(data: object): Promise<IEntity> {
    this.entity.setData(data)
    return await this.validate()
  }
  public getResponse() {
    return this.response
  }
  async getEntityById(id: string):Promise<IEntity>{
    const collection: MongoDb.Collection = await ConnectionManager.getCollection(this.collectionName)
    return new Promise<IEntity>(async (resolve, reject) => {
      collection.findOne({_id: new MongoDb.ObjectID(id)}).then(entity => {
        if (!entity) {
          this.response = new ErrorResponse(HttpStatusCode.UNPROCESSABLE_ENTITY)
          this.response.addEntry(new ResponseError(ErrorTitles.ENTITY_NOT_FOUND, id))
          reject()
          return
        }
          this.response= new SuccessResponse(HttpStatusCode.OK)
          this.response.addEntry(entity)
          resolve(entity)
      }).catch(err => {
        this.response = new ErrorResponse(HttpStatusCode.CONFLICT)
        reject(err)
      })
    })
  }
  async getEntitys (query: object):Promise<Array<IEntity>>{
    const collection: MongoDb.Collection = await ConnectionManager.getCollection(this.collectionName)
    return new Promise<Array<IEntity>>(async (resolve, reject) => {
      await collection.find(query).toArray().then(entitys => {
        this.response = new SuccessResponse(HttpStatusCode.OK, entitys)
        resolve(entitys)
      }).catch(err => {
        this.response = new ErrorResponse(HttpStatusCode.CONFLICT)
        reject(err)
      })
    })
  }
  async save ():Promise<object>{
    const collection: MongoDb.Collection = await ConnectionManager.getCollection(this.collectionName)
    return new Promise<object>((resolve, reject)=> {
      collection.insertOne(this.entity).then(result => {
        this.response = new SuccessResponse(HttpStatusCode.CREATED, result.ops)
        resolve(result.ops[0])
      }).catch(err=> {
        this.response = new ErrorResponse(HttpStatusCode.CONFLICT)
        reject()
      })
    })
  }
  async validate(): Promise<IEntity>{
    return new Promise<IEntity>((resolve, reject)=>{
      validate(this.entity).then(errors =>{
        if (errors.length !== 0) {
          this.response = new ErrorResponse(HttpStatusCode.UNPROCESSABLE_ENTITY)
          errors.forEach(error=>{
            Object.values(error.constraints).forEach(element => {
              this.response.addEntry(new ResponseError(ErrorTitles.INVALID_ATTRIBUTE, element))
            });
          })
          reject()
          return
        }
        resolve(this.entity)
      })
    })
  }
}