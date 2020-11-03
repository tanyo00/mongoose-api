const express = require('express')
const mongoose = require('mongoose')
const usersRoute = require('./routes/usersRoute')
const blogsRoute = require('./routes/blogsRoute')
const helmet = require('helmet')
const cors = require('cors')

const mongoURI =
  'mongodb+srv://tanyo:Tanyo.0042134369@cluster0.ec0yt.gcp.mongodb.net/mongoose-test?retryWrites=true&w=majority'

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('DB connected!'))
  .catch(err => console.log(err))

const app = express()

// Middlewares
app.use(helmet())
app.use(cors())
app.use(express.json())

app.use('/', usersRoute)
app.use('/', blogsRoute)

const PORT = 5000

app.get('/', (req, res) => {
  res.redirect('/users')
})

app.listen(PORT, err => {
  if (err) throw err
  console.log(`Server running on port: ${PORT}`)
})
