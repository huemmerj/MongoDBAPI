import * as express from 'express'
import { IResponse } from '../Response/response';
import { MongoHelper } from '../Mongo/MongoHelper';
import * as MongoDb from 'mongodb'
export abstract class EntityFactory<T> {
  tablename: string

  constructor(tablename: string) {
    this.tablename = tablename
  }
  async getEntityById(id: string):Promise<T>{
    const client = await MongoHelper.getClient()
    const db = client.db('test')
    return new Promise<T>((resolve,reject)=>{
      db.collection(this.tablename).findOne({_id:new MongoDb.ObjectID(id)}).then((entity)=>{
        resolve(entity)
      })
    })
  }
}