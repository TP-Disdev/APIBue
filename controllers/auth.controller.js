const sql = require('./sql.controller')
const parametros = require('./params.controller').parametros
const { generateToken, verifyToken } = require('./jwt.controller')
const { Encrypt, Decrypt } = require('./crypt.controller')

exports.loginAppUser = (req, res) => {
  sql
    .query('spHashAPIBUE', parametros(req.body, 'spHashAPIBUE'))
    .then((Result) => {
      if (Result) {
        const { pass } = Result[0]
        if (pass === 'OK') {
          const token = generateToken('user')
          res.status(200).json({ token: Encrypt(token) })
        } else {
          res.status(401).json({ error: 'User not found' })
        }
      } else {
        res.status(401).json({ error: 'Bad request' })
      }
    })
    .catch((err) => {
      console.log(err, 'sp')
    })
}

exports.checkJwt = (req, res, next) => {
  try {
    const jtwByUser = req.headers.authorization
    if (jtwByUser) {
      const jwt = jtwByUser.split(' ').pop()
      const decryptJWT = Decrypt(jwt).replaceAll('"', '')
      const isUser = verifyToken(decryptJWT)
      if (!isUser) {
        res.status(401).json({
          error: 'Invalid jwt token'
        })
      } else {
        req.user = isUser
        next()
      }
    } else {
      res.status(401).json({
        error: 'Token wan not found'
      })
    }
  } catch (error) {
    res.status(401).json({
      error: error.message
    })
    console.log(error)
  }
}
