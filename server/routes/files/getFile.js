
import fs from 'fs'
import path from 'path'

export default async (req,res) => {
    if(fs.lstatSync(`./${req.body.path}`).isDirectory()){
        try {
            let data = fs.readdirSync(`./${req.body.path}`)
            return res.json({success: true, type: 'dir', folders: data})
        } catch (err) {
            return res.json({success: false, err: err})
        }
    }
    try {
        const ext = path.extname(`./${req.body.path}`)
        const data = await fs.readFileSync(`./${req.body.path}`)
        console.log(ext)
        
        return res.json({success: true, type: ext, data: data})
    } catch (err) {
        console.log(err)
    }
}