const rexx = require('rexx')

module.exports = ({ types: t }) => ({
  name: 'rexxPlugin',
  visitor: {
    TemplateLiteral (literal) {
      const leadingComments = literal.node.leadingComments
      const hasRexx = leadingComments?.some((comment) => comment.value.trim().toLowerCase() === 'rexx')
      if (hasRexx) {
        literal.node.leadingComments = leadingComments.filter((comment) => comment.value.trim().toLowerCase() !== 'rexx')
        literal.traverse({
          TemplateElement (element) {
            const regexObject = rexx(element.node.value.raw)
            const properties = Object.keys(regexObject).map(key => {
              const regex = regexObject[key]
              return t.objectProperty(
                t.identifier(key),
                t.regExpLiteral(regex.source, regex.flags)
              )
            })
            const objectLiteral = t.objectExpression(properties)
            element.replaceWith(objectLiteral)
          }
        })
      }
    },
    StringLiteral (literal) {
      const leadingComments = literal.node.leadingComments
      const hasRexx = leadingComments?.some((comment) => comment.value.trim().toLowerCase() === 'rexx')
      if (hasRexx) {
        literal.node.leadingComments = leadingComments.filter((comment) => comment.value.trim().toLowerCase() !== 'rexx')
        const regexObject = rexx(literal.node.value)
        const properties = Object.keys(regexObject).map(key => {
          const regex = regexObject[key]
          return t.objectProperty(
            t.identifier(key),
            t.regExpLiteral(regex.source, regex.flags)
          )
        })
        const objectLiteral = t.objectExpression(properties)
        literal.replaceWith(objectLiteral)
      }
    }
  }
})
