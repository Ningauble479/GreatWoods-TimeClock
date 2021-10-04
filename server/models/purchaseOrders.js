import mongoose from 'mongoose';
const { Schema } = mongoose;

const purchaseOrdersSchema = new Schema({
    name: String,
    Card: String,
    cost: Number,
    tax: Number,
    taxType: String, //ex % or exact amount
    date: Date,
    warehouse: String,
    msg: String,
    internalmsg: String,
    status: String,
    shipTo: {type: Schema.Types.ObjectId, ref: 'users'},
    total: Number,
    purchaser: {type: Schema.Types.ObjectId, ref}
});


let purchaseOrders = mongoose.model("purchaseOrders", purchaseOrdersSchema);

export default purchaseOrders