import mongoose from 'mongoose';
const { Schema } = mongoose;

const inventorySchema = new Schema({

});


let inventory = mongoose.model("inventory", inventorySchema);

export default inventory