import mongoose from 'mongoose';
const { Schema } = mongoose;

const purchaseOrdersSchema = new Schema({
    name: String,
    Card: String,
    tax: Number,
    taxType: String, //ex percent or exact
    date: Date,
    warehouse: String,
    msg: String,
    internalmsg: String,
    status: String,
    shipTo: {type: Schema.Types.ObjectId, ref: 'users'},
    total: Number,
    items: [{type: Schema.Types.ObjectId, ref: 'inventory'}],
    purchaser: {type: Schema.Types.ObjectId, ref: 'users'}
});


let purchaseOrders = mongoose.model("purchaseOrders", purchaseOrdersSchema);

export default purchaseOrders