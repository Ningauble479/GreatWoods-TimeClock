const mongoose = require('mongoose');
const { Schema } = mongoose;

const timeSheetDaysSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'users' },
  day: [String],
  blocks: [{ type: Schema.Types.ObjectId, ref: 'timeBlocks'}]
});


module.exports = mongoose.model("timeSheetDays", timeSheetDaysSchema);d