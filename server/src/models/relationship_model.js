import mongoose, {Schema} from 'mongoose'

let relationshipSchema = new mongoose.Schema({
  follower: {type: Schema.Types.ObjectId, ref: 'user', required: true}, // user id the invitation is from
  followee: {type: Schema.Types.ObjectId, ref: 'user', required: true}, // 0 => pending 1=> accepted 2=> declined
  followeeType: String, // the type of account being followed
  startTime: Number, // time the request was sent
  endTime: Number, // time the relationship was ended
  status: String, // [PENDING, FOLLOWING, BLOCKED]
  intent: String, // intent by follower when follow request sent
  message: String, // message by follower when follow request sent
}, { collection: 'relationship' }) // collection name

export default mongoose.model('relationship', relationshipSchema)
