module.exports = async d => {
    if (!['default'].includes(d.eventType)) return d.throwError.allow(d)

    return d.args.length;
}