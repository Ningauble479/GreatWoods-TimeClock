
import jobs from '../../models/jobs.js'


export default async ( req,res ) => {
    
    let data = await jobs.find(req.body.args).populate("client contractor supervisor designer folderTemplate finishers installers")
    return res.json({success: true, data: data})
}