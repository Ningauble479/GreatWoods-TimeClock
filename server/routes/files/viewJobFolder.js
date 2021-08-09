import fs from 'fs'

export default (req,res) => {
    console.log(req.body)
    try {
        fs.readdir(`./jobs/${req.body.folder}`, (err, files)=>{
            if(err) return console.log(err)
            return res.json({success: true, data: {filesNames: files}})
    })
}   catch(err) {
    return console.log(err)
}
}