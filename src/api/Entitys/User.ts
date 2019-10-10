import { EntityFactory, Entity } from './EntityFactory'
import * as express from 'express'
import {validate, validateOrReject, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max, IsString, IsOptional} from "class-validator";
import { ErrorResponse, ErrorTitles, ResponseError } from '../Response/error';
import { HttpStatusCode } from '../Response/statusCodes';
import { isObject } from 'util';

export class User implements Entity {
  @IsEmail()
  email: string

  @IsString()
  @Min(7)
  name

  constructor({name, email}:{name:string, email:string}){
    this.email = email
    this.name = name
  }
  setData(){}
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
}