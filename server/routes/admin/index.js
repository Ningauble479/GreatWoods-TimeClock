import express from 'express'
var routes = express.Router()
import AU from './addUser.js'
import GA from './getAccounts.js'
import ST from './createFolderTemplates.js'
import GT from './getTemplates.js'
import CJ from './createJob.js'
import GJ from './getJobs.js'
import GTS from './getTimeSheets.js'
import GTSD from './getTimeSheetDay.js'
import GTSJ from './getTimeSheetJob.js'
import UJ from './updateJob.js'
import NC from './client/addClient.js'
import GC from './client/getClients.js'
import UF from './files/uploadFile.js'
import CTP from './thirdParties/createThirdParty.js'
import ETP from './thirdParties/editThirdParty.js'
import GTP from './thirdParties/getThirdParties.js'
import EDITC from './client/editClient.js'
import multer from 'multer'
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        
    cb(null, `temp/`)
  },
  filename: function (req, file, cb) {
    console.log('test')
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    

    cb(null, fileName )
  }
})
var upload = multer({
   storage: storage,
})
//User Routes
routes.post('/addUser', AU)
routes.post('/getAccounts', GA)
//Template Routes
routes.post('/setTemplate', ST)
routes.get('/getTemplates', GT)
//Time Sheet Routes
routes.post('/getTimeSheets', GTS)
routes.post('/getTimeSheetDay', GTSD)
routes.post('/getTimeSheetJob', GTSJ)
// Job Routes
routes.post('/updateJobs', UJ)
routes.post('/createJob', CJ)
routes.post('/getJobs', GJ)
// Client Routes
routes.post('/newClient', NC)
routes.post('/getClients', GC)
routes.post('/editClient', EDITC)
// File Upload Route
routes.post('/uploadFile', upload.array('file', 3), UF)
// Third Party Routes
routes.post('/createThirdParty', CTP)
routes.post('/editThirdParty', ETP)
routes.post('/getThirdParty', GTP)

export default routes;