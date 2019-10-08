import * as express from 'express'
import { UserFactory, User} from '../Entitys/User'
import { SuccessResponse } from '../Response/Success'
import { IResponse } from '../Response/response'

const userFactory = new UserFactory()
const router = express.Router()

router.post('/', async (req, res) => {
    try {
        await userFactory.createEntity(req.body)
        await userFactory.save()
    } catch (err) {
    }
    const response = userFactory.getResponse()
    res.status(response.statusCode).json(response)
})
router.get('/:userId', async (req, res) => {
    await userFactory.getEntityById(req.params.userId)
    const response = userFactory.getResponse()
    res.status(response.statusCode).json(response)
})
router.get('/', async (req, res) => {
    // kake mit req zu arbeiten
    userFactory.getEntitys(req)
    const response = userFactory.getResponse()
    res.status(response.statusCode).json(response)
})
router.delete('/:userId', async (req, res) => {
    try {
        await userFactory.deleteEntity(req.params.userId)
    } catch (err) {

    }
    const response = userFactory.getResponse()
    res.status(response.statusCode).json(response)
   
    
})
export default router