require('dotenv').config()
const planos = deps => {
  return {
    all: () => {
      return new Promise((resolve, reject) => {
        const {
          connection,
          errorHandler
        } = deps
        connection.query('select idPlano,nmPlano,descricao,situacao from tbPlano', (error, results) => {
          if (error) {
            errorHandler(error, 'Falha ao listar os planos!', reject)
            return false
          }
          resolve({
            planos: results
          })
        })
      })
    },

    save: (_nmPlano) => {
      var data = [
        /* nmPlano: _nmPlano.nmPlano,
        descricao: _nmPlano.descricao */
        [
          _nmPlano.nmPlano,
          _nmPlano.descricao
        ]
      ]

      return new Promise((resolve, reject) => {
        const {
          connection,
          errorHandler
        } = deps
        connection.query('insert into tbPlano (nmPlano,descricao) values ?', [data],
        // connection.query('insert into tbPlanoX (nmPlano,descricao) values (?,?)', [data.nmPlano, data.descricao],
          (error, results) => {
            if (error) {
              errorHandler(error, `Falha ao salvar o plano ${[_nmPlano.nmPlano]}`, reject)
              return false
            }
            resolve({ novoPlano: {_nmPlano, id: results.insertId} })
            // resolve({ novoPlano: {data, id: results.insertId} })
          })
      })
    },
    update: (_altP) => {

      console.log(_altP)
      return new Promise((resolve, reject) => {
        const {
          connection,
          errorHandler

        } = deps
        connection.query('update tbPlano set nmPlano = ?, descricao = ? where idPlano = ?',
          [_altP.nmPlano, _altP.descricao, _altP.id],
          (error, results) => {
            if (error || !results.affectedRows) {
              errorHandler(error, `Falha ao atualizar a o plano ${[_altP.nmPlano]}`, reject)
              return false
            }
            resolve({ updatePlano: {_altP, id:[_altP.id]} })
          })
      })
    }

  }
}

module.exports = planos
