
const fs = require('fs')


module.exports = async (req,res) => {
    console.log(req.body)
    try {
        const data = await fs.readFileSync(`jobs/${req.body.currentFolder}/${req.body.file}`)
        console.log(data)
        return res.json({success: true, data: data})
    } catch (err) {
        console.log(err)
    }
}