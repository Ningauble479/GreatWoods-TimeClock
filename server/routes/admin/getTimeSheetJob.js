import timeBlocks from "../../models/timeBlocks.js"



export default async (req,res) => {
    let data = await timeBlocks.find(req.body.query).populate('user').exec()
    return res.json({success: true, data: data})
}