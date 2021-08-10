import timeBlocks from "../../models/timeBlocks.js"


export default async (req,res) => {
    try {
        let data = timeBlocks.findOneAndUpdate({user: req.body.id}, {$push: {times: req.body.times}, $inc: {time: req.body.time}})

        return res.json({success: true, data: data})

    } catch (err) {
    return res.json({success: false, err: err})
}
}