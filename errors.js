const { MessageEmbed } = require("discord.js");

class SetError {
    constructor(d, type, message) {
            if(type === "function") {
            d.message.channel.send("FunctionError: " + message);

            return;
        }
    }
}

module.exports = { SetError };