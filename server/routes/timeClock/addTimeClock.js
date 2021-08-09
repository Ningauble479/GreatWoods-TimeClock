import timeSheet from '../../models/timeSheets.js'
import {startOfWeek, endOfWeek, format} from 'date-fns'

export default async (req,res) => {
    

    let data = await timeSheet.findOne({user: req.body.id})
    console.log(data)
    if(data){

    }
    else {
        let newSheet = new timeSheet()
        let weekStart = format(startOfWeek(new Date(), {weekStartsOn: 1}), 'MM dd yyyy')
        let weekEnd = format(endOfWeek(new Date(), {weekStartsOn: 1}), 'MM dd yyyy')
        let week = `${weekStart} - ${weekEnd}`
        newSheet.user = req.body.id
        newSheet.week = week
        newSheet.days = []

        newSheet.save((err)=>{
            if(err) return res.json({success: false, err: err})
            return res.json({success:true})
        })
    }
    
}