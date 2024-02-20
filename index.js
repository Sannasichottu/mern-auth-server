const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
dotenv.config()


mongoose.connect('mongodb+srv://admin:admin@tit-project.qjhnsgh.mongodb.net/mern-auth')

const app = express()
app.use(express.json())
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions))
app.use(cookieParser({
    origin:["http://localhost:3000"],
    Credentials:true
}))

app.get('/', (request, response) => {
    response.send('Hello World!***🎈')
  })

  const UserRouter = require('./routes/user')

  app.use('/auth', UserRouter)


app.listen(process.env.PORT,() => {
    console.log(`server is running on port:${process.env.PORT}`)
})
