import * as express from 'express'
import { User } from '../classes/user'

const router = express.Router()

router.post('/', (req, res) => {
    console.log(req)
    const user = new User(req.body.name, req.body.email).save()
    res.status(200).json({message: "jo"})
})
router.get('/', (req, res) => {
    res.status(200).json({hallo: 'hallo'})
})

export default router