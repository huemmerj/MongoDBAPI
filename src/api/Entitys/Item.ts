import { EntityFactory } from './EntityFactory'
import * as express from 'express'
import {validate, validateOrReject, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max, IsString, IsOptional} from "class-validator";
import { ErrorResponse, ErrorTitles, ResponseError } from '../Response/error';
import { HttpStatusCode } from '../Response/statusCodes';
import { isObject } from 'util';
import { User } from './User';

export class Item {
  @IsString({message:"Du musst ein String machen du idiot"})
  name: string

  @IsString()
  @Max(2)
  description

  setData({name, description}:{name:string, description:string}){
    this.description = description
    this.name = name
  }
}

export class ItemFactory extends EntityFactory<Item> {
  constructor(){
    super('item')
    this.entity = new Item()
  }
}