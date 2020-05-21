import { connect } from "mongoose";
require("@babel/polyfill");


// Import environment variables
require("dotenv").config();

// Database creds
const dbUser = process.env.MONGO_USERNAME;
const dbPass = process.env.MONGO_PASSWORD;

// Database Name
const database = process.env.MONGO_DB;

// Connection 
const host = process.env.MONGO_HOST
const port = process.env.MONGO_PORT

// Connection URL
const url = `mongodb://${host}:${port}`;

// Connection options (authentication)
const options = {
  auth: { authSource: "admin" },
  user: dbUser,
  pass: dbPass
};

class Database {
  constructor() {
    this._connect();
  }

  async _connect() {
    try {
      await connect(`${url}/${database}`, options);
      console.log("Database connection successful");
    }
    catch(error) {
      console.error(error)
    }
  }
}

export default new Database();
