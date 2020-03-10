Starwars Character Finder

- data is from swapi.co

- Prior to publish, must run loadCharInfo.js to create JSON with initial data
- search for Starwars character based on some parameters

- usage:
1. Create an Object with the following format:
    let query = {"AND":[], "OR":[]}

2. In either AND or OR array, one can add one of the following objects...
```javascript
   {
        name: String,
        name_exact: Boolean
    },
    {
        height_lo: Integer,
        height_hi: Integer
    },
    {
        mass_lo: Integer,
        mass_hi: Integer
    },
    {hair_color: String},
    {skin_color: String},
    {eye_color: String},
    {gender: String}
 ```

 3. Example:
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

const sw = require('starwars_character_finder');
sw.searchCharacter(queryObject).then(res=>(console.log(res))

-----
returns the items that satisfies the AND clause + OR clause

[
   {
      "name":"Luke Skywalker",
      "height":"172",
      "mass":"77",
      "hair_color":"blond",
      "skin_color":"fair",
      "eye_color":"blue",
      "birth_year":"19BBY",
      "gender":"male",
      "homeworld":"https://swapi.co/api/planets/1/",
      "films":[
         "https://swapi.co/api/films/2/",
         "https://swapi.co/api/films/6/",
         "https://swapi.co/api/films/3/",
         "https://swapi.co/api/films/1/",
         "https://swapi.co/api/films/7/"
      ],
      "species":[
         "https://swapi.co/api/species/1/"
      ],
      "vehicles":[
         "https://swapi.co/api/vehicles/14/",
         "https://swapi.co/api/vehicles/30/"
      ],
      "starships":[
         "https://swapi.co/api/starships/12/",
         "https://swapi.co/api/starships/22/"
      ],
      "created":"2014-12-09T13:50:51.644000Z",
      "edited":"2014-12-20T21:17:56.891000Z",
      "url":"https://swapi.co/api/people/1/"
   },
   {
      "name":"R2-D2",
      "height":"96",
      "mass":"32",
      "hair_color":"n/a",
      "skin_color":"white, blue",
      "eye_color":"red",
      "birth_year":"33BBY",
      "gender":"n/a",
      "homeworld":"https://swapi.co/api/planets/8/",
      "films":[
         "https://swapi.co/api/films/2/",
         "https://swapi.co/api/films/5/",
         "https://swapi.co/api/films/4/",
         "https://swapi.co/api/films/6/",
         "https://swapi.co/api/films/3/",
         "https://swapi.co/api/films/1/",
         "https://swapi.co/api/films/7/"
      ],
      "species":[
         "https://swapi.co/api/species/2/"
      ],
      "vehicles":[

      ],
      "starships":[

      ],
      "created":"2014-12-10T15:11:50.376000Z",
      "edited":"2014-12-20T21:17:50.311000Z",
      "url":"https://swapi.co/api/people/3/"
   },
   {
      "name":"Anakin Skywalker",
      "height":"188",
      "mass":"84",
      "hair_color":"blond",
      "skin_color":"fair",
      "eye_color":"blue",
      "birth_year":"41.9BBY",
      "gender":"male",
      "homeworld":"https://swapi.co/api/planets/1/",
      "films":[
         "https://swapi.co/api/films/5/",
         "https://swapi.co/api/films/4/",
         "https://swapi.co/api/films/6/"
      ],
      "species":[
         "https://swapi.co/api/species/1/"
      ],
      "vehicles":[
         "https://swapi.co/api/vehicles/44/",
         "https://swapi.co/api/vehicles/46/"
      ],
      "starships":[
         "https://swapi.co/api/starships/59/",
         "https://swapi.co/api/starships/65/",
         "https://swapi.co/api/starships/39/"
      ],
      "created":"2014-12-10T16:20:44.310000Z",
      "edited":"2014-12-20T21:17:50.327000Z",
      "url":"https://swapi.co/api/people/11/"
   },
   {
      "name":"Jabba Desilijic Tiure",
      "height":"175",
      "mass":"1358",
      "hair_color":"n/a",
      "skin_color":"green-tan, brown",
      "eye_color":"orange",
      "birth_year":"600BBY",
      "gender":"hermaphrodite",
      "homeworld":"https://swapi.co/api/planets/24/",
      "films":[
         "https://swapi.co/api/films/4/",
         "https://swapi.co/api/films/3/",
         "https://swapi.co/api/films/1/"
      ],
      "species":[
         "https://swapi.co/api/species/5/"
      ],
      "vehicles":[

      ],
      "starships":[

      ],
      "created":"2014-12-10T17:11:31.638000Z",
      "edited":"2014-12-20T21:17:50.338000Z",
      "url":"https://swapi.co/api/people/16/"
   },
   {
      "name":"Watto",
      "height":"137",
      "mass":"unknown",
      "hair_color":"black",
      "skin_color":"blue, grey",
      "eye_color":"yellow",
      "birth_year":"unknown",
      "gender":"male",
      "homeworld":"https://swapi.co/api/planets/34/",
      "films":[
         "https://swapi.co/api/films/5/",
         "https://swapi.co/api/films/4/"
      ],
      "species":[
         "https://swapi.co/api/species/13/"
      ],
      "vehicles":[

      ],
      "starships":[

      ],
      "created":"2014-12-19T17:48:54.647000Z",
      "edited":"2014-12-20T21:17:50.395000Z",
      "url":"https://swapi.co/api/people/40/"
   },
   {
      "name":"Shmi Skywalker",
      "height":"163",
      "mass":"unknown",
      "hair_color":"black",
      "skin_color":"fair",
      "eye_color":"brown",
      "birth_year":"72BBY",
      "gender":"female",
      "homeworld":"https://swapi.co/api/planets/1/",
      "films":[
         "https://swapi.co/api/films/5/",
         "https://swapi.co/api/films/4/"
      ],
      "species":[
         "https://swapi.co/api/species/1/"
      ],
      "vehicles":[

      ],
      "starships":[

      ],
      "created":"2014-12-19T17:57:41.191000Z",
      "edited":"2014-12-20T21:17:50.401000Z",
      "url":"https://swapi.co/api/people/43/"
   },
   {
      "name":"Ayla Secura",
      "height":"178",
      "mass":"55",
      "hair_color":"none",
      "skin_color":"blue",
      "eye_color":"hazel",
      "birth_year":"48BBY",
      "gender":"female",
      "homeworld":"https://swapi.co/api/planets/37/",
      "films":[
         "https://swapi.co/api/films/5/",
         "https://swapi.co/api/films/4/",
         "https://swapi.co/api/films/6/"
      ],
      "species":[
         "https://swapi.co/api/species/15/"
      ],
      "vehicles":[

      ],
      "starships":[

      ],
      "created":"2014-12-20T09:48:01.172000Z",
      "edited":"2014-12-20T21:17:50.409000Z",
      "url":"https://swapi.co/api/people/46/"
   },
   {
      "name":"Dud Bolt",
      "height":"94",
      "mass":"45",
      "hair_color":"none",
      "skin_color":"blue, grey",
      "eye_color":"yellow",
      "birth_year":"unknown",
      "gender":"male",
      "homeworld":"https://swapi.co/api/planets/39/",
      "films":[
         "https://swapi.co/api/films/4/"
      ],
      "species":[
         "https://swapi.co/api/species/17/"
      ],
      "vehicles":[

      ],
      "starships":[

      ],
      "created":"2014-12-20T09:57:31.858000Z",
      "edited":"2014-12-20T21:17:50.414000Z",
      "url":"https://swapi.co/api/people/48/"
   },
   {
      "name":"Gasgano",
      "height":"122",
      "mass":"unknown",
      "hair_color":"none",
      "skin_color":"white, blue",
      "eye_color":"black",
      "birth_year":"unknown",
      "gender":"male",
      "homeworld":"https://swapi.co/api/planets/40/",
      "films":[
         "https://swapi.co/api/films/4/"
      ],
      "species":[
         "https://swapi.co/api/species/18/"
      ],
      "vehicles":[

      ],
      "starships":[

      ],
      "created":"2014-12-20T10:02:12.223000Z",
      "edited":"2014-12-20T21:17:50.416000Z",
      "url":"https://swapi.co/api/people/49/"
   },
   {
      "name":"Mas Amedda",
      "height":"196",
      "mass":"unknown",
      "hair_color":"none",
      "skin_color":"blue",
      "eye_color":"blue",
      "birth_year":"unknown",
      "gender":"male",
      "homeworld":"https://swapi.co/api/planets/50/",
      "films":[
         "https://swapi.co/api/films/5/",
         "https://swapi.co/api/films/4/"
      ],
      "species":[
         "https://swapi.co/api/species/27/"
      ],
      "vehicles":[

      ],
      "starships":[

      ],
      "created":"2014-12-20T10:53:26.457000Z",
      "edited":"2014-12-20T21:17:50.442000Z",
      "url":"https://swapi.co/api/people/59/"
   },
   {
      "name":"Ratts Tyerell",
      "height":"79",
      "mass":"15",
      "hair_color":"none",
      "skin_color":"grey, blue",
      "eye_color":"unknown",
      "birth_year":"unknown",
      "gender":"male",
      "homeworld":"https://swapi.co/api/planets/38/",
      "films":[
         "https://swapi.co/api/films/4/"
      ],
      "species":[
         "https://swapi.co/api/species/16/"
      ],
      "vehicles":[

      ],
      "starships":[

      ],
      "created":"2014-12-20T09:53:15.086000Z",
      "edited":"2016-06-30T12:52:19.604868Z",
      "url":"https://swapi.co/api/people/47/"
   },
   {
      "name":"Shaak Ti",
      "height":"178",
      "mass":"57",
      "hair_color":"none",
      "skin_color":"red, blue, white",
      "eye_color":"black",
      "birth_year":"unknown",
      "gender":"female",
      "homeworld":"https://swapi.co/api/planets/58/",
      "films":[
         "https://swapi.co/api/films/5/",
         "https://swapi.co/api/films/6/"
      ],
      "species":[
         "https://swapi.co/api/species/35/"
      ],
      "vehicles":[

      ],
      "starships":[

      ],
      "created":"2014-12-20T18:44:01.103000Z",
      "edited":"2014-12-20T21:17:50.486000Z",
      "url":"https://swapi.co/api/people/78/"
   }
]
