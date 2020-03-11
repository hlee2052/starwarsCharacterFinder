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
function fetchData(url, data = []) {
    return fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((res) => {
            let currentResult = processData(res.results);
            let characterList = data;

            characterList = [...characterList, ...currentResult];
            if (res.next != null) {
                return fetchData(res.next, characterList)
            }
            return characterList
        });
}

/*
TODO
1) some values are 'unknown' or 'none'
2) values are in String format... if they are over 999, eg) 1042 then the data is represented as '1,042'
--> convert into 1042 instead
3)

 */

// { 'male', 'n/a', 'female', 'hermaphrodite', 'none' }
let genderSet = new Set();
let hairColorSet = new Set();
let skinColorSet = new Set();

function processData(array) {

    for (let i = 0; i < array.length; i++) {
        // remove comma from mass index
        if (array[i]['mass'].indexOf(',') !== -1) {
            array[i]['mass'] = array[i]['mass'].replace(',', '')
        }

        // extract list of genders
        if (!genderSet.has(array[i]['gender'])) {
            genderSet.add(array[i]['gender'])
        }
    }

    return array;
}

const url = 'https://swapi.co/api/people/?page=1';
// save to a file

fetchData(url).then(data => {
    let object = {"characters": data}
    fs.writeFile("src/characters.json", JSON.stringify(object), (err) => {
        if (err) {
            console.log("fail to write");
        } else {
            console.log("Successfully loaded characters with count: " + data.length);
        }
    })
})
