import mongoose from 'mongoose'

const hubMemberSchema = new mongoose.Schema(
  {
    user_id: {type: mongoose.ObjectId, required: true},
    name: String,
    membership_type: {type: String, enum: ['admin', 'user'], default: 'user', required: true},
  }
)

const hubSchema = new mongoose.Schema(
  {
    name: {type: String, required: true},
    description: String,
    tags: [String],
    location: String,
    members: {type: [hubMemberSchema], required: true},
  },
  { collection: 'hubs' }
)

// create index $text to use in Text Search in Search.js
hubSchema.index({
  name: 'text',
  description: 'text',
  tags: 'text',
})

export default mongoose.model('Hub', hubSchema)
