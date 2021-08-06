var express = require('express')
var routes = express.Router()
const AU = require('./addUser')
const GA = require('./getAccounts')
const ST = require('./createFolderTemplates')
const GT = require('./getTemplates')
const CJ = require('./createJob')
const GJ = require('./getJobs')

routes.post('/addUser', AU)
routes.post('/getAccounts', GA)
routes.post('/setTemplate', ST)
routes.get('/getTemplates', GT)
routes.post('/createJob', CJ)
routes.post('/getJobs', GJ)


module.exports = routes;