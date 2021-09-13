import express from 'express'
var routes = express.Router()
import ATC from'./addTimeClock.js'
import UB from './updateTimeBlock.js'
import CI from './clockIn.js'
import ECD from './editClockDay.js'
import GCI from './getClockIn.js'

routes.post('/newClock', ATC)
routes.post ('/updateBlock', UB)
routes.post('/clockIn', CI)
routes.post('/editClockDay', ECD)
routes.post('/getClockIn', GCI)

export default routes;