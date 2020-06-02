import UserModel from '../models/user_model'
import jwt from 'jsonwebtoken'
import jwtData from '../bin/jwtData'
import NodeMailer from './NodeMailer'
import fs from 'fs'
import PasswordHasher from '../controllers/PasswordHashing'
const ResetPassword = {
  async sendResetEmail(email, req) {
    return await UserModel.findOne({ email_login: email }, async function(
      err,
      user
    ) {
      if (err || user == null) {
        return
      }
      const uid = user._id
      const resetToken = await ResetPassword.generateResetToken(uid)
      var emailMessage = {
        subject: 'Please verify your email',
        html: `<a href=http://${req.headers.host}/newpassword?token=${resetToken}>Click here to reset your password</a>`,
      }
      NodeMailer(email, emailMessage)
      return { message: 'Reset email sent' }
    }).catch(() => {
      return
    })
  },

  async generateResetToken(uid) {
    var payload = {
      user: {
        uid: uid,
        type: 'user',
      },
    }

    let err
    let token

    (token = await jwt.sign(payload, jwtData.privateKEYPasswordReset, {
      ...jwtData.signOptions,
      expiresIn: '1h',
    }))
    if (err) {
      console.log(err)
    }
    return token
  },

  async requestEmailToken(req, res) {
    let result = await ResetPassword.sendResetEmail(req.query.email, req)
    if (result) {
      res.status(200).send({ message: 'Reset email sent' })
    } else {
      res
        .status(400)
        .send({ error: 'INVALID-EMAIL', message: 'Email not found' })
    }
  },

  verifyAndReset(req, res) {
    let expiredMessage = {
      error: 'RESET-ERROR',
      message: 'Token expired',
    }

    try {
      var decoded = jwt.verify(req.body.token, jwtData.publicKEYPasswordReset, {
        ...jwtData.verifyOptions,
        expiresIn: '1h',
      })
    } catch (error) {
      return res.status(400).send(expiredMessage)
    }

    var uid = decoded.user.uid
    let body = req.body
    if (body.password1 !== body.password2) {
      return res.status(400).send('Passwords do not match')
    }
    UserModel.updateOne(
      { _id: uid },
      { password_hash: PasswordHasher.hashPassword(body.password1)},
      (err, doc) => {
        if (err)
          return res.status(400).send({
            error: 'RESET-ERROR',
            message: 'Unable to reset password',
          })
        return res.status(200).send({ message: 'Password reset' })
      }
    )
  },

  newPasswordPage(req, res) {
    res.write(fs.readFileSync('./src/bin/newpassword.html', 'utf8'))
    res.end()
  },

  changePass(req, res){
    let expiredMessage = {
      error: 'RESET-ERROR',
      message: 'Token expired',
    }

    try {
      var decoded = jwt.verify(
        req.token,
        jwtData.publicKEY,
        jwtData.verifyOptions
      )
    } catch (error) {
      return res.status(400).send(expiredMessage)
    }

    var uid = decoded.user.uid
    let body = req.body
    if (body.password1 !== body.password2) {
      return res.status(400).send('Passwords do not match')
    }
    UserModel.updateOne(
      { _id: uid },
      { password_hash: PasswordHasher.hashPassword(body.password1)},
      (err, doc) => {
        if (err)
          return res.status(400).send({
            error: 'RESET-ERROR',
            message: 'Unable to reset password',
          })
        return res.status(200).send({ message: 'Password reset' })
      }
    )
  },
}

export default ResetPassword
