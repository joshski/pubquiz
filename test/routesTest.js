const assert = require('assert')
const VirtualServer = require('../framework/test-framework/VirtualServer')
const routes = require('../app/routes')

describe('routes', function() {
  it('responds to requests', async function() {
    const server = new VirtualServer(routes)
    const response = await server.fetch('/')
    assert.strictEqual(await response.text(), '<h1>Coming Soon!</h1>')
  })
})
