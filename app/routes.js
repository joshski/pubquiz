async function homePage() {
  return {
    html: () => ({type: 'tag', tagName: 'h1', children: [{type: 'text', text: 'Coming Soon!'}]})
  }
}

module.exports = function routes(route) {
  route('/', homePage)
}
