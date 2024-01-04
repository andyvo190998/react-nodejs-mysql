import express from 'express'
import postRoutes from './routes/posts.js'
import authRoute from './routes/auth.js'
import userRoutes from './routes/users.js'
import dotenv from 'dotenv'

const ENV = dotenv.config().parsed
const PORT = ENV.PORT === undefined ? 3000 : ENV.PORT
console.log(PORT)
const app = express()
app.use(express.json())
app.use("/api/posts", postRoutes)
app.use("/api/auth", authRoute)
app.use("/api/users", userRoutes)

// let dotenv = require('dotenv').config()



app.listen(PORT, () => {
    console.log(`Express is listening on PORT: ${PORT}!`)
})
