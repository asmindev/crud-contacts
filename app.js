const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { body, validationResult, check } = require('express-validator')
const Contact = require('./models/Contact')
require('dotenv').config()


const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(cors())
app.get('/', (req, res) => {
  res.json({ message: 'Selamat datang Di Web server nodejs' })
})
app.get('/api/contact', async (req, res) => {
  res.statusCode = 200
  const contacts = await Contact.find()
  res.json(contacts)
})
app.post(
  '/api/contact',
  [
    check('email', 'Email tidak valid').isEmail(),
    check('phone', 'Nomor Handphone tidak valid').isMobilePhone('id-ID'),
  ],
  (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.json(errors)
    } else {
      const { body } = req
      res.statusCode = 200
      const result = Contact.insertMany(body)
      return res.json(result)
    }
  }
)
app.delete('/api/contact/', async (req, res) => {
  const { _id } = req.body
  res.statusCode = 200
  result = await Contact.findByIdAndDelete({_id: _id})
  return res.json({status: 'ok'})
})
app.put(
  '/api/contact',
  [
    check('email', 'email tidak valid').isEmail(),
    check('phone', 'nomor handphone tidak valid').isMobilePhone('id-ID'),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.json(errors)
    } else {
      res.statusCode = 200
      const data = await Contact.findByIdAndUpdate(req.body._id, req.body)
      console.log(data)
      return res.json(data)
    }
  }
)
app.listen(port, () => {
  require('./database/')
  console.log('Server is listening on port ' + port)
})
