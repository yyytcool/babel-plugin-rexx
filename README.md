<h1 align="center"> 🦖 babel-plugin-rexx </h1>

A Babel plugin designed to optimize the usage of the Rexx library within JavaScript projects. 

Rexx is a human-friendly regex library that offers structured syntax and variable support. 

This plugin enables developers to write regex patterns using Rexx's more readable syntax, which is then transformed into standard JavaScript regex patterns during the build process.

## Install

```sh
# Install rexx using npm
npm install --save-dev babel-plugin-rexx
# using Yarn
yarn add -D babel-plugin-rexx
```

## Usage
To use babel-plugin-rexx, add it to your `.babelrc` configuration:

```js
// .babelrc
{
  "plugins": ["babel-plugin-rexx"]
}
```

## Example
Example of transforming Rexx syntax into standard JavaScript regex patterns.
```js
// Using Rexx syntax for regex patterns
const regex1 = /*rexx*/" one_of { 'a', 'b', 'c' } "

const regex2 = /* rexx */ `
one_of { range {'a', 'z'} }
`
// After Babel transformation
const regex1 = {
	default: /[abc]/,
}
const regex2 = {
	default: /[a-z]/,
}
```

## Demo
Check out a live demo of babel-plugin-rexx in action [here](https://stackblitz.com/edit/babel-plugin-rexx-demo?file).

## Contributing

Contributions to this project are welcome.

Clone and fork:

```sh
git clone https://github.com/yyytcool/babel-plugin-rexx.git
```

## License

[Apache License](./LICENSE).

Copyright (c) 2024-present, yyytcool
