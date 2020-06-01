import mongoose from 'mongoose'
let tagsSchema = new mongoose.Schema({
  value: String,
  passions: Boolean,
  business: Boolean,
  skills: Boolean,
  help_me_with: Boolean,
  introduce_me: Boolean,
  job_title: Boolean,
}, { collection: 'tags' }) // collection name

export default mongoose.model('Tags', tagsSchema)
