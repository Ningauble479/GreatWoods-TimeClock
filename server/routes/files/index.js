import express from 'express'
var routes = express.Router()
import GFP from './getFilesPaths.js'
import GF from './viewJobFolder.js'
import GetFile from './getFile.js'
import GJF from './getJobFolders.js'

routes.get('/getFilePaths', GFP)
routes.post('/getFiles', GF)
routes.post('/getFile', GetFile)
routes.post('/getJobFolders', GJF)

export default routes;