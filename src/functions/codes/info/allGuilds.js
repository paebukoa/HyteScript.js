module.exports = async d => {
    let [sep = ','] = d.func.params.splits;

    let guilds = d.client.guilds.cache.keys()

    return [...guilds].join(sep)
};