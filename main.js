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

function addRegion(name) {
    const data = JSON.parse(fs.readFileSync('./src/regions.json', 'utf-8'))
    data[name] = name
    fs.writeFileSync('./src/regions.json', JSON.stringify(data, null, 4), 'utf-8')
}

function removeRegion(name) {
    const data = JSON.parse(fs.readFileSync('./src/regions.json', 'utf-8'))
    delete data[name]
    fs.writeFileSync('./src/regions.json', JSON.stringify(data, null, 4), 'utf-8')
}

function setHotelRegion(hotelName, region) {
    const data = JSON.parse(fs.readFileSync('./src/hotels.json', 'utf-8'))
    if (!regions.includes(region)) return 'Установлен неверный регион'
    data[hotelName] = regions[region]
    fs.writeFileSync('./src/hotels.json', JSON.stringify(data, null, 4), 'utf-8')
}

function initHotel(name, region) {
    if (name.length > 150) return 'Название отеля не должно превышать 150 символов'
    if (!regions.hasOwnProperty(region)) return 'Установлен неверный регион'
    let file = './src/hotels.json'
    const data = JSON.parse(fs.readFileSync(file, 'utf-8'))
    data[name] = {id: Math.floor(Math.random() * 100), region: regions[region], rooms: [{id: 1, type: 'default', space: 2, status: 'free'}]}
    fs.writeFileSync(file, JSON.stringify(data, null, 4), 'utf-8')
}

/**
  * Adds or rewrites hotel room
  * @param {String} hotelName The name of the hotel
  * @param {Number} id The id of the room in specified hotel
  * @param {Literal} roomType The room type ([default, lux, apartments])
  * @param {Literal} status Status of the room ([free, occupied])
  */
function manageHotelRoom(hotelName, id, roomType, status = 'free') {
    let file = './src/hotels.json'
    const data = JSON.parse(fs.readFileSync(file, 'utf-8'))
    let roomIndex = data[hotelName]["rooms"].findIndex(room => room.id === id);
    if (roomIndex !== -1) {
        data[hotelName]["rooms"][roomIndex] = {id: id, type: roomType, space: `${roomType !== 'apartments' ? 2 : 4}`, status: status};
    } else {
        data[hotelName]["rooms"].push({id: id, type: roomType, space: `${roomType !== 'apartments' ? 2 : 4}`, status: status});
    }
    fs.writeFileSync(file, JSON.stringify(data, null, 4), 'utf-8')
}

var mhr = manageHotelRoom

function swapRoomStatus(hotelName, id) {
    let file = './src/hotels.json'
    const data = JSON.parse(fs.readFileSync(file, 'utf-8'))
    data[hotelName]["rooms"][id - 1].status = data[hotelName]["rooms"][id - 1].status === 'occupied' ? 'free' : 'occupied'
    fs.writeFileSync(file, JSON.stringify(data, null, 4), 'utf-8')
}

function getAvailableRooms(hotelName) {
    const freeRooms = hotels[hotelName].rooms.filter(room => room.status === "free")
    return freeRooms.length > 0 ? freeRooms : 'В этом отеле нет свободных комнат'
}

function print(...content) {
    return console.log(...content)
}
