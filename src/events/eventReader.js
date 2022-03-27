const fs = require("fs");

let loadedEvents = new Map();

fs.readdirSync(`${__dirname}/codes`).map(eventName => {
    const eventData = require(`${__dirname}/codes/${eventName}`);

    loadedEvents.set(eventName.split(".js")[0].toLowerCase(), eventData);
});

module.exports = { loadedEvents };