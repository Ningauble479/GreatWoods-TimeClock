import passcodes from '../../models/passcodes.js'
import bcrypt from 'bcryptjs'


export default async (req,res) => {
    let data = await passcodes.findOne({level: req.body.level})
    console.log(req.body)
    console.log(data)
    if(!data) return res.json({success: false, err: 'Could not find a passcode'})
    bcrypt.compare(req.body.passcode, data.password, function (err, check){
        if(check == false) return res.json({success: false})
        return res.json({success: true, level: data.level})
    })
}