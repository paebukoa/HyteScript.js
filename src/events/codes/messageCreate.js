module.exports = async d => {
    d.client.on("messageCreate", async message => {

        if (!message.content.startsWith(d.options.prefix)) return;

        const content = message.content.slice(d.options.prefix.length).split(" ");

        let contentData = {
            command: content[0],
            args: content.slice(1)
        };

        const commandData = d.commandManager.default.get(contentData.command.toLowerCase());
        if (!commandData) return;

        if (message.author.bot && d.options.respondBots === false) return;

        d.message = message;
        d.channel = message.channel;
        d.guild = message.guild;
        d.author = message.author;
        d.args = contentData.args;
        d.command = commandData;
        d.error = false;
        d.data = {
            vars: new Map(),
            arrays: {
                default: []
            },
            objects: {
                default: new Map()
            },
            embeds: [],
            errorData: {},
            callbacks: d.commandManager.callback
        };

        const readerData = await d.reader.default(d, commandData.code);

        if (readerData.error) return;

        let messageObj = {
            content: readerData.result.unescape(),
            embeds: readerData.data.embeds
        };

        if (readerData.result.replaceAll('\n', '').trim() === '') delete messageObj.content;

        if (JSON.stringify(readerData.data.embeds) === "[]" && readerData.result.replaceAll('\n', '').trim() === '') return;

        d.channel.send(messageObj);
    });
};