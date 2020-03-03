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
function fetchData(url, data =[]) {
    return fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((res) => {
            let currentResult = res.results;
            let characterList = data;
            characterList = [...characterList,...currentResult];
            if (res.next != null) {
                return fetchData(res.next, characterList)
            }
            return characterList
        });
}

const url = 'https://swapi.co/api/people/?page=1';

// save to a file
fetchData(url).then(data=> {
    let object = {"characters":data}

    fs.writeFile("characters.json", JSON.stringify(object), (err)=> {
        if (err) {
            console.log("fail write");
        } else {
            console.log("Successfully loaded characters with count: " + data.length);
        }
    })
})
