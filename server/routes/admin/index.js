var express = require('express')
var routes = express.Router()
const AU = require('./addUser')

routes.post('/addUser', AU)

module.exports = routes;