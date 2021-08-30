import passcode from '../../models/passcodes.js'



export default async (req,res) => {
    let newCode = new passcode ({
        password: 'Welcome321!',
        level: 'floor'
    })

    newCode.save((err)=>{
        if(err) return res.json({success: false, err: err})
        return res.json({success: true})
    })
}