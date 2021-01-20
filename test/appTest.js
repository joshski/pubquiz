const assert = require('assert')
const http = require('http')
const app = require('../app')

describe('app', function() {
  it('responds to HTTP requests with HTML', async function() {
    const html = await httpGet('http://127.0.0.1:8181')
    assert.strictEqual(html, '<h1>Pub Quiz Coming Soon!</h1>')
  })

  let server

  before(async function startServer() {
    server = await app.listen(8181)
  })

  after(async function stopServer() {
    if (server) server.close()
  })

  function httpGet(url) {
    return new Promise(function (resolve, reject) {
      http.get(url, function (response) {
        let data = ''
        response.on('data', function (chunk) { data += chunk.toString() })
        response.on('end', function () { resolve(data) })
      }).on('error', function (e) {
        reject(e)
      })
    })
  }
})