const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')
dotenv.config()


mongoose.connect('mongodb+srv://admin:admin@tit-project.qjhnsgh.mongodb.net/mern-auth')

const app = express()
app.use(express.json())
app.use(cors())
app.get('/', (request, response) => {
    response.send('Hello World!***🎈')
  })

  const UserRouter = require('./routes/user')

  app.use('/auth', UserRouter)


app.listen(process.env.PORT,() => {
    console.log(`server is running on port:${process.env.PORT}`)
})
