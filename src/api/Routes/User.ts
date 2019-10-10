import * as express from 'express'
import { UserManager, User} from '../Entitys/User'
import { SuccessResponse } from '../Response/Success'
import { IResponse } from '../Response/response'

const router = express.Router()

router.get('/', async (req, res) => {
    const userManager = new UserManager()
    try {
        await userManager.getEntitys(req.query)
    } finally {  
        const response = userManager.getResponse()
        res.status(response.statusCode).json(response)
    }
})
router.get('/:userId', async (req, res) => {
    const userManager = new UserManager()
    try {
        await userManager.getEntityById(req.params.userId)
    } finally {
        const response = userManager.getResponse()
        res.status(response.statusCode).json(response)
    }
})
router.post('/', async (req, res)=>{
    const userManager = new UserManager()
    try {
        await userManager.createEntity(req.body)
        await userManager.save()
    } catch {}
    finally {
        const response = userManager.getResponse()
        res.status(response.statusCode).json(response)
    }
})
router.delete('/:userId', async (req, res)=> {
    const userManager = new UserManager()
    try {
        await userManager.deleteEntity(req.params.userId)
    } catch {}
    finally {
        const response = userManager.getResponse()
        res.status(response.statusCode).json(response)
    }
})
export default router