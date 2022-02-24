const fs = require("fs");

let events = {};
fs.readdirSync(`${__dirname}/events`).map(x => {
    fs.readdirSync(`${__dirname}/events/${x}`).map(y => {
        let event = require(`${__dirname}/events/${x}/${y}`);
        events[y.split(".").slice(0, y.split(".").length - 1).join(".")] = event;
    });
});

module.exports = events;

