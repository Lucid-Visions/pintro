interface User {
    _id?: string;
    user: String,
    email_login: String, //email used to login
    email_login_verified: Boolean, //if login email has been verified
    verification_secret: String,
    password_hash: String, //login password hash
    profile_picture: String,
    phone: String,
    name: String,
    status: String,
    action_buttons: [],
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
    tags: string[], //array of strings
    skills: string[], //array of strings
    groups: string[], //array of group ids
    recommendations: [], //array of recommendation ids {title, type, photo, resource, tags}
    badges: [], //array of badge objects {type, amount}
    linked_in_id: string, //linked in account id
    google_id: string, //google account id
    facebook_id: string, //facebook account id
    location: {
        type: { type: String },
        coordinates: number[]
    },
    circles: {
        innerCircle: [

        ] // users in your followers circle
    },
    pushToken: String,
    accountStatus: String,
}; //collection name


export default User;