import { EntityManager} from './EntityManager'
import { IsEmail, IsString, IsArray, ValidateNested, ArrayContains} from "class-validator";
import { IEntity } from './IEntity';

import { ItemManager, Item } from './Item'

export class User implements IEntity {
  @IsEmail()
  email: string

  @IsString()
  name
  
  @ValidateNested({each: true
  })
  items: Item[]

  setData({email, name, items, item}: {email: string, name: string, items: Array<Item>, item: Item}){
    this.email = email
    this.name = name
    const newItem = new Item()
    if (items) {
      this.items = new Array<Item>()
      items.forEach(item => {
        newItem.setData(item)
        this.items.push(newItem)
      })
    }
  }
}

export class UserManager extends EntityManager {
  constructor(){
    super('user')
    this.entity = new User()
  }
  public isAdmin(): Function{
    ( res, req, next)=> {
      
    }
  }
}