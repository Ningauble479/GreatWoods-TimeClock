var express = require('express')
var routes = express.Router()
const ATC = require('./addTimeClock')

routes.post('/addTimeClock', ATC)

module.exports = routes;