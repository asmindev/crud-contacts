const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { body, validationResult, check } = require('express-validator')

const contact = require('./database/contact.js')

const app = express()
const port = 8000

app.use(bodyParser.json())
app.use(cors())
app.get('/', (req, res) => {
  res.json({ message: 'Selamat datang Di Web server nodejs' })
})
app.get('/api/contact', (req, res) => {
  res.statusCode = 200
  res.json(contact.loadContacts())
})
app.post(
  '/api/contact',
  [
    check('email', 'Email tidak valid').isEmail(),
    check('number', 'Nomor Handphone tidak valid').isMobilePhone('id-ID'),
  ],
  (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.json(errors)
    } else {
      const { body } = req
      res.statusCode = 200
      return res.json(contact.addNewContact(body))
    }
  }
)
app.delete('/api/contact/', (req, res) => {
  const { id } = req.body
  console.log(req.body)
  res.statusCode = 200
  return res.json(contact.deleteContact(id))
})
app.put(
  '/api/contact',
  [
    check('email', 'email tidak valid').isEmail(),
    check('number', 'nomor handphone tidak valid').isMobilePhone('id-ID'),
  ],
  (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.json(errors)
    } else {
      res.statusCode = 200
      return res.json(contact.editContact(req.body))
    }
  }
)
app.listen(port, () => {
  console.log('Server is listening on port ' + port)
})
