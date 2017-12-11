const restify = require('restify')


const server = restify.createServer()

const routes = require('../http/routes')
const cors = require('./cors')
const jwtMiddleware = require('./jwtMiddleware')
const exclusions = ['/autenticacao']

server.pre(cors.preflight)
server.use(cors.actual)
// server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser())

// autenticacao token
// proncedimento para nao verificacao de rotas
server.use(jwtMiddleware({ exclusions }))
routes(server)

module.exports = server
