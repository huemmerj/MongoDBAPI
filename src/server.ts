import * as express from "express"
import UserRoutes from './api/Routes/User'
const app = express();
const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("Hello World")
})
app.use("/user", UserRoutes)

app.listen(PORT, ()=>{
  console.log(`Server is running in http://localhost:${PORT}`)
});