module.exports = async d => {
    if (!['default'].includes(d.eventType)) return d.throwError.notAllowed(d, 'default type')

    return d.args.length;
}