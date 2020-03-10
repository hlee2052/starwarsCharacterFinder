let expect = require("chai").expect;
let starwars = require("../src/index");
let testCharacters = require('../src/characters.json')


/*let newQuery = {
    /!* Return item that satisfies everything in AND
    or item that satisifies any one of OR Clause

    eg) I want people (contains name "Luke' who is at least 100 cm tall ) OR (gender is female, or eye is blue)
    --> returns Luke Skywalker,       every female or people whose eye is blue
    make sure not to include duplicates
     *!/
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
        /!*
            {
                hair_color: 'blue'
            },
           *!/

    ],
    "OR": [
        {gender: 'n/a'}
    ]
}*/

console.log('Starting test')


describe('testSearchCharacter', () => {

    it('testUndefinedClause', () => {
        let queryObject
        return starwars.searchCharacter(queryObject).then(res => {
            expect.fail()
        }).catch(err => {
            expect(err.length).to.equal(0)
        })
    })


    // Reject promise, with empty array
    it('testEmptyClause', () => {
        let queryObject = {}
        return starwars.searchCharacter(queryObject).then(res => {
            expect.fail()
        }).catch(err => {
            expect(err.length).to.equal(0)
        })
    })

    // test AND clause
    it('testSimpleAndClause', () => {
        let queryObject = {
            "AND": [
                {
                    name: "Sky",
                    name_exact: false
                }
            ],
            "OR": []
        }
        let expectedCharOne = getCharacterFromTestData("Luke Skywalker")

        let listOfExpected = [];
        listOfExpected.push(expectedCharOne)

        return starwars.searchCharacter(queryObject).then(res => {


        }).catch(err => {
            expect.fail();
        })
    })

    function getCharacterFromTestData(name) {
        return testCharacters['characters'].find(o => o.name === name)
    }
})


