// async function read(file) {
//     return JSON.parse(
//         await readFile(
//           new URL(`./src/${file}`, import.meta.url)
//         )
//     )
// }

import regions from './src/regions.json' with {type: "json"}
import hotels from './src/hotels.json' with {type: "json"}
import fs from 'fs'

function write(file, key, value) {
    let fil = `./src/${file}`
    const data = JSON.parse(fs.readFileSync(fil, 'utf-8'))
    data[key] = value
    fs.writeFileSync(fil, JSON.stringify(data, null, 4), 'utf-8')
}

function getRegion(hotelName) {
    return hotels[hotelName]
}

function setRegion(hotelName, region) {
    /**
    central
    north
    south
    west
    east
    */
    const data = JSON.parse(fs.readFileSync('./src/hotels.json', 'utf-8'))
    data[hotelName] = regions[region]
    fs.writeFileSync('./src/hotels.json', JSON.stringify(data, null, 4), 'utf-8')
}

function initHotel(name, region) {
    let file = './src/hotels.json'
    const data = JSON.parse(fs.readFileSync(file, 'utf-8'))
    data[name] = regions[region]
    fs.writeFileSync(file, JSON.stringify(data, null, 4), 'utf-8')
}

function print(...content) {
    return console.log(...content)
}
