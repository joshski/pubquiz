const express = require('express')
const renderHtml = require('./renderHtml')

module.exports = function buildApp(routes) {
  const app = express()

  routes(
    function defineRoute(path, route) {
      app.get(path, function (request, response) {
        route().then(responders => {
          response.send(renderHtml(responders.html()))
        }).catch(console.error)
      })
    }
  )

  return app
}