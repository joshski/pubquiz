const renderHtml = require('../app-framework/renderHtml')

module.exports = class Harness {
  constructor(routes) {
    this.registeredRoutes = []
    routes((path, respond) => {
      this.registeredRoutes.push({ path, respond })
    })
  }

  async fetch(path) {
    const route = this.registeredRoutes.find(route => route.path === path)
    const response = await route.respond()
    return {
      async text() {
        return renderHtml(await response.html())
      }
    }
  }
}