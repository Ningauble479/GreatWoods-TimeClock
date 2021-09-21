import passcodes from '../../models/passcodes.js'
import bcrypt from 'bcryptjs'


export default async (req,res) => {
    let data = await passcodes.find()
    if(!req.body.passcode || req.body.passcode == 0) return res.json({success: false})
    console.log(req.body)
    console.log(data)
    if(!data) return res.json({success: false, err: 'Could not find a passcode'})
    let test = await Promise.all(data.map(async (row)=>{
        let test2 = await bcrypt.compare(req.body.passcode, row.password)
        if(test2) return {success: true, level: row.level}
    }))
    console.log(test)
    if(test[0] === undefined && test[1] === undefined) return res.json({success: false})
    if(test[0] != undefined && test[0].success) return res.json(test[0])
    if(test[1].success) return res.json(test[1])
}