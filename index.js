const express = require('express')

const server = express()

// configura a api para receber dados em formato json
server.use(express.json())



// configura a porta local
server.listen(3333)