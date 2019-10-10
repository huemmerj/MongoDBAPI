import { EntityManager} from './EntityManager'
import * as express from 'express'
import {validate, validateOrReject, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max, IsString, IsOptional, IsArray} from "class-validator";
import { ErrorResponse, ErrorTitles, ResponseError } from '../Response/error';
import { HttpStatusCode } from '../Response/statusCodes';
import { isObject } from 'util';
import { IEntity } from './IEntity';
import { emit } from 'cluster';

export class User implements IEntity {
  @IsEmail()
  email: string

  @IsString()
  name

  @IsArray()
  items

  setData({email, name, items}: {email: string, name: string, items: Array<object>}){
    this.email = email
    this.name = name
    this.items = items
  }
}

export class UserManager extends EntityManager {
  constructor(){
    super('user')
    this.entity = new User()
  }
}