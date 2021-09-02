import clockDay from '../../models/clockDay.js'
import { format } from 'date-fns'
export default async (req,res) => {
    let today = format(new Date(), 'MM dd yyyy')
    let clock = await clockDay.findOne({$and: [{user: req.body.id},{day: today}]})
    console.log(clock)
    if(clock) return res.json({success: false, err: 'Already found a clock'})
    let newDay = new clockDay({
        user: req.body.id,
        day: req.body.day,
        clockIn: req.body.clockIn,
        lunchIn: null,
        lunchOut: null,
        clockOut: null
    })

    newDay.save((err)=>{
        if(err) return res.json({success: false, err: err})
        return res.json({success: true})
    })
}