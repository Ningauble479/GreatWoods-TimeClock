import express from 'express'
var routes = express.Router()
import ATC from'./addTimeClock.js'
import UB from './updateTimeBlock.js'

routes.post('/newClock', ATC)
routes.post ('/updateBlock', UB)
export default routes;