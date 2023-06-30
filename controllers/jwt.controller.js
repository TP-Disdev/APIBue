require('dotenv').config()
const { expressjwt: expressJwt } = require('express-jwt')
const { sign, verify } = require('jsonwebtoken')

const secret = process.env.SECRET
const algorithms = process.env.ALGORITHM

exports.generateToken = (user) => {
  const jwt = sign({ user }, secret, {
    expiresIn: '8hr'
  })
  return jwt
}

exports.verifyToken = (token) => {
  const itsOk = verify(token, secret)
  return itsOk
}

exports.jwt = () => {
  return expressJwt({ secret, algorithms: [algorithms] })
    .unless({
      path: [
        '/api/login'
      ]
    })
}
