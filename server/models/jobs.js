const mongoose = require('mongoose');
const { Schema } = mongoose;

const jobsSchema = new Schema({
    folderTemplate: { type: Schema.Types.ObjectId, ref: 'jobTemplates' },
    jobName: String,
    workers: [{ type: Schema.Types.ObjectId, ref:'users'}],
    timeSheets: [{ type: Schema.Types.ObjectId, ref: 'timeSheets'}],
    client: String,
    address: String,
    phone: String,
    email: String,
    lockBox: String,
    contractor: String,
    billing: String,
    supervisor: String,
    superPhone: String,
    designer: String
});


module.exports = mongoose.model("jobs", jobsSchema);