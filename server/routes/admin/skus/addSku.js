import SKU from '../../../models/skus.js'



export default async (req,res) => {
    try {
        let newSKU = new SKU({
            sku: req.body.sku,
            last: req.body.last
        })
        let data = await newSKU.save()
        return res.json({success: true, data: data})
    } catch (err) {
        return res.json({success: false, err: err})
    }
}