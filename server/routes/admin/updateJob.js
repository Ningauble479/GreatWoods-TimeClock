import jobs from "../../models/jobs.js"





export default async (req,res) => {

    let data = await jobs.findOneAndUpdate({_id: req.body.id}, req.body.update)
    return res.json({success: true, data: data})

}