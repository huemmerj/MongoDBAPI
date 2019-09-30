import * as express from 'express'
import * as bodyParser from 'body-parser'
import userRoutes from './routes/user'
import { MongoHelper } from './mongo/mongoHelper'
const app = express()
console.log("test")

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/user', userRoutes)
app.get('/', (req,res) => {
    console.log("hallo")
    res.send("hi")
    res.end()
})

module.exports = app;