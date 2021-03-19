const startedAt = new Date()

const Mocha = require('mocha')
const fs = require('fs')
const { argv } = require('process')

const app = require('./app')
const colors = { cyan: "\x1b[36m", green: "\x1b[32m", red: "\x1b[31m" }

run()

function run() {
  console.clear()
  panel(colors.cyan, '🍺 Pub Quiz')
  runTests()
}

function runTests() {
  const mocha = new Mocha({ reporter: 'dot' })
  fs.readdirSync('./test').forEach(file => mocha.addFile('./test/' + file))
  mocha.run(testsFinished)
}

function testsFinished(failures) {
  if (failures === 0) {
    testsPassed()
  } else {
    testsFailed(failures)
  }
}

function testsPassed() {
  if (argv.includes('--exit')) {
    panel(
      colors.green,
      `Tests passed in ${elapsed()}ms`,
      'Server not running'
    )
    process.exit(0)
  } else {
    const port = startServer()
    panel(
      colors.green,
      `Tests passed in ${elapsed()}ms`,
      `Server running at http://localhost:${port}`
    )
  }
}

function testsFailed(failures) {
  panel(colors.red, `Tests failed in ${elapsed()}ms`)
  process.exit(failures)
}

function startServer() {
  const port = Number(process.env.PORT) || 8080
  app.listen(port)
  return port
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
