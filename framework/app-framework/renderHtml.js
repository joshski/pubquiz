function renderHtml(node) {
  if (node.type === 'tag') {
    return renderTag(node)
  } else if (node.type === 'text') {
    return node.text
  }
}

function renderTag(node) {
  const renderedChildren = node.children ? node.children.map(renderHtml).join('') : ''
  return '<' + node.tagName + '>' + renderedChildren + '</' + node.tagName + '>'
}

module.exports = renderHtml