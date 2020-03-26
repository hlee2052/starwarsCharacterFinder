const fs = require('fs')
const path = require('path')
let characterJsonFile = require('./characters.json')
let infoJsonFile = require('./info.json')
let characterArray = characterJsonFile['characters']

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