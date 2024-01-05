import mysql from 'mysql2'
import dotenv from 'dotenv'

const ENV = dotenv.config().parsed
export const db = mysql.createConnection({
    host: "localhost",
    user: ENV.DB_USER,
    password: ENV.DB_PW,
    database: 'blog'
})