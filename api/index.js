import express from 'express'
import postRoutes from './routes/posts.js'
import authRoute from './routes/auth.js'
import userRoutes from './routes/users.js'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import multer from 'multer'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})
const upload = multer({ storage: storage })

const ENV = dotenv.config().parsed
const PORT = ENV.PORT === undefined ? 3000 : ENV.PORT
const corsOptions = {
    origin: true,
    credentials: true,
    optionsSuccessStatus: 200,
};

const app = express()
app.use(cors(corsOptions));
app.use(express.json())
app.use(cookieParser())

app.post('/api/upload', upload.single('file'), (req, res) => {
    const file = req.file
    res.status(200).json(file.filename)
})
app.use("/api/posts", postRoutes)
app.use("/api/auth", authRoute)
app.use("/api/users", userRoutes)

app.get("/", (req, res) => {
    return res.status(200).json("Hello world!")
})

app.listen(PORT, () => {
    console.log(`Express is listening on PORT: ${PORT}!`)
})
