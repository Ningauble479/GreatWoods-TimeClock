import thirdParty from "../../../models/thirdParty.js"

export default async (req,res) => {
    try {
    let thirdPartyData = req.body.thirdParty
    let newThirdParty = new thirdParty({
        company: thirdPartyData.company,
        address: thirdPartyData.address,
        email: thirdPartyData.email,
        phone: thirdPartyData.phone
    })

    let data = await newThirdParty.save()
    return res.json({success: true, data: data})
}
    catch (err){
        return res.json({success: false, err: err})
    }
}