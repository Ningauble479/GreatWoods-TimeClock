import inventory from "../../../models/inventory.js"

export default async (req,res) => {
    try {
    let itemIDS = []
    if(req.body.multiple){
        let ids = await Promise.all(req.body.items.map(async(item)=>{
            let newItem = new inventory(item)
            let {_id} = await newItem.save()
            console.log(_id)
            return _id
        }))
        console.log(ids)
        return res.json({success: true, ids})
    }
    let newItem = new inventory(req.body.item)
    let data = await newItem.save()
    return res.json({success: true, data: data})
} catch (err){
    return res.json({success: false, err: err})
}
}