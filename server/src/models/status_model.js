import mongoose, {Schema} from 'mongoose'

const statusAuthorSchema = new mongoose.Schema(
  {
    author_id: {type: Schema.Types.ObjectId, required: true, ref: 'user'},
    name: String,
    // author_type: {type: String, enum: ["user", "business"], required: true}
  }
)

const likeSchema = new mongoose.Schema(
  {
    user_id: {type: Schema.Types.ObjectId, required: true, ref: 'user'},
    user_name: String,
  }
)

const commentSchema = new mongoose.Schema(
  {
    user_id: {type: Schema.Types.ObjectId, required: true, ref: 'user'},
    user_name: String,
    text: {type: String, required: true},
  }
)

const statusSchema = new mongoose.Schema(
  {
    author: {type: statusAuthorSchema, required: true},
    date_stamp: Number, // unix time stamp (date of posting the article)
    text: {type: String, required: true},
    likes: [likeSchema],
    comments: [commentSchema],
    tags: [String], //     tags:[{type: Schema.Types.ObjectId, ref: "Tags"}]
    communityIds: [String]

  },
  { collection: 'status' }
)

// create index $text to use in Text Search in Search.js
statusSchema.index({
  'author.name': 'text',
  title: 'text',
  text: 'text',
})

export default mongoose.model('status', statusSchema)
