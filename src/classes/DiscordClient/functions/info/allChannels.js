module.exports = async d => {
    let [sep = ','] = d.function.parameters;

    let channels = (await d.client.channels.fetch()).keys()

    return [...channels].join(sep)
};