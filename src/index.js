const DiscordClient = require("./codings/discordClient.js");

require("./codings/prototypes.js");

process.on('uncaughtException', function (err) {
    console.error(err);
    console.log("\nANTI-CRASH | Here I am!");
});

module.exports = { DiscordClient };