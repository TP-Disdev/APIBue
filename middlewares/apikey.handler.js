const { apiKey } = require('../properties/properties')

exports.checkApiKey = (req, res, next) => {
  const clientApiKey = req.headers['APIKEY'.toLowerCase()]
  if (clientApiKey !== apiKey) {
    return res.status(400).json({
      statusCode: 400,
      error: 'Invalid API Key'
    })
  }
  next()
}
