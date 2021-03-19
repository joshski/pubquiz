const buildApp = require('../framework/app-framework/buildApp')
const routes = require('./routes')

module.exports = buildApp(routes)
