module.exports = async d => {
    d.client.on("messageCreate", async message => {

        let data = {};
        
        for (const key in d) {
            if (Object.hasOwnProperty.call(d, key)) {
                const element = d[key];
                
                data[key] = element;
            }
        }

        if (!message.content.startsWith(data.options.prefix)) return;

        const content = message.content.slice(data.options.prefix.length).split(" ");

        let contentData = {
            command: content[0],
            args: content.slice(1)
        };

        const commandData = data.commandManager.default.get(contentData.command.toLowerCase());
        if (!commandData) return;

        if (message.author.bot && data.options.respondBots === false) return;

        data.message = message;
        data.channel = message.channel;
        data.guild = message.guild;
        data.author = message.author;
        data.args = contentData.args;
        data.command = commandData;
        data.eventType = 'default'
        data.error = false;
        data.data = {
            vars: new Map(),
            arrays: {
                default: []
            },
            objects: {
                default: new Map()
            },
            embeds: [],
            errorData: {},
            callbacks: data.commandManager.callback
        };

        const readerData = await data.reader.default(data, commandData.code);

        if (readerData.error) return;

        let messageObj = {
            content: readerData.result.unescape(),
            embeds: readerData.data.embeds
        };

        if (readerData.result.replaceAll('\n', '').trim() === '') delete messageObj.content;

        if (JSON.stringify(readerData.data.embeds) === "[]" && readerData.result.replaceAll('\n', '').trim() === '') return;

        data.channel.send(messageObj);
    });
};