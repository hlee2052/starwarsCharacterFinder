let expect = require("chai").expect;
let starwars = require("../src/index");
let testCharacters = require('../src/characters.json')


console.log('Starting Unit Test')


describe('testSearchCharacter', () => {

    it('testUndefinedClause', () => {
        let queryObject
        return starwars.searchCharacter(queryObject).then(res => {
            expect.fail()
        }).catch(err => {
            expect(err.length).to.equal(0)
        })
    })

    it('testEmptyClause', () => {
        let queryObject = {}
        return starwars.searchCharacter(queryObject).then(res => {
            expect.fail()
        }).catch(err => {
            expect(err.length).to.equal(0)
        })
    })

    // test AND
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
        let expectedNames = ["Luke Skywalker", "Shmi Skywalker", "Anakin Skywalker"]
        let nameSet = new Set();
        for (let name of expectedNames) {
            nameSet.add(name)
        }

        return starwars.searchCharacter(queryObject).then(res => {
            expect(res.length).to.equal(nameSet.size)
            for (let curr of res) {
                let deleteSuccess = nameSet.delete(curr['name'])
            }
            expect(nameSet.size).to.equal(0)
        }).catch(err => {
            expect.fail();
        })
    })

    it('testExactNameMatchValid', () => {
        let queryObjectValid = {
            "AND": [
                {
                    name: "Luke Skywalker",
                    name_exact: true
                }
            ],
            "OR": []
        }

        let expectedCharOne = getCharacterFromTestData("Luke Skywalker")['name']

        let nameSet = new Set();
        nameSet.add(expectedCharOne)

        return starwars.searchCharacter(queryObjectValid).then(res => {
            expect(res.length).to.equal(nameSet.size)
            for (let curr of res) {
                let deleteSuccess = nameSet.delete(curr['name'])
            }
            expect(nameSet.size).to.equal(0)
        }).catch(err => {
            expect.fail();
        })
    })

    it('testExactNameMatchInvalid', () => {
        let queryObjectValid = {
            "AND": [
                {
                    name: "I love Kittens",
                    name_exact: true
                }
            ],
            "OR": []
        }
        return starwars.searchCharacter(queryObjectValid).then(res => {
            expect(res.length).to.equal(0)
        }).catch(err => {
            expect.fail();
        })
    })

    it('testComplexAnd', () => {
        let queryObject = {
            "AND": [
                {
                    height_lo: 180,
                    height_hi: 200
                },
                {
                    mass_lo: 60,
                    mass_hi: 90
                },
                {
                    gender: 'male'
                },
                {
                    skin_color: 'fair'
                }
            ],
            "OR": []
        }

        let expectedNames = ['Obi-Wan Kenobi', 'Anakin Skywalker', 'Han Solo', 'Boba Fett', 'Qui-Gon Jinn', 'Dooku']
        let nameSet = new Set();

        for (let name of expectedNames) {
            nameSet.add(name)
        }

        return starwars.searchCharacter(queryObject).then(res => {
            expect(res.length).to.equal(nameSet.size)
            for (let curr of res) {
                nameSet.delete(curr['name'])
            }
            expect(nameSet.size).to.equal(0)
        }).catch(err => {
            expect.fail();
        })
    })

    it('testOR', () => {
        let queryObject = {
            "AND": [],
            "OR": [
                {
                    mass_lo: 1000,
                    mass_hi: 5000
                },
                {
                    eye_color: 'NON EXISTENT - OR will ignore this'
                },
                {
                    skin_color: 'blue'
                }]
        }

        // query should get Jabba (the heaviest character, and any blue skin colored ones
        let expectedNames = ['Jabba Desilijic Tiure', 'R2-D2', 'Watto',
            'Dud Bolt', 'Gasgano', 'Ayla Secura', 'Ratts Tyerell', 'Mas Amedda', 'Shaak Ti']

        /*
        Jabba - skin_color: 'green-tan, brown',
        Watto - skin_color: blue, grey
        Ayla Secura - skin_cololr: blue
        ... etc
         */

        let nameSet = new Set();
        for (let name of expectedNames) {
            nameSet.add(name)
        }

        return starwars.searchCharacter(queryObject).then(res => {
            expect(res.length).to.equal(nameSet.size)
            for (let curr of res) {
                nameSet.delete(curr['name'])
            }
            expect(nameSet.size).to.equal(0)
        }).catch(err => {
            expect.fail();
        })
    })

    it('testAND_OR_Combined', () => {
        let queryObject = {
            "AND": [
                {
                    name: "Sky",
                    name_exact: false
                }
            ],
            "OR": [
                {
                    mass_lo: 1000,
                    mass_hi: 5000
                },
                {
                    eye_color: 'NON EXISTENT - OR will ignore this'
                },
                {
                    skin_color: 'blue'
                }]
        }

        // query should get Jabba (the heaviest character, and any blue skin colored ones
        let expectedNames = ['Jabba Desilijic Tiure', 'R2-D2', 'Watto',
            'Dud Bolt', 'Gasgano', 'Ayla Secura', 'Ratts Tyerell', 'Mas Amedda', 'Shaak Ti',
            'Luke Skywalker', 'Shmi Skywalker', 'Anakin Skywalker']
        /*
        Jabba - skin_color: 'green-tan, brown',
        Watto - skin_color: blue, grey
        Ayla Secura - skin_cololr: blue
        ... etc
         */

        let nameSet = new Set();
        for (let name of expectedNames) {
            nameSet.add(name)
        }

        return starwars.searchCharacter(queryObject).then(res => {
            console.log(res)
            expect(res.length).to.equal(nameSet.size)
            for (let curr of res) {
                nameSet.delete(curr['name'])
            }
            expect(nameSet.size).to.equal(0)
        }).catch(err => {
            expect.fail();
        })
    })

    function getCharacterFromTestData(name) {
        return testCharacters['characters'].find(o => o.name === name)
    }
})


