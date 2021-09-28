import fs from 'fs'
import path from 'path'
import multer from 'multer'

export default async (req,res) => {
    // console.log('nextLine')
    console.log(req.body.fileName)
    console.log(req.body.fileName.length)
    if(!Array.isArray(req.body.fileName)) {
        console.log('not array')
        console.log(req.body.fileName)
        const fileName = req.body.fileName.toLowerCase().split(' ').join('-');
            let data2 = fs.readFileSync(`./temp/${fileName}`)
            let data = await fs.renameSync(`./temp/${fileName}`, `./jobs/${req.body.jobPath}/${req.body.task}/${req.body.fileName}`)
            return res.json({success: true})
    }
    req.body.fileName.map((file)=>{
        console.log('array')
        console.log(file)
        const fileName = file.toLowerCase().split(' ').join('-');
            let data2 = fs.readFileSync(`./temp/${fileName}`)
            let data = fs.renameSync(`./temp/${fileName}`, `./jobs/${req.body.jobPath}/${req.body.task}/${fileName}`)
    })
    return res.json({success: true})
}