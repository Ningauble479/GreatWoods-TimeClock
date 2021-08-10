import mongoose from 'mongoose';
const { Schema } = mongoose;

const timeSheetDaysSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'users' },
  day: String,
  blocks: [{ type: Schema.Types.ObjectId, ref: 'timeBlocks'}]
});


let timeSheetDays = mongoose.model("timeSheetDays", timeSheetDaysSchema);

export default timeSheetDays