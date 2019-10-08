import { EntityFactory } from './EntityFactory'
import * as express from 'express'
import {validate, validateOrReject, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max, IsString, IsOptional} from "class-validator";
import { ErrorResponse, ErrorTitles, ResponseError } from '../Response/error';
import { HttpStatusCode } from '../Response/statusCodes';
import { isObject } from 'util';

export class User {
  @IsEmail()
  email: string

  @IsString()
  name

  constructor({name, email}:{name:string, email:string}){
    this.email = email
    this.name = name
  }
}

export class UserFactory extends EntityFactory<User> {
  constructor(){
    super('user')
  }
  async createEntity (data: User) {
    this.entity = new User(data)
    await super.validate()
  }
  async getEntityById(id: string):Promise<User>{
    return new User(await super.getEntityById(id))
  }
  async getEntitys(req: express.Request): Promise<Array<User>> {
    const users = await super.getEntitys(req)
    users.map(user => {
      user = new User(user)
    }) 
    return users
  }
  async save():Promise<User> {
    return super.save()
  }
}