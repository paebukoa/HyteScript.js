module.exports = async d => {
    let [sep = ','] = d.function.parameters;

    let guilds = (await d.client.guilds.fetch()).keys()

    return [...guilds].join(sep)
};