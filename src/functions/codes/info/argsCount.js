module.exports = async d => {
    if (d.eventType !== 'default') return d.throwError.allow(d)

    return d.args.length;
}