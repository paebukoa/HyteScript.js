module.exports = async d => {
    let [msg] = d.params.splits;
    d.result = msg.trim();
}