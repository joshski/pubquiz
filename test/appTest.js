const assert = require('assert')
const app = require('../app')

const TestServer = require('../TestServer')

describe('app', function() {
  beforeEach(async function () { this.server = await TestServer.start(app) })
  afterEach(async function () { await this.server.stop() })
  
  it('responds to HTTP requests', async function() {
    const response = await this.server.fetch('/')
    assert.strictEqual(await response.text(), '<h1>Coming Soon!</h1>')
  })
})
