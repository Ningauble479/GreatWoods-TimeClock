import client from '../../../models/customers.js'


export default async (req,res) => {
    console.log('what')
    try {
        let data = await client.findOneAndUpdate(req.body.search, req.body.update, {new: true})
        console.log(data)
        return res.json({success: true, data: data})
    } catch (err) {
        console.log(err)
        return res.json({success: false, err: err})
    }
}