const sql = require('./sql.controller')
const parametros = require('./params.controller').parametros
const { generateToken, verifyToken } = require('./jwt.controller')

exports.loginAppUser = (req, res) => {
  sql
    .query('spHashAPIBUE', parametros(req.body, 'spHashAPIBUE'))
    .then((Result) => {
      console.log(Result)
      if (Result) {
        const { pass } = Result[0]
        if (pass === 'OK') {
          const token = generateToken('user')
          res.status(200).json({ token })
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
      const isUser = verifyToken(jwt)
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
    console.log(error)
  }
}