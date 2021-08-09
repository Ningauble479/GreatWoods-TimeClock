import jobTemplates from '../../models/jobTemplates.js'

export default async (req,res) => {
    let data = await jobTemplates.find()
    return res.json({success: true, data: data})
}