const { athu } = require('../meddle/athu')
const { getMessages, sendMessage } = require('../service/message.service')

const app = require('express').Router()
app.post('/',sendMessage)
app.get('/',getMessages)

module.exports = app