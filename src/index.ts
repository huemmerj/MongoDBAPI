import * as express from 'express'
import * as bodyParser from 'body-parser'
import userRoutes from './routes/user'
const app = express()
console.log("test")
app.use(bodyParser)

app.use('/user', userRoutes)

app.listen(3000)
