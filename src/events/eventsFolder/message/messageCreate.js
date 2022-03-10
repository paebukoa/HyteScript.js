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
            data.utils = {
                array: {default: []},
                object: {default: {}},
                vars: {},
                embeds: []
            };

            // calling reader
            const readData = new data.reader(data, command.code);
            if (readData.err) return;

            // setting messageData
            let messageData = {content: readData.result, embeds: readData.utils.embeds};

            if (readData.result.replace('\n', '').trim() === '') mesageData = {embeds: readData.utils.embeds};

if (readData.utils.embeds === [] && readData.result.replace('\n', '').trim() === '') return;

            // sending message with messageData
            message.channel.send(messageData);
        };
    });
}