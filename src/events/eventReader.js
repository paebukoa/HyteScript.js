const { getDirFiles, replaceLast } = require("../codings/utils");

let loadedEvents = new Map()

let files = getDirFiles(`${__dirname}/codes`)

for (const file of files) {
    let eventData = require(file.path)

    loadedEvents.set(replaceLast(file.name, '.js', '').toLowerCase(), eventData)
}

module.exports = { loadedEvents };