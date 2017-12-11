require('dotenv').config()
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

})

//console.log(connection)

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

const usersModule = require('./users', errorHandler)({
  connection,
  errorHandler
})

const authModule = require('./auth', errorHandler)({
  connection,
  errorHandler
})

module.exports = {
  planos: () => planosModule,
  users: () => usersModule,
  auth: () => authModule
}
