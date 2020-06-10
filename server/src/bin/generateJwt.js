var fs = require('fs')
var jwt = require('jsonwebtoken')
var constants = require('./constants')

var payload = {
  user: {
    uid: process.argv[2],
    type: 'user',
  },
}

var signOptions = {
  issuer: constants.JWTIssuer,
  subject: constants.JWTSubject,
  audience: constants.JWTAudience,
  expiresIn: '360h',
  algorithm: 'RS256',
}

jwt.sign(
  payload,
  fs.readFileSync('./private.key', 'utf8'),
  signOptions,
  (err, token) => {
    if (err) {
      console.log(err)
      return
    }
    console.log('generated JWT token')
    console.log(token)
  }
)
