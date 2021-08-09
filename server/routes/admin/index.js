import express from 'express'
var routes = express.Router()
import AU from './addUser.js'
import GA from './getAccounts.js'
import ST from './createFolderTemplates.js'
import GT from './getTemplates.js'
import CJ from './createJob.js'
import GJ from './getJobs.js'

routes.post('/addUser', AU)
routes.post('/getAccounts', GA)
routes.post('/setTemplate', ST)
routes.get('/getTemplates', GT)
routes.post('/createJob', CJ)
routes.post('/getJobs', GJ)


export default routes;