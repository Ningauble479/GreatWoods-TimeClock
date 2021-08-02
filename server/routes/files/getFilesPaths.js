const fs = require('fs')

module.exports = async (req,res) => {
try {
    fs.readdir('./jobs', (err, files)=>{
        if(err) return console.log(err)
        return res.json({success: true, folders: files})
    })
} catch (err) {
    return console.log(err)
}
}