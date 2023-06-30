require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const bodyParser = require('body-parser')
const properties = require('./properties/properties')
const port = properties.PORT
const app = express()
const requestIp = require('request-ip')
const helmet = require('helmet')
const router = express.Router()
const routes = require('./routes/router')
const { jwt } = require('./controllers/jwt.controller')
const { logger, middleware, errorHandler } = require('./controllers/err.handler')/*  */
const { exceptionHandler } = require('./controllers/csrf.handler')/*  */
const path = require('path')
const corsOptions = {
  // origin: "Aqui va la DNS",
  origin: [
    'https://apibuedev.teleperformance.co',
    'https://apibuetest.teleperformance.co',
    'https://apibuetpf.teleperformance.co'
  ]
}
app.use(cors(corsOptions))
app.use(
  helmet.frameguard({
    action: 'deny'
  })
)
app.use((_req, res, next) => {
  res.set({
    'Cache-Control': 'no-cache, no-store, must-revalidate'
  })
  next()
})
app.use(helmet.noSniff())
app.use(helmet.hidePoweredBy())
app.use(helmet.permittedCrossDomainPolicies())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.disable('x-powered-by')
app.use(
  bodyParser.json({
    limit: '10mb',
    type: 'application/json'
  })
)
app.use(requestIp.mw())
app.use(logger)
app.use(express.static(path.join(__dirname, '/dist')))

app.use(middleware)/*  */
app.use(cookieParser())
app.use(exceptionHandler)/*  */

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'))
})
app.use(jwt())
app.use(errorHandler)

app.use('/api', router)
routes(router)

app.listen(port, function () {
  console.log(
    properties.ENV,
    ': Listening on port',
    port,
    '- start:',
    Date(Date.now()).toString()
  )
})
