module.exports = async d => {
    let [sep = ','] = d.func.params.splits;

    let channels = d.client.channels.cache.keys()

    return [...channels].join(sep)
};