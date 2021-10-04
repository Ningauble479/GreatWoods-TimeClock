import inventory from "../../../models/inventory.js"

export default async (req,res) => {
    try {
    let newItem = new inventory(req.body.item)
    let data = await newItem.save()
    return res.json({success: true, data: data})
} catch (err){
    return res.json({success: false, err: err})
}
}