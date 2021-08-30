import express from 'express'
var routes = express.Router()
import SPC from'./setPasscodes.js'
import VGW from './verifyGW.js'

routes.post('/setCode', SPC)
routes.post ('/verifyCode', VGW)

export default routes;