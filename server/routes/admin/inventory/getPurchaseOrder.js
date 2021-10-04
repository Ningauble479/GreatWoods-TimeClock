import purchaseOrders from "../../../models/purchaseOrders.js";

export default async (req,res) => {
    try {
        let data = await purchaseOrders.find(req.body.search)
        return res.json({success: true, data: data})
    } catch (err) {
        return res.json({success: false, err:err})
    }
}