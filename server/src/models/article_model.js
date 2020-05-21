import mongoose, {Schema} from "mongoose";

const articleAuthorSchema = new mongoose.Schema(
  {
    author_id: {type: Schema.Types.ObjectId, required: true, ref: "user", required: true},
    name: String
    //author_type: {type: String, enum: ["user", "business"], required: true}
  }
);

const likeSchema = new mongoose.Schema(
  {
    user_id: {type: Schema.Types.ObjectId, required: true, ref: "user"},
    user_name: String
  }
);

const commentSchema = new mongoose.Schema(
  {
    user_id: {type: Schema.Types.ObjectId, required: true, ref: "user"},
    user_name: String,
    text: {type: String, required: true}
  }
);

const articleSchema = new mongoose.Schema(
  {
    author: {type: articleAuthorSchema, required: true},
    date_stamp: Number, //unix time stamp (date of posting the article)
    title: {type: String, required: true},
    text: {type: String, required: true},
    likes: [likeSchema],
    comments: [commentSchema],
  },
  { collection: "articles" }
);

// create index $text to use in Text Search in Search.js
articleSchema.index({
  "author.name": 'text',
  title: 'text', 
  text: 'text',
});

export default mongoose.model("Article", articleSchema);
