module.exports = async d => {
    let [sep = ','] = d.func.params.splits;

    let emojis = d.client.emojis.cache.keys()

    return [...emojis].join(sep)
};