import * as express from 'express'
import { UserFactory, User } from '../Entitys/User'
import { SuccessResponse } from '../Response/Success'

const userFactory = new UserFactory()
const router = express.Router()

// router.post('/', async (req, res) => {
//     new User({name: req.body.name, email: req.body.email}).save()
//         .then((response) =>{    
//             res.status(response.statusCode).json(response)
//         })
//         .catch((response => {
//             res.status(response.statusCode).json(response)
//         }))
// })
router.get('/:userId', async (req, res) => {
    let user: User = await userFactory.getEntityById(req.params.userId)
})
// router.get('/', (req, res) => {
//     User.getEntitysResponse(req).then(response =>{
//         res.status(response.statusCode).json(response)
//     })
// })
export default router