import timeSheet from '../../models/timeSheets.js'
import timeSheetDays from '../../models/timeSheetDays.js'
import timeBlock from '../../models/timeBlocks.js'
import {startOfWeek, endOfWeek, format} from 'date-fns'


// things Needed Week, userID, Job, Task, Day

let createNewTimeBlock = async (id, job, dayID, task, time, day) => {
    console.log(task)
    let todayD = format(new Date(), 'MM dd yyyy')
    let data = await timeBlock.findOne({$and: [{user: id}, {job: job}, {task: task}, {date: todayD}]})
    if(!data){
    let newTimeStamp = new timeBlock()
    newTimeStamp.user = id
    newTimeStamp.job = job
    newTimeStamp.task = task
    newTimeStamp.times = ''
    if(time) {
        newTimeStamp.time = {
            hours: time.hours,
            minutes: time.minutes,
            seconds: time.seconds
        }
    }
    else {newTimeStamp.time = {
        hours: 0,
        minutes: 0,
        seconds: 0
    }}
    if(day) newTimeStamp.date = day
    else {newTimeStamp.date = format(new Date(), 'MM dd yyyy')}
    newTimeStamp.save((err, data)=>{
        console.log('here')
        if(err) console.log(err)
        if(err) return {success: false, err: err}
        console.log(dayID)
        console.log(data._id)
        timeSheetDays.findOneAndUpdate({_id: dayID}, {$push: {blocks: data._id}}).exec((err, data2)=>{
            if(err) return {success: false, err: err}
            console.log({updated: data2})
            return {success: true, msg: 'Time Stamp Created!'}
        })
    })
    } else {
        console.log('whut')
        return {success: true, msg: 'Time Stamp Found!'}
    }
}


let createNewDay = async (id, timeSheetID, job, task, time, day, dayName) => {
    let newDay = new timeSheetDays()
    newDay.user = id
    if(!dayName)newDay.day = format(new Date(), 'eeee')
    else{newDay.day = dayName}
    newDay.blocks = []
    if(!day)newDay.date = format(new Date(), 'MM dd yyyy')
    else{newDay.date = day}
    newDay.save((err,data)=>{
        console.log(timeSheetID)
        if(err) return {success: false, err: err}
        timeSheet.findOneAndUpdate({_id: timeSheetID}, {$push: {days: data._id}}).exec((err, data)=>{
            if(err) return console.log(err)
        })
        createNewTimeBlock(id, job, data._id, task, time, day)
    })
}

export default async (req,res) => {
    let weekStart = format(startOfWeek(new Date(), {weekStartsOn: 1}), 'MM dd yyyy')
    let weekEnd = format(endOfWeek(new Date(), {weekStartsOn: 1}), 'MM dd yyyy')
    let week = `${weekStart} - ${weekEnd}`
    if(req.body.week) week = req.body.week
    let data = await timeSheet.findOne({$and: [{user: req.body.id}, {week: week}]})
    if(data){
        let today = format(new Date(), 'eeee')
        if(req.body.dayName) today = req.body.dayName
        let todayDate = format(new Date(), 'MM dd yyyy')
        if(req.body.day) todayDate = req.body.day
        let day = await timeSheetDays.findOne({$and: [{user: req.body.id}, {day: today}, {date: todayDate}]})
        if(!day){
            let response = await createNewDay(req.body.id, data._id, req.body.job, req.body.task, req.body.time, req.body.day, req.body.dayName)
            return res.json(response)
        } else {
            let response = await createNewTimeBlock(req.body.id, req.body.job, day._id, req.body.task, req.body.time, req.body.day)
            return res.json(response)
        }
    }
    else {
        let newSheet = new timeSheet()
        let weekStart = format(startOfWeek(new Date(), {weekStartsOn: 1}), 'MM dd yyyy')
        let weekEnd = format(endOfWeek(new Date(), {weekStartsOn: 1}), 'MM dd yyyy')
        let week = `${weekStart} - ${weekEnd}`
        newSheet.user = req.body.id
        if(!req.body.week) newSheet.week = week
        else {newSheet.week = req.body.week}
        newSheet.days = []

        newSheet.save(async (err,data)=>{
            if(err) return res.json({success: false, err: err})
            let response = await createNewDay(req.body.id, data._id, req.body.job, req.body.task, req.body.time, req.body.day, req.body.dayName)
            return res.json(response)
        })
    }
    
}