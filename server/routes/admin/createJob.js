let jobs = require('../../models/jobs')


module.exports = async (req,res) => {
    let newJob = new jobs()

    newJob.folderTemplate = req.body.selectedTemplate
    newJob.jobName = req.body.jobName
    newJob.worker = []
    newJob.timeSheets = []
    newJob.client = req.body.client
    newJob.address = req.body.address
    newJob.phone = req.body.phone
    newJob.email = req.body.email
    newJob.lockBox = req.body.lockBox
    newJob.contractor = req.body.contractor
    newJob.billing = req.body.billing
    newJob.supervisor = req.body.supervisor
    newJob.superPhone = req.body.superPhone
    newJob.designer = req.body.designer

    newJob.save((err,data)=>{
        if(err) return res.json({success: false, err: err})
        return res.json({success: true, data: data})
    })


}