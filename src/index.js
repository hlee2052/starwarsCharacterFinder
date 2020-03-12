const fs = require('fs')
const path = require('path')
let characterJsonFile = require('./characters.json')
let infoJsonFile = require('./info.json')
let characterArray = characterJsonFile['characters']

// example character info
let example = {
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

let newQuery = {
    /* Return item that satisfies everything in AND
    or item that satisifies any one of OR Clause

    eg) I want people (contains name "Luke' who is at least 100 cm tall ) OR (gender is female, or eye is blue)
    --> returns Luke Skywalker,       every female or people whose eye is blue
    make sure not to include duplicates
     */
    "AND": [
        {
            name: "Sky",
            name_exact: false
        },
        {
            height_lo: 170,
            height_hi: 200
        },
        {
            mass_lo: 77,
            mass_hi: 79
        },
        {
            gender: 'male'
        }
    ],
    "OR": [
        {gender: 'n/a'}
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

function searchCharacter(query) {
    return new Promise((resolve, reject) => {
        let result = []
        let set = new Set();
        if (query === undefined) reject(result)

        let andList = query['AND']
        let orList = query['OR']
        if ((andList === undefined || !Array.isArray(andList)) || (orList === undefined) || !Array.isArray(orList)) {
            //  At least one AND or OR clause must exist!
            reject(result)
        }
        // For each character, compute whether AND or OR queries are satisfied
        for (let i = 0; i < characterArray.length; i++) {
            let currentChar = characterArray[i]
            let andClause = true;
            if (andList.length === 0) {
                andClause = false
            }
            for (let curr of andList) {
                andClause = checkEachClause(curr, currentChar)
                if (!andClause) {
                    // stop checking AND clause if any item returns false
                    break;
                }
            }
            let orClause = false;
            for (let curr of orList) {
                orClause |= checkEachClause(curr, currentChar)
                // No need to check other items if one is true in OR clause
                if (orClause) break;
            }
            if ((andClause || orClause) && !set.has(currentChar["name"])) {
                result.push(currentChar);
                set.add(currentChar["name"])
            }
        }
        resolve(result)
    })
}

// check the truth of each items in either AND or OR clause
function checkEachClause(currAnd, currentChar) {
    // each AND object must only contain EITHER one or two, thus check length...
    // eg) invalid: {name:"Luke", height_lo: "..."} --> name and height cannot be together
    if ("name" in currAnd) {
        return checkName(currAnd, currentChar);
    } else if ("height_lo" in currAnd) {
        return checkHeight(currAnd, currentChar)
    } else if ("mass_lo" in currAnd) {
        return checkMass(currAnd, currentChar)
    } else if ("hair_color" in currAnd) {
        return checkHairColor(currAnd, currentChar)
    } else if ("skin_color" in currAnd) {
        return checkSkinColor(currAnd, currentChar)
    } else if ("eye_color" in currAnd) {
        return checkEyeColor(currAnd, currentChar)
    } else if ("gender" in currAnd) {
        return checkGender(currAnd, currentChar)
    }
    return false;
}

function checkName(clause, currentChar) {
    // only two clauses name, name_exact
    if (Object.keys(clause).length !== 2 || !"name_exact" in clause) return false;
    if (clause["name_exact"]) {
        return (currentChar["name"] === clause["name"])
    } else {
        return currentChar["name"].includes(clause["name"])
    }
}

function checkHeight(clause, currentChar) {
    if (Object.keys(clause).length !== 2 || !"height_hi" in clause) return false;

    let currentCharHeight = currentChar['height'];
    let loLimit = clause['height_lo']
    let hiLimit = clause['height_hi']

    return currentCharHeight >= loLimit && currentCharHeight <= hiLimit;
}

function checkMass(clause, currentChar) {
    if (Object.keys(clause).length !== 2 || !"mass_hi" in clause) return false;

    let currentCharMass = currentChar['mass'];
    let loLimit = clause['mass_lo']
    let hiLimit = clause['mass_hi']

    return currentCharMass >= loLimit && currentCharMass <= hiLimit;
}

function checkHairColor(clause, currentChar) {
    if (Object.keys(clause).length !== 1) return false;
    return currentChar['hair_color'].includes(clause['hair_color'])
}

function checkSkinColor(clause, currentChar) {
    if (Object.keys(clause).length !== 1) return false;
    return currentChar['skin_color'].includes(clause['skin_color'])
}

function checkEyeColor(clause, currentChar) {
    if (Object.keys(clause).length !== 1) return false;
    return currentChar['eye_color'].includes(clause['eye_color'])
}

function checkGender(clause, currentChar) {
    if (Object.keys(clause).length !== 1) return false;
    return currentChar['gender'] === clause['gender']
}


function getObjectTemplate() {
    return {
        name: '',
        height: '',
        mass: '',
        hair_color: '',
        skin_color: '',
        eye_color: '',
        birth_year: '',
        gender: '',
        homeworld: '',
        films: [],
        species: [],
        vehicles: [],
        starships: [],
        created: '',
        edited: '',
        url: ''
    }
}

// add new entry
function addNewEntry(object) {
    return new Promise((resolve, reject) => {
        if (object === undefined || Object.keys(object).length === 0 || !'name' in object) {
            reject("fail")
        } else {
            let name = object['name']
            // see if exists
            searchByName(name, true).then((res) => {
                // cannot add entry if name exists!
                if (res.length !== 0) {
                    reject("fail")
                    return;
                }
            }).then((res) => {
                characterArray.push(object)
                resolve(true)
            })
        }
    })
}

function removeEntry(name) {
    return new Promise((resolve, reject) => {
        for (let i = characterArray.length - 1; i >= 0; --i) {
            if (characterArray[i].name === name) {
                characterArray.splice(i, 1);
            }
        }
        resolve(true)
    })
}

function getOriginalData() {
    return characterArray
}

function searchByGender(gender = '') {
    if (gender.length === 0) return characterArray
    let genderSet = new Set()
    let genderList = infoJsonFile['gender']
    console.log(genderList)
    for (let gender of genderList) {
        genderSet.add(gender)
    }

    return new Promise((resolve, reject) => {
        let result = []
        if (!genderSet.has(gender)) resolve(result)

        for (let character of characterArray) {
            if (character.gender === gender) result.push(character)
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

function getParameterDetails() {
    return new Promise((resolve, reject) => {
        if (infoJsonFile) {
            resolve(infoJsonFile)
        } else {
            reject("fail")
        }
    })
}

module.exports = {
    searchByHeight,
    searchByMass,
    searchByGender,
    searchCharacter,
    addNewEntry,
    getOriginalData,
    removeEntry,
    getParameterDetails
}