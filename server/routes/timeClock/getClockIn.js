import clockDay from '../../models/clockDay.js'



export default async (req,res) => {
    let data = await clockDay.find(req.body.search).populate('user')
    if(!data) return res.json({success: false, msg: 'No Clock Found'})
    return res.json({success: true, data: data})
}