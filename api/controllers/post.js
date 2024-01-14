import { db } from '../db.js'
import jwt from 'jsonwebtoken'

export const addPost = (req, res) => {
    const { title, description, cat, img, user_id } = req.body
    // const insertUserQuery = "INSERT INTO users(`username`, `email`, `password`) VALUES (?)"
    const query = 'INSERT INTO posts(`title`, `description`, `img`, `date`, `user_id`, `cat`) VALUES (?)'
    const values = [title, description, img, new Date(), user_id, cat]
    db.query(query, [values], (err, data) => {
        if (err) return res.status(404).json(err)
        return res.status(200).json(data)
    })
}

export const getPosts = (req, res) => {
    const query = req.query.cat ? "SELECT * FROM posts WHERE cat=?" : "SELECT * FROM posts"
    db.query(query, [req.query.cat], (err, data) => {
        if (err) return res.status(404).json(err)
        return res.status(200).json(data)
    })
}

export const getPost = (req, res) => {
    const postId = req.params.id
    const query = " SELECT `username`, `title`, `description`, posts.img, `cat`, `date`, `user_id` FROM users JOIN posts ON users.id = posts.user_id WHERE posts.id = ?"
    db.query(query, [postId], (err, data) => {
        if (err) return res.status(404).json(err)
        if (data.length === 0) return res.status(404).json('Can not find this post!')

        return res.status(200).json(data[0])
    })
}

export const deletePost = (req, res) => {
    const token = req.cookies.access_token

    if (!token) return res.status(401).json("Not authenticated!")

    jwt.verify(token, 'secret-key', (err, user) => {
        if (err) return res.status(403).json("Token is not valid")

        const postId = req.params.id
        const query = "DELETE FROM posts WHERE `id` = ? AND `user_id` = ?"

        db.query(query, [postId, user.id], (err, data) => {
            if (err) return res.status(403).json(err)
            if (data.affectedRows === 0) return res.status(401).json('Unauthorized!')
            return res.status(200).json('Delete Success')
        })

    })

}

export const updatePost = (req, res) => {
    const postId = req.params.id
    const updateContent = req.body
    const token = req.cookies.access_token
    const query = 'UPDATE posts SET ? WHERE `id` = ? AND `user_id` = ?'

    if (!token) return res.status(403).json("Token is not valid")

    jwt.verify(token, 'secret-key', (err, user) => {
        if (err) return res.status(404).json(err)

        db.query(query, [updateContent, postId, user.id], (err, data) => {
            if (data.affectedRows === 0) return res.status(401).json('Unauthorized')
            if (err) return res.status(404).json(err)
            return res.status(200).json('Update Success')
        })
    })
}