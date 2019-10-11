import * as express from 'express'
import { UserManager, User} from '../Entitys/User'
import { SuccessResponse } from '../Response/Success'
import { IResponse } from '../Response/response'
import { ConnectionManager } from '../Mongo/ConnectionManager'
import { runInNewContext } from 'vm'

const router = express.Router()

let userManager = new UserManager()
router.use((req,res,next)=>{
    userManager = new UserManager()
    next()
})
router.get('/', async (req, res, next) => {
    try {
        await userManager.getEntitys(req.query)
    } catch {}
    next()
})
router.get('/:userId', async (req, res, next) => {
    try {
        await userManager.getEntityById(req.params.userId)
    } catch {}
    next()
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
router.post('/machvoll', async (req, res)=> {
    await machVoll()
    res.send("erfolg")
})
router.use((req, res)=>{
    const response = userManager.getResponse()
    res.status(response.statusCode).json(response)
})
export default router

async function machVoll() {
    const collection : any = await ConnectionManager.getCollection('user')
    var i = 0
    
    var userArray = new Array()
    while ( i < 2000000) {
        var user = {
            name: makeRdnString(10),
            email: "jfsdf.fsaf@fsadfsa.ddfas"
        }
        userArray.push(user)
        i++
    }
    console.log(userArray)
    await collection.insertMany(userArray).then(result => {
    })
    
}
function makeRdnString(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
 