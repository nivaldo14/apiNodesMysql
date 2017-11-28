// comentar multiplas linha shift+alt+A


const routes = (server) => {
  server.get('/', (req, res, next) => {
    res.send('teste server')
    next()
  })
  server.get()
  server.post()
  server.put()
  server.delete()
}

module.exports = routes
