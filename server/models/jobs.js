import mongoose from 'mongoose';
const { Schema } = mongoose;

const jobsSchema = new Schema({
    folderTemplate: { type: Schema.Types.ObjectId, ref: 'jobTemplates' },
    jobName: String,
    workers: [{ type: Schema.Types.ObjectId, ref:'users' }],
    timeSheets: [{ type: Schema.Types.ObjectId, ref: 'timeSheets'}],
    client: {type: Schema.Types.ObjectId, ref: 'customers'},
    lockBox: String,
    contractor: { type: Schema.Types.ObjectId, ref:'users' },
    billing: String,
    supervisor: { type: Schema.Types.ObjectId, ref:'users' },
    superPhone: String,
    designer: { type: Schema.Types.ObjectId, ref:'users' },
    active: Boolean,
    finishers: { type: Schema.Types.ObjectId, ref: 'thirdParty'},
    installers: { type: Schema.Types.ObjectId, ref: 'thirdParty'},
    installDate: Date
});


let jobs = mongoose.model("jobs", jobsSchema);

export default jobs