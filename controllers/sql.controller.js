/* eslint-disable prefer-promise-reject-errors */
const properties = require('../properties/properties')
const Connection = require('tedious').Connection
const Request = require('tedious').Request

const connectionObject = {
  COL: properties.configtest,
  PERU: properties.configPeru,
  NIC: properties.configNic,
  GUY: properties.configGuy
}

const injectjson = (rows) => {
  return new Promise((resolve) => {
    const jsonArray = rows.map((columns) => {
      const rowObject = {}
      columns.forEach((column) => {
        rowObject[column.metadata.colName] = column.value
      })
      return rowObject
    })
    resolve(jsonArray)
  })
}

exports.query = (storedProcedure, parametros, actualCountry = 'COL') => {
  return new Promise((resolve, reject) => {
    const conn = new Connection(connectionObject[actualCountry] || properties.configtest)
    conn.on('connect', (err) => {
      if (err) {
        console.error('error - ', err)
        reject(err?.message)
      } else {
        const request = new Request(storedProcedure, (err, _rowCount, rows) => {
          if (err) {
            const errr = `error proc: ${storedProcedure} ${err?.procName} - message: ${err?.message} - procline - ${err?.lineNumber}`
            console.log(errr)
            reject(errr)
          } else {
            conn.close()
            injectjson(rows)
              .then((valor) => {
                try {
                  const temp = valor[0].Result ? JSON.parse(valor[0].Result) : valor
                  resolve(temp)
                } catch (error) {
                  resolve(valor)
                }
              })
              .catch((error) => reject(error))
          }
        })

        if (parametros) {
          try {
            parametros.forEach((valor) => {
              request.addParameter(valor.nombre, valor.tipo, valor.valor)
            })
          } catch (error) {
            console.log(error?.message)
            reject(error?.message)
          }
        }

        request.on('requestCompleted', () => {
          conn.close()
        })

        request.on('error', (error) => {
          console.error(error)
          reject(error)
        })

        try {
          conn.callProcedure(request)
        } catch (error) {
          console.error(error)
          reject(error)
        }
      }
    })

    conn.on('error', (error) => {
      console.error(error)
      reject(error)
      reject('error connecting server')
      conn.close()
    })

    conn.connect((err) => {
      if (err) {
        console.error('error - ', err)
        reject(err?.message)
      }
    })
  })
}
