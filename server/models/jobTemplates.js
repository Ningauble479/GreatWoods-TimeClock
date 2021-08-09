import mongoose from 'mongoose';
const { Schema } = mongoose;

const jobTemplateSchema = new Schema({
  folders: [{ 
    nestedFolders: [String],
    folderName: String,
    amountNested: Number
   }],
  foldersNested: Number,
  jobs: [{ type: Schema.Types.ObjectId, ref: 'jobs' }],
  name: String
});


let jobTemplates = mongoose.model("jobTemplates", jobTemplateSchema);

export default jobTemplates