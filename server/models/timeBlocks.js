import mongoose from 'mongoose';
const { Schema } = mongoose;

const timeBlocksSchema = new Schema({
  job: { type: Schema.Types.ObjectId, ref: 'jobs' },
  times: [String],
  time: String
});


let timeBlocks = mongoose.model("timeBlocks", timeBlocksSchema);

export default timeBlocks