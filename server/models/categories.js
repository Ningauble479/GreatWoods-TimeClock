import mongoose from 'mongoose';
const { Schema } = mongoose;

const categoriesSchema = new Schema({
    name: String,
    type: String
});


let categories = mongoose.model("categories", categoriesSchema);

export default categories