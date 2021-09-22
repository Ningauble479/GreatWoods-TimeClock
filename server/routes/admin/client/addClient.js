import client from '../../../models/customers.js'


export default async (req,res) => {
    let newClient = new client(req.body.client)
    newClient.customerSince = new Date()
    let data = await newClient.save()
    console.log(data)
}