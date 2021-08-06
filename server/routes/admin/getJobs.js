
const jobs = require('../../models/jobs')


module.exports = async ( req,res ) => {
    
    let data = await jobs.find(req.body.args)
    return res.json({success: true, data: data})
}