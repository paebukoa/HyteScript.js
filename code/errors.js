const { MessageEmbed } = require("discord.js");

class ErrorClass {
    constructor(err) {
        this.err = err;
    }

    newError(d, type, message) {
        if (this.err) {
            switch (type) {
                case "function":
                d.message.channel.send(`\`FunctionError (${d.func}, line: ${d.funcLine}): ${message}\``);
                d.error.err = true;
                break;
            }
        }
    }
}

module.exports = { ErrorClass };