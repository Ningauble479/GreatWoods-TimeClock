let jobTemplates = require('../../models/jobTemplates')

module.exports = async (req,res) => {
    let data = await jobTemplates.find()
    return res.json({success: true, data: data})
}