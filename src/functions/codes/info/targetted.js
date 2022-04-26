module.exports = async d => {
    let [type] = d.func.params.splits;

    if (!['interaction', 'userContextMenuInteraction', 'messageContextMenuInteraction'].includes(d.eventType)) return d.throwError.allow(d)

    let types = {
        message: d.target?.message,
        user: d.target?.user
    }

    if (!types[type.toLowerCase()]) return d.throwError.invalid(d, 'type', type)

    return types[type.toLowerCase()]
};