const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const usersRoute = express.Router()

// get all users
usersRoute.get('/users', (req, res) => {
  User.find().then(data => res.json(data))
})

// create user and insert it to the database
usersRoute.post('/add-user', (req, res) => {
  const password = req.body.password

  const salt = bcrypt.genSaltSync(10)
  let hashed = bcrypt.hashSync(password, salt)

  const user = new User({
    name: req.body.name,
    password: hashed,
    email: req.body.email
  })
  user.save()
  res.send('User created successfully!')
})

// get a single user
usersRoute.get('/users/:name', (req, res) => {
  User.findOne({ name: req.params.name }).then(user => {
    if (user === null) {
      res.json({ err: 'User not found!' })
    } else {
      res.json(user)
    }
  })
})

module.exports = usersRoute
