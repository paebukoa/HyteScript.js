module.exports = async d => {
    let [sep = ','] = d.function.parameters;

    let users = (await d.client.users.fetch()).keys()

    return [...users].join(sep)
};