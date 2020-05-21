import mongoose, {Schema} from "mongoose";

const actionButtonSchema = new mongoose.Schema(
  {
    author: {type: Schema.Types.ObjectId, ref: "user", required: true},
    date_stamp: Number, //unix time stamp (date of posting the article)
    type: {type: String, required: true},
    context: {type: String, required: true},
    tags: [String]
  },
  { collection: "actionButtons" }
);

export default mongoose.model("actionButtons", actionButtonSchema);
