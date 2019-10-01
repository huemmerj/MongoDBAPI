import * as express from 'express'
import { User } from '../classes/user'

const router = express.Router()

router.post('/', async (req, res) => {
    console.log(req)
    new User(req.body.name, req.body.email).save()
        .then((response) =>{    
            res.status(response.statusCode).json(response)
        })
})
router.get('/', (req, res) => {
    res.status(200).json({hallo: 'hallo'})
})

export default router