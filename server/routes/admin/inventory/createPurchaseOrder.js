import purchaseOrders from "../../../models/purchaseOrders.js"


export default async (req,res) => {
    try {
    let newOrder = new purchaseOrders(req.body.order)
    let data = await newOrder.save()
    return res.json({success: true, data: data})
    } catch (err) {return res.json({success: false, err: err})}
}