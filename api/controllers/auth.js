import { db } from '../db.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = (req, res) => {
    const query = "SELECT * FROM users WHERE email = ? OR username = ?"
    db.query(query, [req.body.email, req.body.username], (err, data) => {
        //CHECK EXISTING USER
        if (err) return res.json(err)
        if (data.length !== 0) return res.status(409).json("User already exists!")

        //IF DATA.LENGTH === 0 => USER NOT EXISTS
        //HASH PASSWORD AND CREATE A USER
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)

        const insertUserQuery = "INSERT INTO users(`username`, `email`, `password`) VALUES (?)"
        const values = [
            req.body.username,
            req.body.email,
            hash
        ]

        db.query(insertUserQuery, [values], (err, data) => {
            if (err) return res.json(err)
            return res.status(200).json("User has been created.")
        })
    })
}

export const login = (req, res) => {
    //CHECK USER
    const query = "SELECT * FROM users WHERE username = ?"
    db.query(query, [req.body.username], (err, data) => {
        if (err) return res.json(err)
        if (data.length === 0) return res.status(404).json("User not found!")
        //CHECK PASSWORD
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password)

        if (!isPasswordCorrect) return res.status(400).json("Wrong user name or password")

        const token = jwt.sign({ id: data[0].id }, "secret-key")
        //send everything about user except password
        const { password, ...other } = data[0]
        const expirationTime = 10 * 60 * 1000; //1 minutes in milliseconds
        const expiryDate = new Date(Date.now() + expirationTime);

        res.cookie("access_token", token, {
            httpOnly: false,
            expires: expiryDate,
        }).status(200).json(other)

    })
}


export const logout = (req, res) => {
    res.clearCookie('access_token', {
        samSite: 'none',
        secure: true
    }).status(200).json("User has been logged out!")
}