const TYPES = require('tedious').TYPES
const moment = require('moment')
const { encriptionKey } = require('../properties/properties')
const parametrizacion = (data) => {
  try {
    return data.map(({ name, value, type, _schema }) => ({ nombre: name, valor: value, tipo: type }))
  } catch (error) {
    console.error(error)
    return error
  }
}

class SpParam {
  name
  value
  type
  schema

  constructor (name, value, type, schema = null) {
    this.name = name
    this.value = value
    this.type = type
    this.schema = schema
  }
}

exports.parametros = (req, tipo) => {
  switch (tipo) {
    case 'spGetListInfoBUE':
      return parametrizacion([
        new SpParam('case', req.case || 1, TYPES.Int),
        new SpParam('minDate', req.minDate || moment().format('2000-01-01'), TYPES.Date),
        new SpParam('maxDate', req.maxDate || moment().format('YYYY-MM-DD'), TYPES.Date),
        new SpParam('pagActual', (req.lenght) === 1 || (req.lenght) === true ? 1 : req.pagActual, TYPES.Int),
        new SpParam('pagTotal', (req.lenght) === 1 || (req.lenght) === true ? 1000 : req.pagTotal, TYPES.Int),
        new SpParam('lenght', (req.lenght) === 1 || (req.lenght) === true ? 1 : 0, TYPES.Bit)
      ])
    case 'spHashAPIBUE':
      return parametrizacion([
        new SpParam('user', req.user || null, TYPES.VarChar),
        new SpParam('key', encriptionKey, TYPES.VarChar)
      ])
    default:
      return null
  }
}
