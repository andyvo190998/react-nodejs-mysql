import { db } from '../db.js'

export const addPost = (req, res) => {
    const { title, description, cat, img, user_id } = req.body
    // const insertUserQuery = "INSERT INTO users(`username`, `email`, `password`) VALUES (?)"
    const query = 'INSERT INTO posts(`title`, `description`, `img`, `date`, `user_id`, `cat`) VALUES (?)'
    const values = [title, description, img, new Date(), user_id, cat]
    console.log(values)
    db.query(query, [values], (err, data) => {
        if (err) return res.status(404).json(err)
        return res.status(200).json('Post successfully!')
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
    const postId = req.params.id
    console.log(postId)
    const query = "DELETE FROM posts WHERE id = ?"

    db.query(query, [postId], (err, data) => {
        if (err) return res.status(404).json(err)
        return res.status(200).json('Delete Success')
    })
}

export const updatePost = (req, res) => {
    console.log('get')
    res.json({ test: "from controller" })
}