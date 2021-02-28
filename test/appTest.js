const assert = require('assert')
const fetch = require('node-fetch')
const app = require('../app')

describe('app', function() {
  let server

  before(async function stopServer() {
    server = await app.listen(8181)
  })

  after(async function stopServer() {
    if (server) server.close()
  })

  it('responds to HTTP requests', async function() {
    const response = await fetch('http://127.0.0.1:8181')
    assert.strictEqual(await response.text(), '<h1>Coming Soon!</h1>')
  })
})