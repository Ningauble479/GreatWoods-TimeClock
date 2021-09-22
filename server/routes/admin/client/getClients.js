import clients from '../../../models/customers.js'


export default async (req,res) => {
    try {
        let data = await clients.find(req.body.search).populate('jobs').exec()
        return res.json({success: true, data: data})
    } catch (err) {
    return res.json({success: false, err: err})}
}