import * as express from 'express'
import { MongoHelper } from '../mongo/mongoHelper'

const router = express.Router()

router.post('/', (req, res) => {
    const client = MongoHelper.getClient()
    const testDB = client.db('test')
    testDB.collection('test').insertOne(req.body)
    res.status(200).json("hat gefunkt")
})

export default router