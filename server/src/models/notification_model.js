import mongoose, {Schema} from 'mongoose'

const notificationSchema = new mongoose.Schema(
  {
    user: {type: Schema.Types.ObjectId, ref: 'user', required: true},
    notification_type: {type: String, required: true},
    timestamp: {type: String, required: true},
    text: {type: String, required: true},
    status: {user: {type: Schema.Types.ObjectId, ref: 'user'}, status: {type: Schema.Types.ObjectId, ref: 'status'}},
    badge: {type: Schema.Types.ObjectId, ref: 'user'},
    relationship: {type: Schema.Types.ObjectId, ref: 'relationship'},
  },
  { collection: 'notifications' }
)

export default mongoose.model('notification', notificationSchema)
