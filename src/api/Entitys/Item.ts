import { IEntity } from "./IEntity";
import { IsString } from "class-validator";
import { EntityManager } from "./EntityManager";

export class Item implements IEntity {
  @IsString()
  name: string

  setData({name}: {name: string}) {
    this.name = name
  }
  
}

export class ItemManager extends EntityManager {
  constructor() {
    super('item')
    this.entity = new Item()
  }
}