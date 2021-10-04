import purchaseOrders from "../../../models/purchaseOrders.js";


export default async (req,res) => {
    try {
        let data = await purchaseOrders.findOneAndUpdate(req.body.search, req.body.update)
        return res.json({success: true, data: data})
    } catch (err) {
        return res.json({success: true, err: err})
    }
}