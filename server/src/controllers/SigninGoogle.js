
import UserModel from "../models/user_model";
import request from "request";
import querystring from "querystring";
import PasswordHasher from "./PasswordHashing";

require("dotenv").config();

const Google = {
  /**
   * @param {*} req req body should contain the redirect url and params.code (linked in response code) {body:{params:{code}},redirectUrl}
   * @param {*} res
   */
  signIn(req, res) {
    //get request parameters
    var body = req.body;
    var code = body.params.code;
    var redirect_uri = req.body.redirectUrl;

    /**
     *
     * get auth token from linkedin using the generated code from step 2
     *
     * */
    function OAuthToken() {
      var postData = {
        grant_type: "authorization_code",
        code: code,
        redirect_uri: redirect_uri,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET
      };

      //convert json to body string
      var formData = querystring.stringify(postData);
      var contentLength = formData.length;

      //construct post request
      var options = {
        url: "https://accounts.google.com/o/oauth2/token",
        method: "POST", // Don't forget this line
        headers: {
          "Content-Length": contentLength,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: formData
      };

      //make request
      request(options, (error, res, body) => {
        if (error) {
          console.error(error);
          return;
        }
        // console.log(`statusCode: ${res.statusCode}`);
        var access_token = JSON.parse(body).access_token;
        getUserData(access_token);
      });
    }

    /**
     *
     * get basic user information using bearer token
     * access step3 token from linked in
     * */

    function getUserData(access_token) {
      var queryString = {
        access_token: access_token,
        alt: "json"
      };
      var options = {
        method: "GET",
        url:
          "https://www.googleapis.com/oauth2/v1/userinfo?" +
          querystring.stringify(queryString)
      };

      //make request to linked in for bearer token
      request(options, function(error, response) {
        if (error) throw new Error(error);
        var jsonResponse = JSON.parse(response.body);
        var id = jsonResponse["id"];
        var name = jsonResponse["name"];
        var firstName = jsonResponse["given_name"];
        var lastName = jsonResponse["family_name"];
        var picture = jsonResponse["picture"];
        //check if id exists in db
        UserModel.find({ google_id: id }, "_id", function(err, users) {
          if (err) return handleError(err);

          //if user exists in db
          if (users.length > 0) {
            Signin.generateBearer(users[0], false, req, res);
          } else {
            //create user model
            let user = new UserModel({
              user: "",
              email:"",
              email_login: "",
              profile_picture: picture,
              name: `${firstName} ${lastName}`,
              status: "happy",
              bio: "",
              tags: [], //array of strings
              skills: [], //array of strings
              groups: [], //array of group ids
              recommendations: [], //array of recommendation objects
              badges: [], //array of badge objects {type, amount}
              linked_in_id: "", //linked in account id
              google_id: id, //google account id
              facebook_id: "", //facebook account id
              password_hash: PasswordHasher.generateRandomPasswordHash(),
            });
            saveUser(user);
          }
        });
      });
    }

    /**
     *
     * save model to mongo db
     *
     * */
    function saveUser(user) {
      user
        .save()
        .then(doc => {
          Signin.generateBearer(doc, true, req, res); //docid is userid
        })
        .catch(err => {
          console.log(err);
          return res.status(400).send({ error: err });
        });
    }

    OAuthToken();
  }
};

export default Google;
