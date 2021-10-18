import mongoose from 'mongoose';
const { Schema } = mongoose;

const contractsSchema = new Schema({
    client: { type: Schema.Types.ObjectId, ref: 'customers' },
    monthly: Number,
    items: [ { type: Schema.Types.ObjectId, ref: 'items' } ],
    type: String,
    setupFee: Number,
    info: String,
    infoInternal: String,
    contacts: [{
        name: String,
        number: String,
        email: String 
    }],
    oneTimeData: Boolean,
    supportTickets: [{ type: Schema.Types.ObjectId, ref: 'supportTickets'}],
    mainTech: { type: Schema.Types.ObjectId, ref: 'users'},
    contractSignIn: String,
    contractPassword: String

});

contractsSchema.pre('save', function(next) {
    var user = this;
  
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('contractPassword')) return next();
  
    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);
  
        // hash the password using our new salt
        bcrypt.hash(user.contractPassword, salt, function(err, hash) {
            if (err) return next(err);
  
            // override the cleartext password with the hashed one
            user.contractPassword = hash;
            next();
        });
    });
  });


let contracts = mongoose.model("contracts", contractsSchema);

export default contracts