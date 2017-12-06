const db = require('../services/mysql')

const routes = (server) => {
  server.get('plano', async (req, res, next) => {
    try {
      res.send(await db.planos().all())
    } catch (error) {
      res.send(error)
    }
    next()
  })
  server.post('plano', async (req, res, next) => {
    // const _nmPlano1 = req.params
    const _nmPlano = JSON.parse(JSON.stringify(req.body))


    try {
      // res.send(await db.planos().save(req.params.nmPlano))
      res.send(await db.planos().save(_nmPlano))
    } catch (error) {
      res.send(error)
    }
    next()
  })

  server.put('plano', async (req, res, next) => {
    //const {id, _altP } = req.params
    // const _nmPlano = JSON.parse(JSON.stringify(req.body))

    const _altP = req.params

   // console.log(_altP)

    try {
      // res.send(await db.planos().save(req.params.nmPlano))
      res.send(await db.planos().update(_altP))
    } catch (error) {
      res.send(error)
    }
    next()
  })
}

module.exports = routes
