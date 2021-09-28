import thirdParty from "../../../models/thirdParty.js"





export default async (req,res) => {
    try {
        let data = await thirdParty.find(req.body.search)
        return res.json({success: true, data: data})
    } catch (err){
        return res.json({success: false, err: err})
    }

}