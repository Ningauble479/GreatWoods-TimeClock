import SKU from '../../../models/skus.js'



export default async (req,res) => {
    console.log(req.body)
    try {
        let data = await SKU.find(req.body.search)
        return res.json({success: true, data: data})
    } catch (err) {
        return res.json({success: false, err: err})
    }
}