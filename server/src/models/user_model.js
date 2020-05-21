import mongoose, { Schema } from "mongoose";

let userSchema = new mongoose.Schema(
  {
    user: String,
    email_login: String, //email used to login
    email_login_verified: Boolean, //if login email has been verified
    verification_secret: String,
    password_hash: String, //login password hash
    profile_picture: String,
    phone: String,
    name: String,
    status: String,
    accountStatus: String,
    action_buttons: [{ type: Schema.Types.ObjectId, ref: "actionButtons" }],
    bio: String,
    mood: Number,
    experience: {
      work_experience_years: Number,
      industry: String,
      currentJobTitle: String,
      currentCompany: String,
      companies: [
        {
          company_name: String,
          start_date: Number, //unix time stamp (start of job)
          end_date: Number //unix time stamp (end of job)
        }
      ],
      education: [
        {
          school_name: String,
          start_date: Number, //unix time stamp (start of job)
          end_date: Number //unix time stamp (end of job)
        }
      ],
      academic_level: String
    },
    tags: [String], //array of strings
    skills: [String], //array of strings
    groups: [String], //array of group ids
    recommendations: Array, //array of recommendation ids {title, type, photo, resource, tags}
    badges: Array, //array of badge objects {type, amount}
    linked_in_id: String, //linked in account id
    google_id: String, //google account id
    facebook_id: String, //facebook account id
    location: {
      type: { type: String },
      coordinates: [Number]
    },
    circles: {
      innerCircle: [
        { type: Schema.Types.ObjectId, ref: "user" }
      ], // users in your inner circle
      friendsCircle: [
        { type: Schema.Types.ObjectId, ref: "user"}
      ], // users in your friends circle
      followersCircle: [
        { type: Schema.Types.ObjectId, ref: "user"}
      ] // users in your followers circle
    },
    pushToken: String
  },
  { collection: "users" }
); //collection name

// create index $text to use in Text Search in Search.js

userSchema.index({ location: "2dsphere" });

userSchema.index({
  name: 'text',
  bio: 'text',
  'experience.industry': 'text',
  'experience.companies.company_name': 'text',
  'experience.education.school_name': 'text',
  tags: 'text',
  skills: 'text',
  groups: 'text',
});

export default mongoose.model("user", userSchema);
