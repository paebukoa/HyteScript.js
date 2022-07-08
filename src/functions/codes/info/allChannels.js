module.exports = async d => {
    let [sep = ','] = d.function.parameters;

    let channels = d.client.channels.cache.keys()

    return [...channels].join(sep)
};