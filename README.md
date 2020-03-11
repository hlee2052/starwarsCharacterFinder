<h1 align="center">Welcome to starwars_character_finder 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/starwars_character_finder" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/starwars_character_finder.svg">
  </a>
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
</p>

> npm  package to search starwars characters based on certain attributes

## Install

```sh
npm install starwars_character_finder
```

## Usage

```sh
  let query = {"AND":[], "OR":[]}
    AND or OR array can contain any number of the following objects
    TODO
    specify values
  {
        name: String,
        name_exact: Boolean
    },
    {
        height_lo: Integer,
        height_hi: Integer
    },
    {
        mass_lo: Integer,
        mass_hi: Integer
    },
    {hair_color: String},
    {skin_color: String},
    {eye_color: String},
    {gender: String}

    const sw = require('starwars_character_finder');
    sw.searchCharacter(query).then(res=>(console.log(res))

```

## Run tests

```sh
npm run test
```

## Author

👤 **Henry Lee**

* Github: [@hlee2052](https://github.com/hlee2052)

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_