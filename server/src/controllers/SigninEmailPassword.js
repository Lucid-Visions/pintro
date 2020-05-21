import UserModel from "../models/user_model";
import Signin from "./Signin";
require("dotenv").config();
import NodeMailer from "./NodeMailer";
import jwt from "jsonwebtoken";
import jwtData from "../bin/jwtData";
import PasswordHasher from "./PasswordHashing";

const EmailPassword = {
  /**
   * @param {*} req req body should contain email and password
   * @param {*} res
   */
  register(req, res) {
    //get request parameters
    //need to test
    var body = req.body;
    var email_login = body.email_login;
    var phone = body.phone;
    var password_hash = PasswordHasher.hashPassword(body.password);
    var app_url = body.app_url || "exp://localhost:19000";

    if (!email_login || !password_hash) {
      res.status(400).send({ message: "Email or Password missing" });
      return;
    }
    //check if user with password exists
    function getUserData() {
      //check if id exists in db
      UserModel.find({ email_login: email_login }, function(err, users) {
        if (err) return res.status(500).send();
        //if user exists in db
        if (users.length == 1) {
          res
            .status(401)
            .send({
              message: "This email is already associated with an account"
            });
          return;
        } else if (users.length > 1) {
          //this should never happen. More than one user with the same email login
          res
            .status(400)
            .send({ message: "Multiple accounts with the same email" });
          return;
        } else {
          var verification_secret =
            Math.random()
              .toString(36)
              .substring(2, 15) +
            Math.random()
              .toString(36)
              .substring(2, 15);
          var email = {
            subject: "Please verify your email",
            html: `<a href=${app_url}?emailverify=true&verification_secret=${verification_secret}>Click here to verify your email</a>`
          };
          NodeMailer(email_login, email);
          //create user model
          let user = new UserModel({
            user: "",
            email: email_login,
            email_login: email_login,
            phone: phone,
            profile_picture: "",
            name: "",
            status: "happy",
            bio: "",
            tags: [], //array of strings
            skills: [], //array of strings
            groups: [], //array of group ids
            recommendations: [], //array of recommendation objects
            badges: [
              {
                title: "connector",
                amount: 0
              },
              {
                title: "listener",
                amount: 0
              },
              {
                title: "star",
                amount: 0
              },
              {
                title: "thank_you",
                amount: 0
              }
            ], //array of badge objects {type, amount}
            linked_in_id: "", //linked in account id
            google_id: "", //google account id
            facebook_id: "", //facebook account id
            password_hash: password_hash,
            verification_secret
          });
          saveUser(user);
        }
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

    getUserData();
  },

  /**
   * @param {*} req req body should contain email and password
   * @param {*} res
   */
  signIn(req, res) {
    //get request parameters
    //need to test
    var body = req.body;
    var email_login = body.email_login;
    var password = body.password;

    if (!email_login || !password) {
      res.status(400).send({err:"'email_login' or 'password' missing in payload"});
      return;
    }
    //check if user with password exists
    function getUserData() {
      //check if id exists in db
      UserModel.find({ email_login: email_login }, function(err, users) {
        if (err) return res.status(500).send();
        //if user exists in db
        if (users.length == 1) {
          if ( PasswordHasher.verifyPassword(password, users[0].password_hash) ) {
            Signin.generateBearer(users[0], false, req, res);
          } else {
            res.status(401).send({ err: "Incorrect email or password" });
            return;
          }
        } else if (users.length > 1) {
          //this should never happen. More than one user with the same email login
          res
            .status(400)
            .send({ err: "Multiple accounts with the same email" });
          return;
        } else {
          res.status(401).send({ err: "Incorrect email or password" });
          return;
        }
      });
    }
    getUserData();
  },

  /**
   *
   * @param {*} req Must contain verification_secret in the body and Bearer key in the headers. This is the secret that was sent to the email
   * @param {*} res
   */
  verifySecret(req, res) {
    var body = req.body;
    var secret = body.verification_secret;
    console.log(secret);
    var decoded = jwt.verify(
      req.token,
      jwtData.publicKEY,
      jwtData.verifyOptions
    );
    var uid = decoded.user.uid;
    UserModel.find({ _id: uid }, function(err, users) {
      if (users.length == 0) {
        return res.status(500).send({ message: "Unable to find user" });
      }
      if (users[0].email_login_verified) {
        console.log("Already verified");
        return res.status(200).send({ message: "Email already verified" });
      } else if (users[0].verification_secret == secret) {
        console.log("Correct secret");
        UserModel.update(
          { _id: uid },
          { email_login_verified: true },
          (err, doc) => {
            return res.status(200).send({ message: "Verified Email" });
          }
        );
      } else {
        return res
          .status(400)
          .send({ message: "Unable to verify email for the current user." });
      }
    });
  }
};

export default EmailPassword;
