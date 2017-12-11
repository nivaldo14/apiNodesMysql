// require('dotenv').config()

const sha1 = require('sha1')
const jwt = require('jsonwebtoken')
const auth = deps => {
  return {
    authenticate: (_auth) => {
      return new Promise((resolve, reject) => {
        const {
          connection,
          errorHandler
        } = deps
        const queryStr = `select idUsuario,nmUsuario,email from tbUsu where email = ? and senha = ? and situacao ='A'`
        //const queryStr = `select idUsuario,email from tbUsu where email = ? and senha = ? and situacao ='A'`
        const queryData = [_auth.email, sha1(_auth.senha)]

        connection.query(queryStr, queryData, (error, results) => {
          if (error || !results.length) {
            errorHandler(error, 'Falha ao autenticar o usuario!', reject)
            return false
          }
          const {
            email,
            nmUsuario,
            idUsuario
          } = results[0]
          /*  console.log(results[0])
          console.log({email, idUsuario}) */

          // validade do token .. 24h
          const token = jwt.sign({
            email,
            nmUsuario,
            idUsuario
          }, process.env.JWT_SECRET, {
            expiresIn: 60 * 60 * 24
          })
          // console.log(token)

          resolve({
            token
            // token: 'nivaldo1234567890#'
          })
        })
      })
    }
  }
}

module.exports = auth
