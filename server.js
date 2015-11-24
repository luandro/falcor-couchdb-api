import express from 'express'
import bodyParser from 'body-parser'
/* Database */
import cradle from 'cradle'
import seed from './seed'
/* Falcor */ 
import FalcorServer from 'falcor-express'
import {createClass} from 'falcor-router'

const hostname = process.env.HOSTNAME || "localhost"
const port = process.env.PORT || 3000
const app = express()
const db = new(cradle.Connection)().database('dragon-ball')

/**
 * Seed data
 */
if(process.env.NODE_ENV!=="production") {
	seed(db)
} 

/* Check if database exists, if not create */
db.exists((err, exists) => {
    if (err) {
      	console.log('error', err)
    } else if (exists) {
      	console.log('==> 💽  Database created! ')
    } else {
      	console.log('database does not exists.')
      	db.create((err) => {
      		console.log("err:", err)
 		})
    }
})

/**
 * Falcor router
 */
const CharactersRouter = createClass([
    {
        route: 'characters[{integers:charactersIndex}]',
        get: (pathSet) => {
            console.log("==> 🔍  pathSet:", pathSet)
            let results = [];
            const data = db.get('sayans-saga', (err, doc) => {
                if(err) { console.log("==> 💊  ERROR:", err)}
                return doc
              })
            pathSet.charactersIndex.forEach(characterIndex => {
              
                if (data.characters.length > characterIndex) {
                    results.push({
                        path: ['characters', characterIndex],
                        value: data.characters[characterIndex]
                    })
                }
            })
            return results
        }
    },
    {
        route: 'characters[{integers:charactersIndex}]["name"]',
        get: (pathSet) => {
            console.log("==> 🔍  pathSet:", pathSet)
            let results = [];
            const data = db.get('sayans-saga', (err, doc) => {
                if(err) { console.log("==> 💊  ERROR:", err)}
                return doc
              })
            pathSet.charactersIndex.forEach(characterIndex => {
              
                if (data.characters.length > characterIndex) {
                    results.push({
                        path: ['characters', characterIndex, 'name'],
                        value: data.characters[characterIndex].name
                    })
                }
            })
            return results
        }
    },
    {
        route: 'characters[{integers:charactersIndex}]["race"]',
        get: (pathSet) => {
            console.log("==> 🔍  pathSet:", pathSet)
            let results = [];
            const data = db.get('sayans-saga', (err, doc) => {
                if(err) { console.log("==> 💊  ERROR:", err)}
                return doc
              })
            pathSet.charactersIndex.forEach(characterIndex => {
              
                if (data.characters.length > characterIndex) {
                    results.push({
                        path: ['characters', characterIndex, 'race'],
                        value: data.characters[characterIndex].race
                    })
                }
            })
            return results
        }
    },
    {
        route: 'characters[{integers:charactersIndex}]["power"]',
        get: (pathSet) => {
            console.log("==> 🔍  pathSet:", pathSet)
            let results = [];
            const data = db.get('sayans-saga', (err, doc) => {
                if(err) { console.log("==> 💊  ERROR:", err)}
                return doc
              })
            pathSet.charactersIndex.forEach(characterIndex => {
              
                if (data.characters.length > characterIndex) {
                    results.push({
                        path: ['characters', characterIndex, 'power'],
                        value: data.characters[characterIndex].power
                    })
                }
            })
            return results
        }
    },
])

/**
 * Express
 */
app.use(bodyParser.urlencoded({extended: false}))
app.use('/model.json', FalcorServer.dataSourceRoute(() => new CharactersRouter()))
app.use(express.static('.'))
app.listen(port, err => {
    if (err) {
        console.error(err)
        return
    }
    console.info("==> ✅  Server is listening")
    console.info(`==> 🌎  Go to http://${hostname}:${port}`)
})