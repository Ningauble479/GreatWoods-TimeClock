const mongoose = require('mongoose');
const { Schema } = mongoose;

const timeSheetsSchema = new Schema({
  job: { type: Schema.Types.ObjectId, ref: 'jobs' },
  times: [String],
  time: String
});


module.exports = mongoose.model("timeSheets", timeSheetsSchema);