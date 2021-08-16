import fs from 'fs'

export default async ( req,res ) => {

    try {
        fs.readdir(`./jobs/${req.body.job}`, (err,files)=>{
            if(err) return console.log(err)
            return res.json({success: true, folders: files})
        })
    } catch (err){
        return res.json({success: false, err: err})
    }
}