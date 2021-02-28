const { once } = require('events')
const express = require('express')
const app = express()

app.get('/', (_, res) => res.send('<h1>Coming Soon!</h1>'))

module.exports = {
  name: '🍺 Pub Quiz',
  async listen(port) {
    await once(app.listen(port), 'listening')
  }
}
