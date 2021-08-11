import mongoose from 'mongoose';
const { Schema } = mongoose;

const timeBlocksSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'users' },
  job: String,
  task: String,
  times: String,
  time: {
    hours: Number,
    minutes: Number,
    seconds: Number
  }
});


let timeBlocks = mongoose.model("timeBlocks", timeBlocksSchema);

export default timeBlocks