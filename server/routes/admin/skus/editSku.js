import SKU from '../../../models/skus.js'



export default async (req,res) => {
    try {
        let data = await SKU.findOneAndUpdate(req.body.search, req.body.update)
        return res.json({success: true, data: data})
    } catch (err) {
        return res.json({success: false, err: err})
    }
}