/* eslint-disable no-prototype-builtins */
const { decrypt } = require('./crypt.controller')

const errorHandler = (err, req, res, _next) => {
  const ip = req.clientIp
  const date = new Date()
  console.log(date, 'ip: ' + ip, req.originalUrl, err.name)

  if (err.name === 'Unauthorized error') {
    res.status(401).json({ message: 'Unauthorized error', code: 400 })
  } else if (err.name === 'ForbiddenError') {
    res.status(401).json({ message: 'Forbidden error', code: 401 })
  } else {
    res.status(401).json({ message: 'Unknown error: ' + err.name, code: 400 })
  }
}

const logger = (req, _res, next) => {
  const ip = req.clientIp
  try {
    const url = req.originalUrl
    const body = JSON.stringify(req.body)
    const fecha = new Date()
    if (url !== '/') {
      console.log(fecha, 'ip: ' + ip, url, body)
    }
    next()
  } catch (error) {
    next()
  }
}

const middleware = (req, _res, next) => {
  let data = {}

  const user = req.hasOwnProperty('user')
  const bodyEdata = req.body.hasOwnProperty('edata')

  try {
    if (bodyEdata) {
      data = decrypt(req.body.edata)
      data = JSON.parse(data)
    } else if (user) {
      if (req.user.data) {
        data = decrypt(req.user.data)
        data = JSON.parse(data)
      } else {
        data = decrypt(req.user.data.edata)
        data = JSON.parse(data)
      }
    }
    req.user = data
    next()
  } catch (error) {
    next()
  }
}

module.exports = { middleware, logger, errorHandler }
