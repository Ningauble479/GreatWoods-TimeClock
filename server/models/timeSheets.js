const mongoose = require('mongoose');
const { Schema } = mongoose;

const timeSheetsSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'users' },
  week: [String],
  days: [{ type: Schema.Types.ObjectId, ref: 'timeSheetDays'}]
});


module.exports = mongoose.model("timeSheets", timeSheetsSchema);d