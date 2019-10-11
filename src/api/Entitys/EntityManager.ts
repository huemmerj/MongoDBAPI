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
import { ClassValidatorHelper } from '../Helpers/Class-Validator';

export abstract class EntityManager {
  entity: IEntity
  collectionName: string
  response: IResponse
  constructor(collectionName: string) {
    this.collectionName = collectionName
  }
  public async deleteEntity(id: string) {
    const collection = await ConnectionManager.getCollection(this.collectionName)
      await collection.deleteOne({_id: new MongoDb.ObjectID(id)}).then(result => {
      if (result.deletedCount === 0) {
        this.response = new ErrorResponse(HttpStatusCode.UNPROCESSABLE_ENTITY)
        this.response.addEntry(new ResponseError(ErrorTitles.ENTITY_NOT_FOUND))
        throw new Error()
      }
      this.response = new SuccessResponse(HttpStatusCode.OK)
      this.response.addEntry(result)
    }).catch(err => {
      this.response = new ErrorResponse(HttpStatusCode.CONFLICT)
      throw new Error(err)
    })
  }
  public async createEntity(data: object) {
    this.entity.setData(data)
    await this.validate()
  }
  public getResponse() {
    return this.response
  }
  async getEntityById(id: string) {
    const collection: MongoDb.Collection = await ConnectionManager.getCollection(this.collectionName)
    await collection.findOne({_id: new MongoDb.ObjectID(id)}).then(entity => {
      if (!entity) {
        this.response = new ErrorResponse(HttpStatusCode.UNPROCESSABLE_ENTITY)
        this.response.addEntry(new ResponseError(ErrorTitles.ENTITY_NOT_FOUND, id))
        throw new Error()
      }
        this.response= new SuccessResponse(HttpStatusCode.OK)
        this.response.addEntry(entity)
    }).catch(err => {
      this.response = new ErrorResponse(HttpStatusCode.CONFLICT)
      throw new Error(err)
    })
  }
  async getEntitys (query: object){
    const collection: MongoDb.Collection = await ConnectionManager.getCollection(this.collectionName)
    await collection.find(query).limit(100000).toArray().then(entitys => {
      this.response = new SuccessResponse(HttpStatusCode.OK, entitys)
    }).catch(err => {
      this.response = new ErrorResponse(HttpStatusCode.CONFLICT)
      throw new Error(err)
    })
  }
  async save (){
    const collection: MongoDb.Collection = await ConnectionManager.getCollection(this.collectionName)
    await collection.insertOne(this.entity).then(result => {
      this.response = new SuccessResponse(HttpStatusCode.CREATED, result.ops)
    }).catch(err=> {
      this.response = new ErrorResponse(HttpStatusCode.CONFLICT)
      throw new Error(err)
    })
  }
  async validate() {
    await validate(this.entity).then(errors =>{
      if (errors.length !== 0) {
        this.response = ClassValidatorHelper.getAllErrors(new ErrorResponse(HttpStatusCode.UNPROCESSABLE_ENTITY), errors)
        
        throw new Error()
      }
    })
  }
}