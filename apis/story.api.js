const { athu } = require('../meddle/athu')
const { publishStory, getStorys } = require('../service/story.service')

const app = require('express').Router()


app.post('/',athu,publishStory)
app.get('/',athu,getStorys)



module.exports = app