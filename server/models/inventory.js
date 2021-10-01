import mongoose from 'mongoose';
const { Schema } = mongoose;

const inventorySchema = new Schema({
    name: String,
    type: {type: Schema.Types.ObjectId, ref: 'category'},
    purchaseID: {type: Schema.Types.ObjectId, ref: 'purchaseOrders'},
    soldTo: {type: Schema.Types.ObjectId, ref: 'customers'},
    description: String,
    additionalInfo: String,
    dateEntered: Date,
    inStock: Boolean,
    cost: Number,
    sku: String
});


let inventory = mongoose.model("inventory", inventorySchema);

export default inventory