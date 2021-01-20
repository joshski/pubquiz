const startedAt = new Date()

const process = require('process')
const Mocha = require('mocha')
const app = require('./app.js')

const appName = '🍺 Pub Quiz'
const colors = { cyan: "\x1b[36m", green: "\x1b[32m", red: "\x1b[31m" }

run()

function run() {
  console.clear()
  panel(colors.cyan, appName)
  runTests()
}

function runTests() {
  const mocha = new Mocha({ reporter: 'dot' })
  mocha.addFile(`./test/appTest.js`)
  mocha.run(testsFinished)
}

function testsFinished(failures) {
  if (failures == 0) {
    testsPassed()
  } else {
    testsFailed(failures)
  }
}

function testsPassed() {
  const port = startServer()
  panel(
    colors.green,
    `${appName} Tests passed in ${elapsed()}ms`,
    `${appName} Server running at http://localhost:${port}`
  )
}

function startServer() {
  const port = Number(process.env.PORT) || 8080
  app.listen(port)
  return port
}

function testsFailed(failures) {
  panel(colors.red, `Tests failed in ${elapsed()}ms`)
  process.exit(failures)
}

function elapsed() {
  return new Date() - startedAt
}

function panel(color, ...texts) {
  const line = '-'.repeat(80)
  const eol = "\n"
  const reset = "\x1b[0m"
  console.log(color + line + eol + texts.join(eol + eol) + eol + line + eol + reset)
}
