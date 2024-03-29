import UserModel from '../models/user_model'
import request from 'request'
import querystring from 'querystring'
import Signin from './Signin'
import PasswordHasher from './PasswordHashing'

require('dotenv').config()

const LinkedIn = {
  /**
   * @param {*} req req body should contain the redirect url and params.code (linked in response code) {body:{params:{code}},redirectUrl}
   * @param {*} res
   */
  signIn(req, res) {
    // get request parameters
    var body = req.body
    var code = body.params.code
    var redirect_uri = req.body.redirectUrl

    /**
     *
     * get auth token from linkedin using the generated code from step 2
     *
     * */
    function OAuthToken() {
      var postData = {
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirect_uri,
        client_id: process.env.LINKED_IN_CLIENT_ID,
        client_secret: process.env.LINKED_IN_CLIENT_SECRET,
      }

      // convert json to body string
      var formData = querystring.stringify(postData)
      var contentLength = formData.length

      // construct post request
      var options = {
        url: 'https://www.linkedin.com/oauth/v2/accessToken',
        method: 'POST', // Don't forget this line
        headers: {
          'Content-Length': contentLength,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
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
     * access step3 token from linked in
     * */

    function getUserData(access_token) {
      var request = require('request')
      var options = {
        method: 'GET',
        url:
          'https://api.linkedin.com/v2/me?projection=(id,firstName,lastName,profilePicture(displayImage~:playableStreams))',
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }

      // make request to linked in for bearer token
      request(options, function(error, response) {
        if (error) throw new Error(error)
        var jsonResponse = JSON.parse(response.body)
        // prepare and save data for mongodb
        var fn = jsonResponse['firstName']
        var firstName =
          fn['localized'][
            `${fn['preferredLocale']['language']}_${fn['preferredLocale']['country']}`
          ]

        var ln = jsonResponse['lastName']
        var lastName =
          ln['localized'][
            `${ln['preferredLocale']['language']}_${ln['preferredLocale']['country']}`
          ]

        var pp = jsonResponse['profilePicture']['displayImage~'][
          'elements'
        ].slice(-1)[0]['identifiers'][0]['identifier']
        var id = jsonResponse['id']
        console.log(id)
        // check if id exists in db
        UserModel.find({ linked_in_id: id }, function(err, users) {
          if (err) return err
          // if user exists in db
          if (users.length === 1) {
            Signin.generateBearer(users[0], false, req, res)
          } else if (users.length > 1){
            res.status(400).send('More than one user with the same linked in id')
            return
          } else {
            // create user model
            let user = new UserModel({
              user: '',
              email: '',
              email_login: '',
              profile_picture: pp,
              name: `${firstName} ${lastName}`,
              status: 'happy',
              bio: '',
              tags: [], // array of strings
              skills: [], // array of strings
              groups: [], // array of group ids
              recommendations: [], // array of recommendation objects
              badges: [
                {
                  title: 'connector',
                  amount: 0,
                },
                {
                  title: 'listener',
                  amount: 0,
                },
                {
                  title: 'star',
                  amount: 0,
                },
                {
                  title: 'thank_you',
                  amount: 0,
                },
              ],
              linked_in_id: id, // linked in account id
              google_id: '', // google account id
              facebook_id: '', // facebook account id
              password_hash: PasswordHasher.generateRandomPasswordHash(),
            })
            saveUser(user)
          }
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
          Signin.generateBearer(doc, true, req, res) // docid is userid
        })
        .catch(err => {
          console.log(err)
          return res.status(400).send({ error: err })
        })
    }

    OAuthToken()
  },
}

export default LinkedIn
