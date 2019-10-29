import * as express from 'express'
import { User } from '../classes/user'
import { SuccessResponse } from '../classes/response/success'

const router = express.Router()

router.post('/', async (req, res) => {
    new User({name: req.body.name, email: req.body.email}).save()
        .then((response) =>{    
            res.status(response.statusCode).json(response)
        })
        .catch((response => {
            res.status(response.statusCode).json(response)
        }))
})
router.get('/:userId', (req, res) => {
    let user = User.getEntityByIdResponse(req.params.userId)
        .then(response =>{
            res.status(response.statusCode).json(response)
        })
})
router.get('/', (req, res) => {
    User.getEntitysResponse(req).then(response =>{
        res.status(response.statusCode).json(response)
    })
})
export default router