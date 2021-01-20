const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('<h1>Pub Quiz Coming Soon!</h1>')
})

module.exports = {
  listen(port) {
    return new Promise(resolve => {
      const server = app.listen(port, function () { resolve(server) })
    })
  }
}
