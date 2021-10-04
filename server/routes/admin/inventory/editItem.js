import inventory from "../../../models/inventory.js";


export default async (req,res) => {
    try {
        let data = await inventory.findOneAndUpdate(req.body.search, req.body.update)
        return res.json({success: true, data: data})
    } catch(err) {
        return res.json({success: false, err: err})
    }
}