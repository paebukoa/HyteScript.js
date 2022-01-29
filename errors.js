const { MessageEmbed } = require("discord.js");

class SetError {
    newError(d, type, message) {
        switch (type) {
            case "function":
            d.message.channel.send(`FunctionError: ${message}`);
            break;
        }
    }
}

module.exports = SetError;