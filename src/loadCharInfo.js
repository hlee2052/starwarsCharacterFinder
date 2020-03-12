const fetch = require("node-fetch");
const fs = require('fs')


/*
 This is script for the owner to run prior to publishing to NPM
  - swapi.co will only return at most 10 characters per request
  - each response has "next" --> either null or link to next page
  - Need to recursively call until you can fetch all characters
  - Result: creates characters.json file : array of characters

  - Owner should run this script to create characters.json before pushing to npm repository

  Note:
  - Recursive fetch takes long (a few sec). Thus, rather than making end user to call swapi api,
  owner can save these data
  - Because the character database does not get updated as "frequently", owner can just run script to update
  list of characters
*/

// Recursively fetch new data
function fetchDataFromSWAPI(url, data = []) {
    return fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((res) => {
            let currentResult = processData(res.results);
            let characterList = data;

            characterList = [...characterList, ...currentResult];
            if (res.next != null) {
                return fetchDataFromSWAPI(res.next, characterList)
            }
            return characterList
        });
}

// { 'male', 'n/a', 'female', 'hermaphrodite', 'none' }
let genderSet = new Set();
let hairColorSet = new Set();
let skinColorSet = new Set();
let eyeColorSet = new Set();

// mass and height range
let heightLo = Number.MAX_VALUE;
let heightHi = Number.MIN_VALUE;

let massLo = Number.MAX_VALUE;
let massHi = Number.MIN_VALUE;

function processData(array) {
    for (let i = 0; i < array.length; i++) {
        let currentElement = array[i]

        // remove comma from mass index
        if (currentElement['mass'].indexOf(',') !== -1) {
            currentElement['mass'] = currentElement['mass'].replace(',', '')
        }
        genderSet.add(currentElement['gender'])
        hairColorSet.add(currentElement['hair_color'])
        skinColorSet.add(currentElement['skin_color'])
        eyeColorSet.add(currentElement['eye_color'])

        let currentHeight = currentElement['height']
        let currentMass = currentElement['mass']
        if (!isNaN(currentHeight)) {
            heightLo = Math.min(heightLo, currentHeight)
            heightHi = Math.max(heightHi, currentHeight)
        }
        if (!isNaN(currentMass)) {
            massLo = Math.min(massLo, currentMass)
            massHi = Math.max(massHi, currentMass)
        }
    }
    return array;
}

const url = 'https://swapi.co/api/people/?page=1';

// save to a file
fetchDataFromSWAPI(url).then(data => {
    let object = {"characters": data}
    let writeCharacters =
        new Promise((resolve, reject) => {
            fs.writeFile(__dirname + "/characters.json", JSON.stringify(object), (err) => {
                if (err) {
                    console.log(err)
                    console.log("fail to write characters.json");
                    reject('fail')
                } else {
                    console.log("Successfully loaded characters with count: " + data.length);
                    resolve('ok')
                }
            })
        })

    let writeInfo =
        new Promise((resolve, reject) => {
            fs.writeFile(__dirname + "/info.json", JSON.stringify(generateInfo()), (err) => {
                if (err) {
                    console.log("fail to write characters.json");
                } else {
                    console.log("Successfully loaded info")
                }
            })
        })

    let promiseList = [writeCharacters, writeInfo]
    Promise.all(promiseList).then(() => {
        console.log('complete fetch....')
    })
})

function generateInfo() {
    let infoObject = {}
    infoObject.gender = Array.from(genderSet)
    infoObject.hair_color = Array.from(hairColorSet)
    infoObject.skin_color = Array.from(skinColorSet)
    infoObject.eye_color = Array.from(eyeColorSet)
    infoObject.height_min = heightLo
    infoObject.height_max = heightHi
    infoObject.mass_min = massLo
    infoObject.mass_max = massHi
    return infoObject
}
