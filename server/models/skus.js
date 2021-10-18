import mongoose from 'mongoose';
const { Schema } = mongoose;

const skusSchema = new Schema({
    sku: String,
    last: Number
});


let skus = mongoose.model("skus", skusSchema);

export default skus