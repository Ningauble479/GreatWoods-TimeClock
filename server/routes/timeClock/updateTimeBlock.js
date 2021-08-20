import timeBlocks from "../../models/timeBlocks.js"

import {startOfWeek, endOfWeek, format} from 'date-fns'

export default async (req,res) => {

    try {
        let todayD = format(new Date(), 'MM dd yyyy')
        let data = await timeBlocks.findOneAndUpdate({$and: [{user: req.body.id}, {job: req.body.job, task: req.body.task, date: todayD}]}, {times: req.body.times, $inc: {'time.hours': req.body.time.hours, 'time.minutes': req.body.time.minutes, 'time.seconds': req.body.time.seconds}})
        return res.json({success: true, data: data})

    } catch (err) {
        console.log(err)
    return res.json({success: false, err: err})
}
}