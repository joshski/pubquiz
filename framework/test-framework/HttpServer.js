const { once } = require('events')
const fetch = require('node-fetch')

class TestServer {
  constructor(netServer, fetcher = fetch) {
    this.netServer = netServer
    this.fetcher = fetcher
  }

  static async start(app, fetch) {
    const netServer = app.listen(0)
    await once(netServer, 'listening')
    return new TestServer(netServer, fetch)
  }

  async fetch(path, ...args) {
    return this.fetcher(`http://127.0.0.1:${this.netServer.address().port}${path}`, ...args)
  }

  async stop() {
    this.netServer.close()
    await once(this.netServer, 'close')
  }
}

module.exports = TestServer