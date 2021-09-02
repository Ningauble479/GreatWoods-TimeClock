import clockDay from "../../models/clockDay.js"
import { format } from 'date-fns'


export default async (req,res) => {
    let today = format(new Date(), 'MM dd yyyy')
    clockDay.findOneAndUpdate({$and: [{user: req.body.id}, {day: today}]}, req.body.update).exec((err)=>{
        if(err) return res.json({success: false, err: err})
        return res.json({success: true})
    })
}