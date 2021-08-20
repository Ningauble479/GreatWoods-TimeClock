import mongoose from 'mongoose';
const { Schema } = mongoose;

const timeSheetsSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'users' },
  week: String,
  days: [{ type: Schema.Types.ObjectId, ref: 'timeSheetDays'}],
  date: String
});


let timesheets = mongoose.model("timeSheets", timeSheetsSchema);

export default timesheets