import timeSheet from '../../models/timeSheets.js'
import timeSheetDays from '../../models/timeSheetDays.js'
import timeBlock from '../../models/timeBlocks.js'
import {startOfWeek, endOfWeek, format} from 'date-fns'


let createNewTimeBlock = async (id, job, dayID, task) => {
    let data = await timeBlock.findOne({$and: [{user: id}, {job: job}, {task: task}]})
    console.log(data)
    if(!data){
    console.log('got here')
    let newTimeStamp = new timeBlock()
    newTimeStamp.user = id
    newTimeStamp.job = job
    newTimeStamp.task = task
    newTimeStamp.times = ''
    newTimeStamp.time = {
        hours: 0,
        minutes: 0,
        seconds: 0
    }
    newTimeStamp.save((err, data)=>{
        if(err) console.log(err)
        if(err) return {success: false, err: err}
        timeSheetDays.findOneAndUpdate({_id: dayID}, {$push: {blocks: data._id}}).exec((err)=>{
            if(err) return {success: false, err: err}
            return {success: true, msg: 'Time Stamp Created!'}
        })
    })
    } else {
        return {success: true, msg: 'Time Stamp Found!'}
    }
}


let createNewDay = async (id, timeSheetID, job, task) => {
    let newDay = new timeSheetDays()
    newDay.user = id
    newDay.day = format(new Date(), 'eeee')
    newDay.blocks = []
    newDay.save((err,data)=>{
        console.log(timeSheetID)
        if(err) return {success: false, err: err}
        timeSheet.findOneAndUpdate({_id: timeSheetID}, {$push: {days: data._id}}).exec((err, data)=>{
            if(err) return console.log(err)
        })
        createNewTimeBlock(id, job, data._id, task)
    })
}

export default async (req,res) => {
    let weekStart = format(startOfWeek(new Date(), {weekStartsOn: 1}), 'MM dd yyyy')
    let weekEnd = format(endOfWeek(new Date(), {weekStartsOn: 1}), 'MM dd yyyy')
    let week = `${weekStart} - ${weekEnd}`

    let data = await timeSheet.findOne({$and: [{user: req.body.id}, {week: week}]})
    if(data){
        let today = format(new Date(), 'eeee')
        let day = await timeSheetDays.findOne({$and: [{user: req.body.id}, {day: today}]})
        if(!day){
            let response = await createNewDay(req.body.id, data._id, req.body.job, req.body.task)
            return res.json(response)
        } else {
            let response = await createNewTimeBlock(req.body.id, req.body.job, data._id, req.body.task)
            return res.json(response)
        }
    }
    else {
        let newSheet = new timeSheet()
        let weekStart = format(startOfWeek(new Date(), {weekStartsOn: 1}), 'MM dd yyyy')
        let weekEnd = format(endOfWeek(new Date(), {weekStartsOn: 1}), 'MM dd yyyy')
        let week = `${weekStart} - ${weekEnd}`
        newSheet.user = req.body.id
        newSheet.week = week
        newSheet.days = []

        newSheet.save(async (err,data)=>{
            if(err) return res.json({success: false, err: err})
            let response = await createNewDay(req.body.id, data._id, req.body.job, req.body.task)
            return res.json(response)
        })
    }
    
}