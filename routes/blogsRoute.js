const express = require('express')
const Blog = require('../models/blog')

const blogsRoute = express.Router()

// get all blogs from the database
blogsRoute.get('/blogs', (req, res) => {
  Blog.find().then(data => res.json(data))
})

// create a blog and insert it to the database
blogsRoute.post('/add-blog', (req, res) => {
  const blog = new Blog({
    title: req.body.title,
    body: req.body.body,
    author: req.body.author
  })
  blog.save()
  res.send('Blog created successfully!')
})

// get a single blog
blogsRoute.get('/blogs/:title', (req, res) => {
  Blog.findOne({ title: req.params.title }).then(blog => {
    if (blog === null) {
      res.json({ err: 'Blog not found!' })
    } else {
      res.json(blog)
    }
  })
})
module.exports = blogsRoute
