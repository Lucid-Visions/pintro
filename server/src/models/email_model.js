import mongoose from 'mongoose'

/* -------------- Example ------------*/

let emailSchema = new mongoose.Schema({
  email: String,
}, { collection: 'emails' }) // collection name

export default mongoose.model('Emails', emailSchema)
