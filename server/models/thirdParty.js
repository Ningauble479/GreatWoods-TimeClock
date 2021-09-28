import mongoose from 'mongoose';
const { Schema } = mongoose;

const thirdPartySchema = new Schema({
  company: String,
  address: String,
  email: String,
  phone: String
});


let thirdParty = mongoose.model("thirdParty", thirdPartySchema);

export default thirdParty