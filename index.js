const fs= require('fs')
const path = require('path')
let characterArray  =  require('./characters.json')

/*try {
    let filePath = path.resolve(__dirname, 'characters.json' )
    characterArray = fs.readFileSync(filePath, 'utf8')
} catch (e) {
    console.log(e.toString())
    console.log("Failed to read file!")
}*/
characterArray = JSON.parse(characterArray)['characters']

function searchByGender() {

}

function searchByHeight(lo=0, hi=0) {
    let result = [];
    if (isNaN(lo) || isNaN(hi)) return result;
    if (lo===0 && hi===0) return characterArray;

    for (let i = 0; i<characterArray.length; i++) {
        let currentCharacter = characterArray[i];
        //console.log(currentCharacter)
        if (currentCharacter.height >=lo && currentCharacter.height >= hi) {
            result.push(currentCharacter)
        }
    }
    return result
}

function searchByMass() {

}

function searchByName () {

}

function listHeightRange() {

}
/*
    name: aa
    height: aa
    mass: aa
    hair : aa
 */
function searchByParam (object) {

}
/*
TODO
- should be searchable by parameters
- support for AND OR query
eg) height less than 150 AND mass greater than 75, OR hair color is BROWN
 */

/*
{
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
 */

console.log(searchByHeight())
module.exports = {
}