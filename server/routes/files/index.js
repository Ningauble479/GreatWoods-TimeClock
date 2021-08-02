var express = require('express')
var routes = express.Router()
const GFP = require('./getFilesPaths')
const GF = require('./viewJobFolder')
const GetFile = require('./getFile')

routes.get('/getFilePaths', GFP)
routes.post('/getFiles', GF)
routes.post('/getFile', GetFile)

module.exports = routes;