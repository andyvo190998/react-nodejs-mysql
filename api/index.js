import express from 'express'
import postRoutes from './routes/posts.js'
import authRoute from './routes/auth.js'
import userRoutes from './routes/users.js'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const ENV = dotenv.config().parsed
const PORT = ENV.PORT === undefined ? 3000 : ENV.PORT
const corsOptions = {
    origin: true,
    credentials: true,
    // origin: "http://localhost:5173",
    optionsSuccessStatus: 200,
};

const app = express()
app.use(cors(corsOptions));
app.use(express.json())
app.use(cookieParser())

app.use("/api/posts", postRoutes)
app.use("/api/auth", authRoute)
app.use("/api/users", userRoutes)

app.get("/", (req, res) => {
    return res.status(200).json("Hello world!")
})

app.listen(PORT, () => {
    console.log(`Express is listening on PORT: ${PORT}!`)
})
