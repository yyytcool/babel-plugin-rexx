const babel = require('@babel/core')
const rexxPlugin = require('../src/index')

const transform = (code) => {
  return babel.transform(code, {
    plugins: [rexxPlugin]
  }).code
}

describe('rexx-object-plugin tests', () => {
  it('test 1', () => {
    const inputCode = 'const regex = /*rexx*/"one_of { \'abc\' }"'
    const output = transform(inputCode)
    const expected = `const regex = {
  default: /[abc]/
};`
    expect(output.trim()).toBe(expected.trim())
  })

  it('test 2', () => {
    const inputCode = `const regex = /*rexx*/\`
        one_of { 'abc' }\`
    ;`
    const output = transform(inputCode)
    const expected = `const regex = {
  default: /[abc]/
};`
    expect(output.trim()).toBe(expected.trim())
  })

  it('test 3', () => {
    const inputCode = `const regex = /*rexx*/\`
        one_of \`
    ;`
    expect(() => transform(inputCode)).toThrow(TypeError)
  })
})
