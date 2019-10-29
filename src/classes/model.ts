import { ImyResponse } from './response/response'
export interface IModel {
  save():Promise<ImyResponse>
}