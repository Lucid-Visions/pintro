
import UserModel from '../models/user_model'
import request from 'request'
import querystring from 'querystring'
import Signin from './Signin'
import PasswordHasher from './PasswordHashing'

require('dotenv').config()

const Facebook = {
  /**
   * @param {*} req req body should contain the redirect url and params.code (facebook response code) {body:{params:{code}},redirectUrl}
   * @param {*} res
   */
  signIn(req, res) {
    // get request parameters
    var body = req.body
    var code = body.params.code
    var redirect_uri = req.body.redirectUrl

    /**
     *
     * get auth token from facebook using the generated code from step 2
     *
     * */
    function OAuthToken() {
      var queryString = {
        code: code,
        redirect_uri: redirect_uri,
        client_id: process.env.FACEBOOK_CLIENT_ID,
        client_secret: process.env.FACEBOOK_CLIENT_SECRET,
      }

      // construct post request
      var options = {
        url:
          'https://graph.facebook.com/v6.0/oauth/access_token?' +
          querystring.stringify(queryString),
        method: 'GET', // Don't forget this line
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }

      // make request
      request(options, (error, res, body) => {
        if (error) {
          console.error(error)
          return
        }
        // console.log(`statusCode: ${res.statusCode}`);
        var access_token = JSON.parse(body).access_token
        getUserData(access_token)
      })
    }

    /**
     *
     * get basic user information using bearer token
     * access step3 token from facebook
     * */

    function getUserData(access_token) {
      var request = require('request')
      var queryString = {
        access_token: access_token,
      }
      var options = {
        method: 'GET',
        url:
          'https://graph.facebook.com/me?' + querystring.stringify(queryString),
      }

      // make request to facebook for bearer token
      request(options, function(error, response) {
        if (error) throw new Error(error)
        var jsonResponse = JSON.parse(response.body)
        // prepare and save data for mongodb
        var name = jsonResponse.name

        var id = jsonResponse['id']

        // check if id exists in db
        UserModel.find({ facebook_id: id }, '_id', function(err, users) {
          if (err) return err

          // if user exists in db
          if (users.length > 0) {
            Signin.generateBearer(users[0]['_id'], false, req, res)
          } else {
            // create user model
            let user = new UserModel({
              user: '',
              email: '',
              email_login: '',
              profile_picture: '',
              name: name,
              status: 'happy',
              bio: '',
              tags: [], // array of strings
              skills: [], // array of strings
              groups: [], // array of group ids
              recommendations: [], // array of recommendation objects
              badges: [], // array of badge objects {type, amount}
              linked_in_id: '', // linked in account id
              google_id: '', // google account id
              facebook_id: id, // facebook account id
              password_hash: PasswordHasher.generateRandomPasswordHash(),
            })
            saveUser(user)
          }
          // 'athletes' contains the list of athletes that match the criteria.
        })
      })
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
          Signin.generateBearer(doc['_id'], true, req, res) // docid is userid
        })
        .catch(err => {
          console.log(err)
          return res.status(400).send({ error: err })
        })
    }

    OAuthToken()
  },
}

export default Facebook
