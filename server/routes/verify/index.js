import express from 'express'
var routes = express.Router()
import SPC from'./setPasscodes.js'
import VGW from './verifyGW.js'
import VK from './checkKey.js'

routes.post('/setCode', SPC)
routes.post('/verifyCode', VGW)
routes.post('/verifyKey', VK)

export default routes;