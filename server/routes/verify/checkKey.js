
export default async (req,res) => {
    if(req.body.key === '/N?$@*4|0"8C>_P`F#A6~$:+zJai<x'){
        return res.json({success: true})
    } else {
        return res.json({success: false, err: 'Invalid Key'})
    }
}