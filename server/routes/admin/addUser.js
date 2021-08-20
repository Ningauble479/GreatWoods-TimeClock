import users from '../../models/users.js'

export default async (req,res) => {
    console.log('test')
    let newUser = new users()

    newUser.userName = req.body.username
    newUser.jobTitle = req.body.jobtitle
    newUser.clockedIn = false

    newUser.save((err)=>{
        if(err) return res.json({success: false, err: err})
        return res.json({success: true})
    })


}