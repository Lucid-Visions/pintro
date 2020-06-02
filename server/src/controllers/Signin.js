import LinkedIn from './SigninLinkedIn'
import Facebook from './SigninFacebook'
import Google from './SigninGoogle'
import EmailPassword from './SigninEmailPassword'
import jwt from 'jsonwebtoken'
import jwtData from '../bin/jwtData'

const Signin = {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection saved document
   */

  registerEmailAndPassword(req, res) {
    EmailPassword.register(req, res)
  },
  verifyEmailAndPassword(req, res) {
    EmailPassword.verifySecret(req, res)
  },
  emailAndPassword(req, res) {
    EmailPassword.signIn(req, res)
  },
  linkedIn(req, res) {
    LinkedIn.signIn(req, res)
  },

  facebook(req, res) {
    Facebook.signIn(req, res)
  },
  google(req, res) {
    Google.signIn(req, res)
  },
  generateBearer(doc, newUser, req, res) {
    var payload = {
      user: {
        uid: doc['_id'],
        type: 'user',
      },
    }
    jwt.sign(
      payload,
      jwtData.privateKEY,
      jwtData.signOptions,
      (err, token) => {
        if (err) {
          console.log(err)
          res.status(403).send(err.name)
          return
        }
        console.log('generated JWT token')
        console.log(token)
        res.status(200).send({
          token: 'Bearer ' + token,
          newUser: newUser,
          doc,
        })
      }
    )
  },
}

export default Signin
