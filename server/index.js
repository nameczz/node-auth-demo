const config = require('../config/index')
const mongoose = require('mongoose')
const usersRoute = require('./routes/user.js')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
//use config module to get the privatekey, if no private key set, end the application
if (!config.myprivatekey) {
  console.error('FATAL ERROR: myprivatekey is not defined.')
  process.exit(1)
}

//connect to mongodb
mongoose
  .connect('mongodb://localhost:27017/nodejsauth', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'))

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
//use users route for api/users
app.use('/api/users', usersRoute)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))
