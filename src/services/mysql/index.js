const mysqlServer = require('mysql')
// PARA FUNCIONAR O .ENV PRECISA INSTALAR A BIBLIOTECA 
// npm i --save-dev dotenv
// https://github.com/motdotla/dotenv
// aula 14

const connection = mysqlServer.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  port: process.env.MYSQL_PORTA,
  database: process.env.MYSQL_DATABASE
  /* host: 'localhost',
  user: 'root',
  password: 'root',
  port: '3306',
  database: 'dbcodecast' */
})

const errorHandler = (error, msg, rejectFunction) => {
  console.error(error)

  rejectFunction({
    error: msg
  })
}

const planosModule = require('./plano')({
  connection,
  errorHandler
})

// const AlunosModule = require('./aluno', errorHandler)({  connection })

module.exports = {
  planos: () => planosModule
  // alunos: () => AlunosModule
}
