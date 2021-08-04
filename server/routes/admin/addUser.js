const users = require('../../models/users')

module.exports = async (req,res) => {
    console.log('test')
    let newUser = new users()

    newUser.userName = req.body.username
    newUser.password = req.body.password
    newUser.jobTitle = req.body.jobtitle
    newUser.admin = req.body.admin
    newUser.clockedIn = false

    newUser.save((err)=>{
        if(err) return res.json({success: false, err: err})
        return res.json({success: true})
    })


}