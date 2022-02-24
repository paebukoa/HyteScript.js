module.exports = async (data) => {
    data.client.on("messageCreate", message => {
        //console.log("<--- triggered --->");
        // checking if content starts with prefix
        if (!message.content.toLowerCase().startsWith(data.configs.prefix.toLowerCase())) return;
        
        // fetching commands
        const foundCommands = data.commands.default.filter(c => message.content.toLowerCase().slice(data.configs.prefix.length).startsWith(c.name.toLowerCase()));

        if (foundCommands === []) return;

        //console.log("<--- command found --->");
        
        // reading commands
        for (let command of foundCommands) {
            // setting data
            data.cmd = command;
            data.message = message;
            data.channel = message.channel;
            data.author = message.author;
            data.guild = message.guild;
            data.args = data.prots.escape(message.content.slice(`${data.configs.prefix}${command.name}`.length).trim()).split(" ");
            data.err = false;

            //console.log("<--- calling reader --->");
            const readData = new data.reader(data, command.code);

            //console.log("<--- reader called --->");

            if (readData.result.replaceAll("\n", "").trim() === "" || readData.err) return;

            // sending reader result to the message channel
            message.channel.send(data.prots.unescape(readData.result));

            //console.log("<--- message sent --->");
        }
    });
}