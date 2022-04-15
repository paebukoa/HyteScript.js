module.exports = async d => {
    if (d.command.type !== 'default') return d.throwError.allow(d)

    return d.args.length;
}