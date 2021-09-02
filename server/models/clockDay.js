import mongoose from 'mongoose';
const { Schema } = mongoose;

const clockDaySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'users' },
  day: String,
  clockIn: Date,
  lunchIn: Date,
  lunchOut: Date,
  clockOut: Date
});


let clockDay = mongoose.model("clockDay", clockDaySchema);

export default clockDay