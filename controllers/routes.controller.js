const sql = require('./sql.controller')
const parametros = require('./params.controller').parametros
exports.CallSp = (spName, req, res) => {
  sql
    .query(spName, parametros(req.body, spName))
    .then((Result) => {
      if (Result) {
        responsep(1, req, res, JSON.parse(Result[0].JSN))
      } else {
        responsep(2, req, res, { error: 'No data returned' })
      }
    })
    .catch((err) => {
      console.log(err, 'sp')
      responsep(2, req, res, err)
    })
}

const responsep = (tipo, req, res, resultado, _cookie) => {
  return new Promise((_resolve, _reject) => {
    if (tipo === 1) {
      res.cookie('XSRF-TOKEN', req.csrfToken(), {
        httpOnly: true,
        secure: req.secure,
        'max-Age': new Date(Date.now() + 90000000),
        path: '/'
      })
      res.status(200).json(resultado)
    } else if (tipo === 2) {
      console.log('Error at:', new Date(), 'res: ', resultado)
      res.status(400).json(resultado)
    }
  })
}
