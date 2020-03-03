const fetch = require("node-fetch");
const fs = require('fs')


/*
 This is script for the owner to run prior to publishing to NPM


*/

function fetchData(url, data =[]) {
    return fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((res) => {
            let currentResult = res.results
            let newData = data
            newData = [...newData,...currentResult]
            if (res.next!=null) {
                return fetchData(res.next, newData)
            }
            return newData
        });

}

const url = 'https://swapi.co/api/people/?page=1'

fetchData(url).then(data=> {
    fs.writeFile("characters.json", JSON.stringify(data), (err)=> {
        if (err) console.log("fail write")
    })
})
