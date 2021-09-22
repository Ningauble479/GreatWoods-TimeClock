import jobs from '../../models/jobs.js'
import fs from 'fs'
import templates from '../../models/jobTemplates.js'
import client from '../../models/customers.js'
export default async (req,res) => {
    let newJob = new jobs()

    newJob.folderTemplate = req.body.selectedTemplate
    newJob.jobName = req.body.jobName
    newJob.worker = []
    newJob.timeSheets = []
    newJob.client = req.body.client
    newJob.address = req.body.address
    newJob.lockBox = req.body.lockBox
    newJob.contractor = req.body.contractor
    newJob.supervisor = req.body.supervisor
    newJob.superPhone = req.body.superPhone
    newJob.designer = req.body.designer
    newJob.active = true



    let data = await templates.findOne({_id: req.body.selectedTemplate})
    data.folders.map((row)=>{
        let directory = `jobs/${req.body.jobName}/${row.folderName}/`
        if(!row.nestedFolders){
            fs.mkdirSync(directory, {recursive: true})
        } else {
        row.nestedFolders.map((row)=>{
            fs.mkdirSync(directory + row, {recursive: true})
        })}
    })


    newJob.save((err,data)=>{
        templates.findOneAndUpdate({_id: req.body.selectedTemplate}, {$push: {jobs: data._id}}).exec()
        client.findOneAndUpdate({_id: req.body.client}, {$push: {jobs: data._id}}).exec()
        if(err) return res.json({success: false, err: err})
        return res.json({success: true, data: data})
    })


}