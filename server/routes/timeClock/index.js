import express from 'express'
var routes = express.Router()
import ATC from'./addTimeClock.js'

routes.post('/newClock', ATC)

export default routes;