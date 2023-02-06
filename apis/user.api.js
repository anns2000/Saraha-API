const { signup, signin, checkContacts } = require('../service/user.service')
const { userValidation } = require('../validation/user.validation')

const app = require('express').Router()


app.post('/signup',userValidation,signup)
app.post('/signin',signin)
app.get('/check-contacts',checkContacts)



module.exports = app