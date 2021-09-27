import fs from 'fs'
import path from 'path'
import multer from 'multer'

export default async (req,res) => {
    // console.log('nextLine')
    console.log(req.body.fileName)
    console.log(req.body.fileName.length)
    if(!req.body.fileName.isArray) {
            let data2 = fs.readFileSync(`./temp/${req.body.fileName}`)
            let data = await fs.renameSync(`./temp/${req.body.fileName}`, `./jobs/${req.body.jobPath}/${req.body.task}/${req.body.fileName}`)
            return res.json({success: true})
    }
    req.body.fileName.map((file)=>{
            let data2 = fs.readFileSync(`./temp/${file}`)
            let data = fs.renameSync(`./temp/${file}`, `./jobs/${req.body.jobPath}/${req.body.task}/${file}`)
    })
    return res.json({success: true})
}