import jobs from "../../models/jobs.js"





export default async (req,res) => {
    try {
    console.log(req.body)
    let update = {}
    if(req.body.update.client) update.client = req.body.update.client
    if(req.body.update.lockBox) update.lockBox = req.body.update.lockBox
    if(req.body.update.contractor) update.contractor = req.body.update.contractor
    if(req.body.update.supervisor) update.supervisor = req.body.update.supervisor
    if(req.body.update.superPhone) update.superPhone = req.body.update.superPhone
    if(req.body.update.designer) update.designer = req.body.update.designer
    if(req.body.update.finishers) update.finishers = req.body.update.finishers
    if(req.body.update.installers) update.installers = req.body.update.installers
    if(req.body.update.installDate) update.installDate = req.body.update.installDate
    if(req.body.update.active === true) update.active = true
    if(req.body.update.active === false) update.active = false
    await update
    console.log(update)
    let data = await jobs.findOneAndUpdate({_id: req.body.id}, update, {new: true}).exec()
    console.log(data)
    return res.json({success: true, data: data})
} catch (err) {
    return res.json({success: false, err: err})
}

}