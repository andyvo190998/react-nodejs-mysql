import { db } from '../db.js'

export const addPost = (req, res) => {
    console.log('get')
    res.json({ test: "from controller" })
}

export const getPosts = (req, res) => {
    const query = req.query.cat ? "SELECT * FROM posts WHERE cat=?" : "SELECT * FROM posts"
    console.log(req.query)
    db.query(query, [req.query.cat], (err, data) => {
        if (err) return res.json(err)

        return res.status(200).json(data)
    })
}

export const getPost = (req, res) => {
    const postId = req.params.id
    const query = "SELECT * FROM posts WHERE id = ?"
    db.query(query, [postId], (err, data) => {
        if (err) return res.json(err)
        if (data.length === 0) return res.json('Can not find this post!')

        return res.status(200).json(data[0])
    })
}

export const deletePost = (req, res) => {
    console.log('get')
    res.json({ test: "from controller" })
}

export const updatePost = (req, res) => {
    console.log('get')
    res.json({ test: "from controller" })
}