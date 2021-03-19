const assert = require('assert')
const app = require('../app')

const TestServer = require('../framework/test-framework/HttpServer')

describe('app (with a server)', function() {
  it('responds to requests', async function() {
    this.server = await TestServer.start(app)
    const response = await this.server.fetch('/')
    assert.strictEqual(await response.text(), '<h1>Coming Soon!</h1>')
  })

  afterEach(async function () {
    if (this.server) await this.server.stop()
  })
})
