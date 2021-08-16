import mongoose from 'mongoose';
const { Schema } = mongoose;
import bcrypt from 'bcryptjs'
const SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
  userName: String,
  password: String,
  jobTitle: String,
  admin: Boolean,
  clockedIn: Boolean
});


userSchema.pre('save', function(next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) return next(err);

      // hash the password using our new salt
      bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) return next(err);

          // override the cleartext password with the hashed one
          user.password = hash;
          next();
      });
  });
});

let users = mongoose.model("users", userSchema);

export default users