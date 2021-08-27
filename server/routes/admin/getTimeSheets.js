import timeSheets from "../../models/timeSheets.js";
import timeBlocks from "../../models/timeBlocks.js";
import timeSheetDays from "../../models/timeSheetDays.js";

import {startOfWeek, endOfWeek, format} from 'date-fns'



export default async (req,res) => {
    timeSheets.find(req.body.query).populate({
        path: 'days user',
        populate: {
            path: 'blocks'
        }})
        .exec((err,data) => {
            if(err) return console.log(err)
            return res.json({success: true, data: data})})
}