let jobTemplates = require('../../models/jobTemplates')

module.exports = async (req,res) => {

    let newTemplate = new jobTemplates()

    newTemplate.folders = req.body.folders
    newTemplate.foldersNested = req.body.folders.length
    newTemplate.jobs = []
    newTemplate.name = req.body.templateName

    newTemplate.save((err, newTemplate)=>{
        if(err) return res.json({success: false, err: err})
        return res.json({success: true, data: newTemplate})
    })

    
}