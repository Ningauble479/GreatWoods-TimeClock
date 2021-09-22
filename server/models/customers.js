import mongoose from 'mongoose';
const { Schema } = mongoose;

const customersSchema = new Schema({
  firstname: String,
  lastname: String,
  address: String,
  email: String,
  customerSince: Date,
  phone: String,
  billingAddress: {
        street1: String,
        street2: String,
        city: String,
        state: String,
        country: String,
        zip: String
  },
  jobs: [{type: Schema.Types.ObjectId, ref: 'jobs'}]
});


let customers = mongoose.model("customers", customersSchema);

export default customers