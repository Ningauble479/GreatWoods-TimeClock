import express from 'express'
var routes = express.Router()
import ATC from'./addTimeClock.js'
import UB from './updateTimeBlock.js'
import CI from './clockIn.js'
import ECD from './editClockDay.js'

routes.post('/newClock', ATC)
routes.post ('/updateBlock', UB)
routes.post('/clockIn', CI)
routes.post('/editClockDay', ECD)

export default routes;