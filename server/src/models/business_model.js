import mongoose from "mongoose";

const teamMemberSchema = new mongoose.Schema(
  // some basic info about the team members
  {
    user_id: {type: mongoose.ObjectId, required: true, ref: "user"},   // the _id of the user
    name: String,
    role_description: String,   // e.g. "UX Designer", "Project Manager"
    point_of_contact: Boolean   // whether this person can be contacted by other users
  }
);

const businessSchema = new mongoose.Schema(
  {
    name: {type: String, required: true},
    tagline: String,
    bio: String,
    seeking_investment: Boolean,
    currently_hiring: Boolean,
    tags: [String],
    // -----journey-----
    date_founded: String,  // unix time stamp, NOTE: could also be of type Date
    location: String,
    company_size: String,
    funding: String,
    // -----------------
    owner: {type: teamMemberSchema, required: true},
    //team: [teamMemberSchema]
    team: [{type: mongoose.ObjectId, ref: "user"}]
  },
  { collection: "businesses" }
);

// create index $text to use in Text Search in Search.js
businessSchema.index({
  name: 'text', 
  bio: 'text',
  tags: 'text',
});

export default mongoose.model("Business", businessSchema);
