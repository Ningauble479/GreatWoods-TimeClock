const mongoose = require('mongoose');
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


module.exports = mongoose.model("jobTemplates", jobTemplateSchema);