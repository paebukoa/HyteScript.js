module.exports = async d => {
    let [message = ''] = d.func.params.splits;

    d.throwError.custom(d, message);
};