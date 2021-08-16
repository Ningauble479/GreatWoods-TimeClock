import timeBlocks from "../../models/timeBlocks.js"


export default async (req,res) => {
    try {
        console.log(req.body.time)
        console.log(req.body.times)
        console.log(req.body.id)
        let data = await timeBlocks.findOneAndUpdate({$and: [{user: req.body.id}, {job: req.body.job, task: req.body.task}]}, {times: req.body.times, $inc: {'time.hours': req.body.time.hours, 'time.minutes': req.body.time.minutes, 'time.seconds': req.body.time.seconds}})
        console.log(data)
        return res.json({success: true, data: data})

    } catch (err) {
        console.log(err)
    return res.json({success: false, err: err})
}
}