import * as express from 'express'
import { ItemManager } from '../Entitys/Item'
const router = express.Router()


let itemManager = new ItemManager()
router.use((req, res, next)=>{
  itemManager = new ItemManager()
  next()
})
router.get('/', async (req, res, next) =>{
  try {
    await itemManager.getEntitys(req.query)
  } catch {
  }
  next()
})
router.post('/', async(req, res, next) => {
  try {
    await itemManager.createEntity(req.body)
    await itemManager.save()
  } catch {}
  next()
})
router.use((req, res, next) => {
  const response = itemManager.getResponse()
  res.status(response.statusCode).json(response)
})


export default router