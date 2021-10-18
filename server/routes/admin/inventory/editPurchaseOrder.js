import purchaseOrders from "../../../models/purchaseOrders.js";


export default async (req,res) => {
    try {
        console.log(req.body)
        let data = await purchaseOrders.findOneAndUpdate(req.body.search, req.body.update)
        console.log(data)
        return res.json({success: true, data: data})
    } catch (err) {
        return res.json({success: false, err: err})
    }
}