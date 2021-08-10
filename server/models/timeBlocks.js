import mongoose from 'mongoose';
const { Schema } = mongoose;

const timeBlocksSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'users' },
  job: String,
  times: [String],
  time: String
});


let timeBlocks = mongoose.model("timeBlocks", timeBlocksSchema);

export default timeBlocks