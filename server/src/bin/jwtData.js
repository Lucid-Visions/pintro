var fs = require('fs')
var constants = require('./constants')

const Options = {
  signOptions: {
    issuer: constants.JWTIssuer,
    subject: constants.JWTSubject,
    audience: constants.JWTAudience,
    expiresIn: '360h',
    algorithm: 'RS256',
  },

  verifyOptions: {
    issuer: constants.JWTIssuer,
    subject: constants.JWTSubject,
    audience: constants.JWTAudience,
    expiresIn: '360h',
    algorithm: ['RS256'],
  },

  publicKEY: fs.readFileSync('./src/bin/public.key', 'utf8'),
  privateKEY: fs.readFileSync('./src/bin/private.key', 'utf8'),
  publicKEYPasswordReset: fs.readFileSync('./src/bin/publicPasswordReset.key', 'utf8'),
  privateKEYPasswordReset: fs.readFileSync('./src/bin/privatePasswordReset.key', 'utf8'),

  verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ')
      const bearerToken = bearer[1]
      req.token = bearerToken
      next()
    } else {
      res.sendStatus(403)
    }
  },

}

module.exports = Options
