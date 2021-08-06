let users = require('../../models/users')

module.exports = async (req,res) => {
    try {
    let data = await users.find(req.body.arg)
    return res.json({success: true, data: data})
} catch (err) {
    return res.json({success: false, err: err})
}
}