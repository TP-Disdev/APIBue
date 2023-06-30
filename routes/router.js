const { loginAppUser, checkJwt } = require('../controllers/auth.controller')
const routes = require('../controllers/routes.controller')

module.exports = (router) => {
  router.post('/login', (req, res) => {
    loginAppUser(req, res)
  })

  MapSpRouter('/getListInfoBUE', 'spGetListInfoBUE')

  function MapSpRouter (route, spName) {
    router.post(route, checkJwt, (req, res) =>
      routes.CallSp(spName, req, res)
    )
  }
}
