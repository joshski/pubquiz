const startedAt = new Date()

const reset = "\x1b[0m"
const green = "\x1b[32m"
const red = "\x1b[31m"
const cyan = "\x1b[36m"

console.clear()
showPanel(cyan, '🍺 Pub Quiz')

const Mocha = require('mocha')
const app = require('./app.js')
const process = require('process')
 
const mocha = new Mocha({ reporter: 'dot' })

mocha.addFile(`./test/appTest.js`)

const port = Number(process.env.PORT) || 8080

mocha.run((failures) => {
  const elapsedMilliseconds = (new Date() - startedAt)
  if (failures == 0) {
    testsPassed(elapsedMilliseconds)
  } else {
    testsFailed(failures, elapsedMilliseconds)
  }
})

function testsPassed(elapsedMilliseconds) {
  showPanel(
    green,
    `👮 Tests passed in ${elapsedMilliseconds} ms...`,
    '',
    `🌍 Server running at http://localhost:${port}`
  )
  app.listen(port)
}

function testsFailed(failures, elapsedMilliseconds) {
  showPanel(red, `Tests failed in ${elapsedMilliseconds} ms`)
  process.exit(failures)
}

function showPanel(borderColour, ...texts) {
  const line = '-'.repeat(80)
  log([borderColour + line].concat(texts).concat([borderColour + line + reset]))
}

function log(messages) {
  for (const message of messages) { console.log(message) }
}