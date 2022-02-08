module.exports = async d => {
    let [message] = d.params.splits;
    d.result = message.toUpperCase();
}