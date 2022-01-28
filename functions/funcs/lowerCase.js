module.exports = async d => {
    let [message] = d.inside.splits;
    d.result = message.toLowerCase();
}