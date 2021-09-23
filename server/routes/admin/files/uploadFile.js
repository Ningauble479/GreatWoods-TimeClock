import fs from 'fs'
import path from 'path'
import multer from 'multer'

export default async (req,res) => {
console.log('test')
res.send('Test')
console.log(req.body)
console.log(req.body.jobPath)
let data2 = fs.readFileSync(`./temp/${req.body.fileName}`)
console.log(data2)
let data = await fs.renameSync(`./temp/${req.body.fileName}`, `./jobs/${req.body.jobPath}/${req.body.task}/${req.body.fileName}`)

}