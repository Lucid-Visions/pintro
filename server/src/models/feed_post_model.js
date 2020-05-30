import mongoose from 'mongoose'

let feedPostSchema = new mongoose.Schema(
  {
    name: String,
    timestamp: String,
    tags: [String],
    message: String,
    likes: Number,
    comments: [String],
  },
  { collection: 'feedposts'}
)

export default mongoose.model('FeedPost', feedPostSchema)
