import * as express from 'express'
import { ItemFactory, Item} from '../Entitys/Item'
import { SuccessResponse } from '../Response/Success'
import { IResponse } from '../Response/response'

const router = express.Router()

router.post('/', async (req, res) => {
    const itemFactory = new ItemFactory()
    try {
        await itemFactory.createEntity(req.body)
        await itemFactory.save()
    } catch (err) {
    }
    const response = itemFactory.getResponse()
    res.status(response.statusCode).json(response)
})
router.get('/:itemId', async (req, res) => {
    const itemFactory = new ItemFactory()
    await itemFactory.getEntityById(req.params.itemId)
    const response = itemFactory.getResponse()
    res.status(response.statusCode).json(response)
})
router.get('/', async (req, res) => {
    const itemFactory = new ItemFactory()
    // kake mit req zu arbeiten
    itemFactory.getEntitys(req)
    const response = itemFactory.getResponse()
    res.status(response.statusCode).json(response)
})
router.delete('/:itemId', async (req, res) => {
    const itemFactory = new ItemFactory()
    try {
        await itemFactory.deleteEntity(req.params.itemId)
    } catch (err) {

    }
    const response = itemFactory.getResponse()
    res.status(response.statusCode).json(response)
   
    
})
export default router