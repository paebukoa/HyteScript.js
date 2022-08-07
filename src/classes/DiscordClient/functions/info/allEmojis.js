module.exports = async d => {
    let [sep = ','] = d.function.parameters;

    let emojis = d.client.emojis.cache.keys()

    return [...emojis].join(sep)
};