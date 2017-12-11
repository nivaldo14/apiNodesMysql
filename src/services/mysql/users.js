require('dotenv').config()

const sha1 = require('sha1')
// quando instala o sha1 tem um bug ..
// precisa deletar a pasta node_modules e aplicar o npm i para instalar novamente o modules

const users = deps => {
  return {
    all: () => {
      return new Promise((resolve, reject) => {
        const {
          connection,
          errorHandler
        } = deps
        connection.query('select idUsuario,nmUsuario,email,senha from tbUsu', (error, results) => {
          if (error) {
            errorHandler(error, 'Falha ao listar os usuario!', reject)
            return false
          }
          resolve({
            users: results
          })
        })
      })
    },
    save: (_users) => {
      const data = [
        [
          _users.email,
          sha1(_users.pwd)
        ]
      ]
      return new Promise((resolve, reject) => {
        const {
          connection,
          errorHandler
        } = deps
        connection.query('insert into tbUser (email,senha) values ?', [data],
          (error, results) => {
            if (error) {
              errorHandler(error, `Falha ao salvar o users ${[_users.email]}`, reject)
              return false
            }
            resolve({
              novoAuth: {
                _users,
                id: results.insertId
              }
            })
          })
      })
    }

  }
}

module.exports = users

/* update: (_altP) => {
  console.log(_altP)
  return new Promise((resolve, reject) => {
    const {
      connection,
      errorHandler

    } = deps
    connection.query('update tbPlano set users = ?, descricao = ? where users = ?', [_altP.nmPlano, _altP.descricao, _altP.id],
      (error, results) => {
        if (error || !results.affectedRows) {
          errorHandler(error, `Falha ao atualizar a o users ${[_altP.nmPlano]}`, reject)
          return false
        }
        resolve({
          updatePlano: {
            _altP,
            id: [_altP.id]
          }
        })
      })
    })
  }
}
*/
