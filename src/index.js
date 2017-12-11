require('dotenv').config()

const server = require('./server')

server.listen('3000')


/* 
fechar portas abertas
https://stackoverflow.com/questions/39632667/how-to-kill-a-currently-using-port-on-localhost-in-windows
 */