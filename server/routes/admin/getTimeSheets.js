import timeSheets from "../../models/timeSheets.js";
import timeBlocks from "../../models/timeBlocks.js";
import timeSheetDays from "../../models/timeSheetDays.js";

import {startOfWeek, endOfWeek, format} from 'date-fns'



export default async (req,res) => {
    
    let weekStart = format(startOfWeek(new Date(), {weekStartsOn: 1}), 'MM dd yyyy')
    let weekEnd = format(endOfWeek(new Date(), {weekStartsOn: 1}), 'MM dd yyyy')
    let week = `${weekStart} - ${weekEnd}`
    console.log(week)
    console.log(req.body.id)
    timeSheets.findOne(req.body.query).populate({
        path: 'days user',
        populate: {
            path: 'blocks'
        }})
        .exec((err,data) => {
            if(err) return console.log(err)
            return res.json({success: true, data: data})})
}