import { EntityFactory } from './IEntity'
export class User {
  email
  name
  constructor({name, email}:{name:string, email:string}){
    this.email = email
    this.name = name
  }
  public getName():string {
    return this.name
  }
}
export class UserFactory extends EntityFactory<User> {
  constructor(){
    super('user')
  }
  async getEntityById(id: string):Promise<User>{
    return new User(await super.getEntityById(id))
  }
}