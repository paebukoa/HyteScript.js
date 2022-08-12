module.exports = async d => {
    if (!['default'].includes(d.eventType)) return new d.error("notAllowed", d, 'default type')

    return d.args.length;
}