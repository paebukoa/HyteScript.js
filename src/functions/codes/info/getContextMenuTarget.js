module.exports = async d => {
    let [type] = d.func.params.splits;

    if (!['interaction', 'messageContextMenuInteraction', 'userContextMenuInteraction']) return d.throwError.allow(d)

    let types = ['messageid', 'userid']
};