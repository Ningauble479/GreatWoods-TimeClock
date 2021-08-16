
import fs from 'fs'


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
        const data = await fs.readFileSync(`./${req.body.path}`)
        console.log(data)
        return res.json({success: true, type: 'file', data: data})
    } catch (err) {
        console.log(err)
    }
}