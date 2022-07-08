module.exports = async d => {
    let [sep = ','] = d.function.parameters;

    let guilds = d.client.guilds.cache.keys()

    return [...guilds].join(sep)
};