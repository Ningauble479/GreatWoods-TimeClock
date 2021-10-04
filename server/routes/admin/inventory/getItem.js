import inventory from "../../../models/inventory.js";




export default async (req,res) => {
    try{
        let data = await inventory.find(req.body.search)
        return res.json({success: true, data: data})
    } catch (err) {
        return res.json({success: true, err: err})
    }
}