import * as express from "express"
import UserRoutes from './api/Routes/User'
import ItemRoutes from './api/Routes/Item'
import * as bodyParser from 'body-parser'
const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json())
app.get("/", (req, res) => {
  res.send("Hello World")
})
app.use("/user", UserRoutes)
app.use("/item", ItemRoutes)
app.listen(PORT, ()=>{
  console.log(`Server is running in http://localhost:${PORT}`)
});