<h1 align="center">Welcome to starwars_character_finder 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/starwars_character_finder" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/starwars_character_finder.svg">
  </a>
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
</p>

> A npm  package to search Starwars characters based on certain attributes, such as gender, eye color and skin color
>
>Data derived from www.swapi.co

## Install

```sh
npm install starwars_character_finder
```
## Repo Overview (FYI only)
- data is obtained from www.swapi.co
- loadCharInfo.js parses info from swapi.co and creates json files to be read
- index.js - implements functions
- test.js - test cases for the operations

## Usage
**To import**:
```javascript
const sw = require('starwars_character_finder')
```
**To Search for character based on attributes, such as height, eye color, etc:**
```javascript
sw.searchCharacter(query).then(res=>(console.log(res))
```
where query is a JavaScript object in the following form:

```javascript
let query = {"AND":[], "OR":[]}

// query will get items that match all items in AND and any one item in OR
```
and the AND or OR array can have any of the following object:

```javascript
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
```
sample data:

| hair_color        | skin_color           | eye_color  |
| ------------- |:-------------:| -----:| 
| none      | none | blue | 
| n/a      | gold      |   yellow |
| blonde | white      |    red |
| brown | blue      |    brown |
| grey | light      |    blue-gray |
| black | red      |    black |
| auburn | unknown      |    orange |
| white | green      |    hazel |
| unknown | green-tan      |    pink |
|  | brown      |    unknown |
|  | pale      |    blue |
|  | metal      |    gold |
|  | dark      |    green |
|  | brown mottle      |   white |
|  | grey      |    dark |
|  | yellow      |     |
|  | silver     |     |
|  | fair     |     |

height range : 66 - 264 cm

mass range: 15, 1358 kg

name_exact : true for exact search, false for partial match

To get complete details on above data as JSON, 
```javascript
sw.getParameterDetails().then(res=>(console.log(res)))
````
**Complete example for searching**:
```javascript
let query = {
               "AND":[
                  {
                     "name":"Sky",
                     "name_exact":false
                  }
               ],
               "OR":[
                  {
                     "mass_lo":150,
                     "mass_hi":1900
                  },
                  {
                     "eye_color":"SOME INVALID ITEM"
                  },
                  {
                     "skin_color":"blue"
                  }
               ]
            }
sw.searchCharacter(query).then(res=>(console.log(res))) 
```
**To add/remove characters**

Add - If query has no "name" key or tries to add an existig character (eg, Luke Skywalker), then promise is rejected
```javascript
let addQuery = {
   "name":"New Person",
   "eye_color":"blue"
}
sw.addNewEntry(addQuery).then(res=>(...)).catch(err=>(...))
```
Remove - Remove based on name
```javascript
  sw.removeEntry('Luke Skywalker').then(res=>())
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
