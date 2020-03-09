const fs = require('fs')
const path = require('path')
let characterArray = require('./characters.json')
//console.log(characterArray)
/*try {
    let filePath = path.resolve(__dirname, 'characters.json' )
    characterArray = fs.readFileSync(filePath, 'utf8')
} catch (e) {
    console.log(e.toString())
    console.log("Failed to read file!")
}*/


characterArray = characterArray['characters']

function searchByGender(gender = '') {
    // Gender is one of { 'male', 'n/a', 'female', 'hermaphrodite', 'none' }
    if (gender.length === 0) return characterArray

    let genderSet = new Set()
    // TODO, gender types are to be read by external file in the future
    genderSet.add('male').add('n/a').add('female').add('hermaphrodite').add('none')

    return new Promise((resolve, reject) => {
        let result = []
        if (!genderSet.has(gender)) resolve(result)

        for (let i = 0; i < characterArray.length; i++) {
            let currentCharacter = characterArray[i];
            if (currentCharacter.gender === gender) {
                result.push(currentCharacter)
            }
        }
        resolve(result)
    })
}

function searchByHeight(lo = 0, hi = 0) {
    return new Promise((resolve, reject) => {
        let result = [];
        if (isNaN(lo) || isNaN(hi)) resolve(result);
        if (lo === 0 && hi === 0) resolve(characterArray);
        for (let i = 0; i < characterArray.length; i++) {
            let currentCharacter = characterArray[i];
            if (currentCharacter.height >= lo && currentCharacter.height <= hi) {
                result.push(currentCharacter)
            }
        }
        resolve(result)
    })
}

// search By Height and Mass is basically identical code, but will separate it for future update
// Supports range query
function searchByMass(lo = 0, hi = 0) {
    return new Promise((resolve, reject) => {
        let result = [];
        if (isNaN(lo) || isNaN(hi)) reject(result)
        if (lo === 0 && hi === 0) resolve(characterArray)
        for (let i = 0; i < characterArray.length; i++) {
            let currentCharacter = characterArray[i];
            if (currentCharacter.mass >= lo && currentCharacter.mass <= hi) {
                result.push(currentCharacter)
            }
        }
        resolve(result)
    })
}

// Supports either exact, or contains word
function searchByName(name, exact = false) {
    name = name.toLowerCase()
    return new Promise((resolve, reject) => {
        let result = []
        if (typeof exact !== "boolean") reject(result)

        for (let i = 0; i < characterArray.length; i++) {
            let curr = characterArray[i]
            let currentName = curr.name.toLowerCase();
            if (exact) {
                if (currentName === name) {
                    result.push(curr)
                }
            } else {
                if (currentName.includes(name)) {
                    result.push(curr)
                }
            }
        }
        resolve(result)
    })
}

/*
    name: aa
    height: aa
    mass: aa
    hair : aa
 */

let object2 = {
    "name": "Luke Skywalker",
    "height": "172",
    "mass": "77",
    "hair_color": "blond",
    "skin_color": "fair",
    "eye_color": "blue",
    "birth_year": "19BBY",
    "gender": "male",
    "homeworld": "https://swapi.co/api/planets/1/",
    "films": [
        "https://swapi.co/api/films/2/",
        "https://swapi.co/api/films/6/",
        "https://swapi.co/api/films/3/",
        "https://swapi.co/api/films/1/",
        "https://swapi.co/api/films/7/"
    ],
    "species": [
        "https://swapi.co/api/species/1/"
    ],
    "vehicles": [
        "https://swapi.co/api/vehicles/14/",
        "https://swapi.co/api/vehicles/30/"
    ],
    "starships": [
        "https://swapi.co/api/starships/12/",
        "https://swapi.co/api/starships/22/"
    ],
    "created": "2014-12-09T13:50:51.644000Z",
    "edited": "2014-12-20T21:17:56.891000Z",
    "url": "https://swapi.co/api/people/1/"
}


let object = {
    "name": "Luke Skywalker",
    "height": "172",
    "mass": "77",
    "hair_color": "blond",
    "skin_color": "fair",
    "eye_color": "blue",
    "gender": "male",
}

let newQuery = {
    /* Return item that satisfies everything in AND
    or item that satisifies any one of OR Clause

    eg) I want people (contains name "Luke' who is at least 100 cm tall ) OR (gender is female, or eye is blue)
    --> returns Luke Skywalker,       every female or people whose eye is blue
    make sure not to include duplicates
     */
    "AND": [
        {
            name: "Luke",
            name_exact: true
        },
        {
            height_lo: 100,
            height_hi: 140
        },
        {
            hair_color: 'blue'
        },
        {
            mass_lo: 10,
            mass_hi: 10
        }

    ],
    "OR": [
        {
            skin_color: "pale"
        },
        {
            eye_color: "blue"
        },
        {gender: 'male'}

    ]
}


const queryList = [
    {
        name: '',
        name_exact: false
    },
    {
        height_lo: 0,
        height_hi: 0
    },
    {
        mass_lo: 0,
        mass_hi: 0
    },
    {hair_color: ''},
    {skin_color: ''},
    {eye_color: ''},
    {gender: ''}
]


//eg: name contains "Skywalker'  or height(between 120-190) or mass =77 and hair color_blond and eye_color blue
//  and any gender

function searchByParam(query) {
    return new Promise((resolve, reject) => {
        let result = []

        let andList = query['AND']
        let orList = query['OR']
        if ((andList === undefined || !Array.isArray(andList)) || (orList === undefined) || !Array.isArray(orList)) {
            //  At least one AND or OR clause must exist!
        }

        /*
        1. create OR query
        2. run the query
         */


    })

}


module.exports = {
    searchByHeight,
    searchByMass,
    searchByGender
}