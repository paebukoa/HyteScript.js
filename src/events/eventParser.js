const fs = require("fs");

let events = {};
fs.readdirSync(`${__dirname}/eventsFolder`).map(x => {
    fs.readdirSync(`${__dirname}/eventsFolder/${x}`).map(y => {
        let event = require(`${__dirname}/eventsFolder/${x}/${y}`);
        events[y.split(".").slice(0, y.split(".").length - 1).join(".")] = event;
    });
});

module.exports = events;

